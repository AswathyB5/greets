// One-time (and re-runnable) tool that makes the static pages editable.
//
// It reads index.html, contact.html and privacy.html, and for every piece of
// content that a visitor can see (text, images, link addresses, placeholders)
// it adds a tiny marker attribute such as data-cms="index.hero.h1_1" to the
// HTML. It also writes data/content-manifest.json: the list of every marker
// with its original value, which the admin panel uses to build its forms.
//
// The HTML is edited as plain text (only attributes are inserted), so your
// formatting, comments and scripts stay exactly as they were.
//
// Run:  npm run tag-content
// Pages that are already tagged are skipped, so running it twice is harmless.

const fs = require('fs');
const path = require('path');
const { parseDocument } = require('htmlparser2');

const SITE_DIR = path.join(__dirname, '..', '..');
const MANIFEST_PATH = path.join(__dirname, '..', 'data', 'content-manifest.json');

// Header + footer are shared by every page, so they come first: their keys
// are "global" and one edit changes all pages.
const PAGES = [
  { file: 'index.html', name: 'index', title: 'Home' },
  { file: 'contact.html', name: 'contact', title: 'Contact' },
  { file: 'privacy.html', name: 'privacy', title: 'Privacy Notice' },
];

// Product areas are skipped for now (they get their own editor later).
const SKIP_IDS = new Set(['finder', 'view', 'results']);
const SKIP_CLASSES = new Set(['families']);
const SKIP_TAGS = new Set([
  'script', 'style', 'svg', 'noscript', 'select', 'option', 'template', 'iframe',
  'head', 'canvas', 'textarea',
]);
// Tags that can sit inside a sentence without being their own block.
const INLINE_TAGS = new Set([
  'a', 'strong', 'em', 'b', 'i', 'span', 'br', 'u', 'small', 'sup', 'sub', 'mark', 'abbr', 'code', 'wbr',
]);

// Extra fields that are not plain tags (CSS background images).
const EXTRA_FIELDS = {
  index: [
    {
      match: (el) => el.name === 'section' && el.attribs.id === 'hero',
      attr: 'data-cms-bg',
      key: 'index.hero.background',
      type: 'image',
      section: 'hero',
      label: 'Hero background image',
      default: 'assets/hero-img.webp',
    },
  ],
};

const LABELS = {
  h1: 'Main heading', h2: 'Heading', h3: 'Sub-heading', h4: 'Sub-heading', h5: 'Sub-heading', h6: 'Sub-heading',
  p: 'Paragraph', a: 'Link text', li: 'List item', span: 'Text', button: 'Button text', label: 'Form label',
  div: 'Text', strong: 'Bold text', em: 'Text', small: 'Small text', td: 'Table cell', th: 'Table heading',
  summary: 'Question / title', dt: 'Term', dd: 'Description', figcaption: 'Caption', blockquote: 'Quote',
};

function collapse(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function hasText(node) {
  return node.type === 'text' && node.data.trim() !== '';
}

function classesOf(el) {
  return (el.attribs.class || '').split(/\s+/).filter(Boolean);
}

function isSkipped(el) {
  if (SKIP_TAGS.has(el.name)) return true;
  if (el.attribs.id && SKIP_IDS.has(el.attribs.id)) return true;
  return classesOf(el).some((c) => SKIP_CLASSES.has(c));
}

// Position just after "<tagname" so we can insert attributes there.
function insertPoint(el) {
  return el.startIndex + 1 + el.name.length;
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function tagPage(page, fields) {
  const file = path.join(SITE_DIR, page.file);
  const source = fs.readFileSync(file, 'utf8');
  const doc = parseDocument(source, { withStartIndices: true, withEndIndices: true });

  const inserts = []; // { pos, text } - applied from the end so positions stay valid
  const byKey = new Map(fields.map((f) => [f.key, f]));
  const counters = {};
  const usedNow = new Set();

  // Registers a field and returns the key to put in the HTML. Header/footer use
  // "global" keys, unless another page already claimed that key with different
  // content - then this page gets its own key.
  function register(scope, section, localName, field) {
    const globalScope = scope === 'global';
    let key = `${scope}.${section}.${localName}`;
    const existing = byKey.get(key);
    if (existing && globalScope && existing.default !== field.default && !usedNow.has(key) && !(existing.pages || []).includes(page.name)) {
      if (field.type === 'link') return null; // links that differ per page are left alone
      key = `${page.name}.${section}.${localName}`;
      field.page = page.name;
    }
    const known = byKey.get(key);
    if (known) {
      if (!known.pages.includes(page.name)) known.pages.push(page.name);
      usedNow.add(key);
      return key;
    }
    const entry = { key, page: field.page || scope, section, ...field, pages: [page.name] };
    delete entry.localName;
    fields.push(entry);
    byKey.set(key, entry);
    usedNow.add(key);
    return key;
  }

  function nextName(scope, section, tag) {
    const k = `${scope}.${section}.${tag}`;
    counters[k] = (counters[k] || 0) + 1;
    return `${tag}_${counters[k]}`;
  }

  function sectionOf(el, current) {
    if (current.scope === 'global' && el.name !== 'footer') return current; // everything inside header/footer stays there
    if (el.attribs.id && /^mobile-(products|industries)-panel$/.test(el.attribs.id)) return { scope: 'global', section: el.attribs.id };
    if (el.name === 'header') return { scope: 'global', section: 'header' };
    if (el.name === 'footer') return { scope: 'global', section: 'footer' };
    if (el.name === 'section' || (el.name === 'div' && el.attribs.id)) {
      const label = el.attribs.id || classesOf(el)[0];
      if (label) return { scope: page.name, section: label.replace(/[^a-z0-9_-]/gi, '-') };
    }
    if (el.name === 'main' && current.section === 'page') return { scope: page.name, section: 'content' };
    return current;
  }

  function visit(el, ctx) {
    if (el.type !== 'tag' || isSkipped(el)) return;
    ctx = sectionOf(el, ctx);
    const { scope, section } = ctx;
    const attrs = []; // attributes to add to this element

    // Extra (background image) fields.
    for (const extra of EXTRA_FIELDS[page.name] || []) {
      if (!extra.match(el) || el.attribs[extra.attr]) continue;
      const key = register(page.name, section, extra.key.split('.').slice(2).join('.'), {
        type: extra.type, label: extra.label, default: extra.default,
      });
      attrs.push(`${extra.attr}="${key}"`);
    }

    // Attribute fields: image source/alt, link address, input placeholder.
    if (el.name === 'img' && el.attribs.src && !el.attribs.src.startsWith('data:') && !el.attribs['data-cms-src']) {
      const name = nextName(scope, section, 'img');
      const base = path.basename(el.attribs.src);
      const key = register(scope, section, `${name}`, { type: 'image', label: `Image (${base})`, default: el.attribs.src });
      attrs.push(`data-cms-src="${key}"`);
      if (el.attribs.alt && !el.attribs['data-cms-alt']) {
        const altKey = register(scope, section, `${name}_alt`, {
          type: 'text', label: `Image description (alt text) for ${base}`, default: el.attribs.alt,
        });
        attrs.push(`data-cms-alt="${altKey}"`);
      }
    }
    // Links that stay on the same page (#why ...) are not editable, but they still take a
    // number, so the same link gets the same key on every page (header/footer are shared).
    if (el.name === 'a' && el.attribs.href && /^(#|javascript:)/i.test(el.attribs.href) && !el.attribs['data-cms-href']) {
      nextName(scope, section, 'link');
    }
    if (el.name === 'a' && el.attribs.href && !/^(#|javascript:)/i.test(el.attribs.href) && !el.attribs['data-cms-href']) {
      const name = nextName(scope, section, 'link');
      const key = register(scope, section, name, {
        type: 'link', label: 'Link address (URL)', default: el.attribs.href,
      });
      if (key) attrs.push(`data-cms-href="${key}"`);
    }
    if (el.name === 'input' && el.attribs.placeholder && !el.attribs['data-cms-ph']) {
      const name = nextName(scope, section, 'input');
      const key = register(scope, section, name, {
        type: 'text', label: 'Input placeholder', default: el.attribs.placeholder,
      });
      attrs.push(`data-cms-ph="${key}"`);
    }

    // Text content.
    const kids = el.children;
    const textKids = kids.filter(hasText);
    const elementKids = kids.filter((k) => k.type === 'tag');

    if (textKids.length === 0) {
      if (attrs.length) inserts.push({ pos: insertPoint(el), text: ' ' + attrs.join(' ') });
      elementKids.forEach((k) => visit(k, ctx));
      return;
    }

    const allInline = elementKids.every((k) => INLINE_TAGS.has(k.name));
    if (allInline && !el.attribs['data-cms']) {
      // The whole element is one editable text.
      const hasHtml = elementKids.length > 0;
      let value;
      if (hasHtml) {
        const first = kids[0].startIndex;
        const last = kids[kids.length - 1].endIndex;
        value = collapse(source.slice(first, last + 1));
      } else {
        value = collapse(kids.map((k) => k.data).join(''));
      }
      const name = nextName(scope, section, el.name);
      const key = register(scope, section, name, {
        type: hasHtml ? 'html' : 'text',
        label: LABELS[el.name] || 'Text',
        default: value,
      });
      attrs.push(`data-cms="${key}"`);
      if (attrs.length) inserts.push({ pos: insertPoint(el), text: ' ' + attrs.join(' ') });
      return;
    }

    // Mixed content (text next to blocks/icons): wrap each text piece in a <span>.
    if (attrs.length) inserts.push({ pos: insertPoint(el), text: ' ' + attrs.join(' ') });
    for (const kid of kids) {
      if (kid.type === 'text' && hasText(kid)) {
        const raw = source.slice(kid.startIndex, kid.endIndex + 1);
        const lead = raw.length - raw.trimStart().length;
        const trail = raw.length - raw.trimEnd().length;
        const name = nextName(scope, section, 'text');
        const key = register(scope, section, name, {
          type: 'text', label: 'Text', default: collapse(kid.data),
        });
        inserts.push({ pos: kid.startIndex + lead, text: `<span data-cms="${key}">` });
        inserts.push({ pos: kid.endIndex + 1 - trail, text: '</span>' });
      } else if (kid.type === 'tag') {
        visit(kid, ctx);
      }
    }
  }

  // Skip anything already marked (re-runs): collect existing keys first.
  const alreadyMarked = new Set();
  (function scan(node) {
    for (const c of node.children || []) {
      if (c.type === 'tag') {
        for (const [name, value] of Object.entries(c.attribs)) {
          if (name.startsWith('data-cms')) alreadyMarked.add(value);
        }
        scan(c);
      }
    }
  })(doc);

  const body = findFirst(doc, 'body');
  if (!body) throw new Error(`${page.file}: no <body>`);
  if (alreadyMarked.size) {
    console.log(`${page.file}: already tagged (${alreadyMarked.size} markers). Skipping re-tag.`);
    // Mark the manifest pages list, nothing else to insert.
    return { changed: false };
  }

  inserts.push({ pos: insertPoint(body), text: ` data-cms-page="${page.name}"` });
  for (const el of body.children) visit(el, { scope: page.name, section: 'page' });

  // Page-level fields: browser tab title + search-engine description.
  const title = findFirst(doc, 'title');
  if (title && title.children[0]) {
    const key = `${page.name}.meta.title`;
    fields.push({ key, page: page.name, section: 'meta', type: 'meta', label: 'Browser tab title (SEO)', default: collapse(title.children[0].data), pages: [page.name] });
  }
  const desc = findAll(doc, (e) => e.name === 'meta' && e.attribs.name === 'description')[0];
  if (desc) {
    fields.push({ key: `${page.name}.meta.description`, page: page.name, section: 'meta', type: 'meta', label: 'Search-engine description (SEO)', default: desc.attribs.content, pages: [page.name] });
  }

  let out = source;
  inserts.sort((a, b) => b.pos - a.pos);
  for (const ins of inserts) out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
  fs.writeFileSync(file, out);
  return { changed: true, count: inserts.length };
}

function findFirst(node, name) {
  return findAll(node, (e) => e.name === name)[0];
}

function findAll(node, test, acc = []) {
  for (const c of node.children || []) {
    if (c.type === 'tag') {
      if (test(c)) acc.push(c);
      findAll(c, test, acc);
    }
  }
  return acc;
}

const fields = readManifest();
for (const page of PAGES) {
  const result = tagPage(page, fields);
  if (result.changed) console.log(`${page.file}: tagged (${result.count} insertions)`);
}

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(fields, null, 1));
console.log(`Manifest written: ${fields.length} editable fields -> ${path.relative(process.cwd(), MANIFEST_PATH)}`);
