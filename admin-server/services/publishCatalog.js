// "Publish to website": turns what is in the database into the files the website uses.
//
//   1. products.js         - the CATALOG and PHOTOS data (the home-page finder reads it)
//   2. build_pages.js      - regenerates every brand / family / product page and sitemap.xml
//   3. index.html          - the family cards in the three brand sections of the home page
//   4. old pages           - pages of deleted / renamed products are removed
//
// Before touching anything the current files are copied to admin-server/backups/.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');
const { parseDocument } = require('htmlparser2');

const { SITE_DIR } = require('../config/site');
const CatalogBrand = require('../models/CatalogBrand');
const CatalogFamily = require('../models/CatalogFamily');
const CatalogProduct = require('../models/CatalogProduct');
const CatalogMeta = require('../models/CatalogMeta');
const { readSource, readConst, replaceConst, FILE: PRODUCTS_FILE } = require('./productsJs');
const { updateMenus } = require('./menus');
const { slugify, UPLOAD_DIR } = require('./catalogSchema');

// where the copies taken before each publish are kept (BACKUP_DIR in .env can move them)
const BACKUP_DIR = process.env.BACKUP_DIR ? path.resolve(process.env.BACKUP_DIR) : path.join(__dirname, '..', 'backups');
const KEEP_BACKUPS = 10;
// the website files a publish rewrites (copied before, put back if the publish fails)
const PUBLISHED_FILES = ['products.js', 'index.html', 'contact.html', 'privacy.html', 'blog.html', 'sitemap.xml'];
const PROCESS_OF_BRAND = { bmi: 'harden', novatec: 'clean', huasheng: 'coat' }; // the 3 steps used by the finder
let publishing = false;

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- photos: the site refers to pictures by short ids ----------
function makePhotoMapper(photos) {
  const byPath = new Map();
  for (const [id, p] of Object.entries(photos)) if (!byPath.has(p)) byPath.set(p, id);
  const next = { ...photos };
  const copied = new Set();

  function sitePath(p) {
    if (!p.startsWith('uploads/')) return p;
    // pictures uploaded in the admin are copied into the website folder
    const name = p.slice('uploads/'.length);
    const target = path.join(SITE_DIR, 'assets', 'catalog', 'uploads', name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(UPLOAD_DIR, name), target);
    copied.add(name);
    return `assets/catalog/uploads/${name}`;
  }

  function idFor(p) {
    if (!p) return p;
    const real = sitePath(p);
    if (byPath.has(real)) return byPath.get(real);
    const id = 'up_' + crypto.createHash('sha1').update(real).digest('hex').slice(0, 8);
    next[id] = real;
    byPath.set(real, id);
    return id;
  }

  return { idFor, sitePath, photos: next, copied };
}

// The page builder (build_pages.js) loops over these lists without checking they exist. The admin
// form only requires a name, so an empty list is filled in here instead of crashing the publish.
const LIST_DEFAULTS = {
  brand: { strengths: [] },
  family: { applications: [] },
  product: { features: [], specs: [], i: [] },
};

function withPhotoIds(data, idFor, kind) {
  const out = { ...(LIST_DEFAULTS[kind] || {}), ...data };
  if (out.photo) out.photo = idFor(out.photo);
  if (out.gallery) out.gallery = out.gallery.map(([p, alt]) => [idFor(p), alt]);
  return out;
}

const withoutLogo = ({ logo, ...rest }) => rest;

// ---------- catalogue from the database ----------
async function buildCatalog(idFor) {
  const [brands, families, products] = await Promise.all([
    CatalogBrand.find().sort({ order: 1 }).lean(),
    CatalogFamily.find({ status: 'published' }).sort({ order: 1 }).lean(),
    CatalogProduct.find({ status: 'published' }).sort({ order: 1 }).lean(),
  ]);
  return brands.map((b) => ({
    id: b.brandId,
    ...withoutLogo(withPhotoIds(b.data, idFor, 'brand')),
    cats: families.filter((f) => f.brandId === b.brandId).map((f) => ({
      id: f.familyId,
      ...withPhotoIds(f.data, idFor, 'family'),
      machines: products
        .filter((p) => p.brandId === b.brandId && p.familyId === f.familyId)
        .map((p) => ({ id: p.productId, ...withPhotoIds(p.data, idFor, 'product') })),
    })),
  }));
}

// The folders build_pages.js creates for a catalogue (relative to the website folder).
function generatedDirs(catalog) {
  const dirs = new Set();
  for (const b of catalog) {
    dirs.add(b.id);
    for (const c of b.cats || []) {
      dirs.add(`${b.id}/${c.id}`);
      for (const m of c.machines || []) {
        dirs.add(`${b.id}/${slugify(m.name)}`);
        dirs.add(`${b.id}/${c.id}/${m.id}`);
        dirs.add(`${b.id}/${m.id}`);
      }
    }
  }
  return dirs;
}

// Two different things must not want the same folder name inside a brand.
function folderConflicts(catalog) {
  const problems = [];
  for (const b of catalog) {
    const owner = new Map();
    const claim = (name, who, label) => {
      if (owner.has(name) && owner.get(name).who !== who) problems.push(`${b.name}: "${name}" is used by both ${owner.get(name).label} and ${label}. Rename one of them.`);
      else owner.set(name, { who, label });
    };
    for (const c of b.cats) {
      claim(c.id, `f:${c.id}`, `the family "${c.name}"`);
      for (const m of c.machines) {
        claim(m.id, `p:${m.id}`, `the product "${m.name}"`);
        claim(slugify(m.name), `p:${m.id}`, `the product "${m.name}"`);
      }
    }
  }
  return problems;
}

// ---------- home page family cards ----------
function familyCardsHtml(brand) {
  const proc = PROCESS_OF_BRAND[brand.id] || '';
  const cards = brand.cats.map((c, i) => {
    const side = i % 2 === 0 ? 'fade-left' : 'fade-right';
    const count = c.machines.length;
    const photoId = c.photo || (c.no_photo ? '' : brand.photo);
    const items = c.machines.map((m) => `
              <li><a href="${esc(`${brand.id}/${c.id}/${m.id}/`)}" data-brand="${esc(brand.name)}" data-process="${proc}"
                  data-category="${esc(c.name)}"><b>${esc(m.name)}</b><span>${esc(m.short || '')}</span></a></li>`).join('');
    return `
          <details data-cat="${esc(c.name)}" class="${side}" data-anim="${side}" data-anim-delay="${i + 1}">
            <summary>
              <span class="family-thumb">${photoId ? `<img src="${esc(photoId)}" alt="${esc(c.photoAlt || c.name)}">` : ''}</span>
              <div class="family-head">
                <span class="t">${esc(c.name)}<span class="family-count-badge">${count} ${count === 1 ? 'product' : 'products'}</span><small>${esc(c.sub || '')}</small></span>
              </div>
              <span class="ic">+</span>
            </summary>
            <ul class="models">${items}
            </ul>
          </details>`;
  }).join('');
  return `<div class="families">${cards}\n        </div>`;
}

function findAll(node, test, acc = []) {
  for (const child of node.children || []) {
    if (child.type === 'tag') {
      if (test(child)) acc.push(child);
      findAll(child, test, acc);
    }
  }
  return acc;
}

function updateHomePage(html, catalog, photos) {
  const doc = parseDocument(html, { withStartIndices: true, withEndIndices: true });
  const edits = [];
  const skipped = [];
  for (const brand of catalog) {
    const section = findAll(doc, (e) => e.name === 'section' && e.attribs.id === brand.id)[0];
    const box = section && findAll(section, (e) => e.name === 'div' && (e.attribs.class || '').split(/\s+/).includes('families'))[0];
    if (!box) { skipped.push(brand.id); continue; }
    // the cards need real picture paths, not the short ids
    const resolved = { ...brand, photo: photos[brand.photo] || brand.photo, cats: brand.cats.map((c) => ({ ...c, photo: photos[c.photo] || c.photo })) };
    edits.push({ from: box.startIndex, to: box.endIndex + 1, text: familyCardsHtml(resolved) });
  }
  edits.sort((a, b) => b.from - a.from);
  let out = html;
  for (const e of edits) out = out.slice(0, e.from) + e.text + out.slice(e.to);
  return { html: out, skipped };
}

// ---------- helpers ----------
function runBuild() {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, ['build_pages.js'], { cwd: SITE_DIR, timeout: 180000, maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) reject(new Error(`Building the pages failed: ${(stderr || err.message).toString().slice(0, 600)}`));
      else resolve(String(stdout));
    });
  });
}

function backupFiles() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(BACKUP_DIR, stamp);
  fs.mkdirSync(dir, { recursive: true });
  for (const name of PUBLISHED_FILES) {
    const from = path.join(SITE_DIR, name);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(dir, name));
  }
  const all = fs.readdirSync(BACKUP_DIR).sort();
  for (const old of all.slice(0, Math.max(0, all.length - KEEP_BACKUPS))) fs.rmSync(path.join(BACKUP_DIR, old), { recursive: true, force: true });
  return dir;
}

function restoreFiles(dir) {
  for (const name of ['products.js', 'index.html', 'sitemap.xml']) {
    const from = path.join(dir, name);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(SITE_DIR, name));
  }
}

// Removes the folders of pages that no longer exist. Only folders holding nothing but an
// index.html are removed, and never a brand's own folder, so hand-made pages are safe.
function removeStaleDirs(oldDirs, newDirs, brandIds) {
  const removed = [];
  const stale = [...oldDirs].filter((d) => !newDirs.has(d) && !brandIds.has(d)).sort((a, b) => b.length - a.length);
  for (const rel of stale) {
    const full = path.resolve(SITE_DIR, rel);
    if (!full.startsWith(SITE_DIR + path.sep) || !fs.existsSync(full)) continue;
    const entries = fs.readdirSync(full, { withFileTypes: true });
    if (entries.every((e) => e.isFile() && e.name === 'index.html')) {
      fs.rmSync(full, { recursive: true, force: true });
      removed.push(rel);
    }
  }
  return removed;
}

// ---------- the main action ----------
async function publish() {
  if (publishing) throw Object.assign(new Error('A publish is already running. Please wait a moment.'), { status: 409 });
  publishing = true;
  let backup = null;
  const startedAt = new Date();
  try {
    const code = readSource();
    const oldCatalog = readConst(code, 'CATALOG');
    const oldPhotos = readConst(code, 'PHOTOS');

    const mapper = makePhotoMapper(oldPhotos);
    const catalog = await buildCatalog(mapper.idFor);
    // Overlaps that already exist on the live site are only reported; a NEW overlap stops the publish.
    const before = new Set(folderConflicts(oldCatalog));
    const conflicts = folderConflicts(catalog);
    const problems = conflicts.filter((c) => !before.has(c));
    if (problems.length) throw Object.assign(new Error(problems.join(' ')), { status: 409 });

    // brand logos (a brand field; the logos the site already has are used for any brand without one) and the industries list
    const brandDocs = await CatalogBrand.find().sort({ order: 1 }).lean();
    const oldLogos = readConst(code, 'LOGO_PATHS');
    const logos = {};
    for (const b of brandDocs) { const l = (b.data && b.data.logo) || oldLogos[b.brandId]; if (l) logos[b.brandId] = mapper.sitePath(l); }
    const metaNow = await CatalogMeta.findOne({ key: 'state' }).lean();
    const industries = (metaNow && metaNow.industries && metaNow.industries.length) ? metaNow.industries.map((i) => ({ id: i.id, n: i.n, d: i.d })) : readConst(code, 'IND');

    backup = backupFiles();
    let next = replaceConst(code, 'PHOTOS', mapper.photos);
    next = replaceConst(next, 'CATALOG', catalog);
    next = replaceConst(next, 'LOGO_PATHS', logos);
    next = replaceConst(next, 'IND', industries);
    fs.writeFileSync(PRODUCTS_FILE, next, 'utf8');

    const buildLog = await runBuild();
    const removed = removeStaleDirs(generatedDirs(oldCatalog), generatedDirs(catalog), new Set(catalog.map((b) => b.id)));

    const indexFile = path.join(SITE_DIR, 'index.html');
    const home = updateHomePage(fs.readFileSync(indexFile, 'utf8'), catalog, mapper.photos);
    // the menus of every page follow the catalogue (a renamed family, a new logo...) and the industries list
    const menuInput = { catalog, logos, industryNames: Object.fromEntries(industries.map((i) => [i.id, i.n])) };
    fs.writeFileSync(indexFile, updateMenus(home.html, { ...menuInput, isHome: true }), 'utf8');
    for (const name of ['contact.html', 'privacy.html', 'blog.html']) {
      const file = path.join(SITE_DIR, name);
      if (fs.existsSync(file)) fs.writeFileSync(file, updateMenus(fs.readFileSync(file, 'utf8'), { ...menuInput, isHome: false }), 'utf8');
    }

    const summary = {
      brands: catalog.length,
      families: catalog.reduce((n, b) => n + b.cats.length, 0),
      products: catalog.reduce((n, b) => n + b.cats.reduce((m, c) => m + c.machines.length, 0), 0),
      pages: Number((buildLog.match(/with (\d+) total URLs/) || [])[1]) || null,
      removedPages: removed.length,
      uploadsCopied: mapper.copied.size,
      backup: path.basename(backup),
      skippedHomeSections: home.skipped,
      warnings: conflicts,
    };
    // A save that landed while publishing may not be in the files: keep the "unpublished changes" flag then.
    const meta = await CatalogMeta.findOne({ key: 'state' }).lean();
    const changedDuring = !!(meta && meta.changedAt && meta.changedAt > startedAt);
    await CatalogMeta.findOneAndUpdate(
      { key: 'state' },
      { $set: { key: 'state', dirty: changedDuring, publishedAt: new Date(), lastPublish: summary }, $unset: { lastError: 1 } },
      { upsert: true }
    );
    return summary;
  } catch (err) {
    if (backup) restoreFiles(backup); // leave the website exactly as it was
    // remembered, so the screen can say what went wrong and offer "Try again"
    await CatalogMeta.findOneAndUpdate({ key: 'state' }, { $set: { key: 'state', lastError: { message: err.message, at: new Date() } } }, { upsert: true }).catch(() => {});
    throw err;
  } finally {
    publishing = false;
  }
}

// ---------- the queue ----------
// Every change asks for a publish. One runs at a time; changes that arrive while it runs are covered by one more
// run right after it, so ten quick clicks cost two publishes, not ten. A caller can wait for "the next publish
// that includes my change" (the Publish button / retry does), or just ask and carry on (every save does).
const queue = { running: false, again: false, waiters: [] };

async function runQueue() {
  queue.running = true;
  try {
    do {
      queue.again = false;
      const waiting = queue.waiters.splice(0); // the callers this run answers
      let summary = null;
      let failure = null;
      try { summary = await publish(); } catch (err) { failure = err; }
      waiting.forEach((w) => (failure ? w.reject(failure) : w.resolve(summary)));
    } while (queue.again);
  } finally {
    queue.running = false;
  }
}

function requestPublish() {
  return new Promise((resolve, reject) => {
    queue.waiters.push({ resolve, reject });
    if (queue.running) queue.again = true;
    else runQueue();
  });
}

const isPublishing = () => queue.running;

module.exports = { requestPublish, isPublishing, publish, buildCatalog, makePhotoMapper, generatedDirs, folderConflicts, familyCardsHtml, updateHomePage };
