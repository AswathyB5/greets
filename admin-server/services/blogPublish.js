// Blog articles: "Publish to website".
//
// The admin panel keeps every article in the database (models/BlogPost.js). A publish turns the
// published ones into the files the website uses:
//
//   1. <slug>/index.html   - one page per article, made from templates/blog-article.html
//   2. blog.html           - the grid of article cards
//   3. sitemap.xml         - one line per article
//   4. blog-posts.json     - the list of published articles (build_pages.js reads it, so a product
//                            publish keeps the articles in the sitemap)
//
// Drafts are not published, and an article that is deleted or turned back into a draft loses its page.
// Before touching anything the current files are copied to admin-server/backups/ (and put back if the publish fails).

const fs = require('fs');
const path = require('path');
const { parseDocument } = require('htmlparser2');

const { SITE_DIR } = require('../config/site');
const BlogPost = require('../models/BlogPost');
const { UPLOAD_DIR } = require('./imageStore');
const sharedBlocks = require('./sharedBlocks');

const SITE_URL = 'https://www.greetsequipment.com';
const BACKUP_DIR = process.env.BACKUP_DIR ? path.resolve(process.env.BACKUP_DIR) : path.join(__dirname, '..', 'backups');
const KEEP_BACKUPS = 10;
const TEMPLATE = path.join(__dirname, '..', 'templates', 'blog-article.html');
const ORGANIZATION = path.join(__dirname, '..', 'templates', 'organization.json');
const MANIFEST = path.join(SITE_DIR, 'blog-posts.json');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// folders / pages of the website that an article address must never take over
const RESERVED = new Set(['blog', 'blogs', 'contact', 'privacy', 'index', 'assets', 'admin', 'admin-server', 'api', 'uploads',
  'bmi', 'novatec', 'huasheng', 'node_modules', 'static', 'site', 'login', 'sitemap', 'robots']);
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

let publishing = false;

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slugify = (s) => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '');

function formatLong(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}` : '';
}
const todayIso = () => new Date().toISOString().slice(0, 10);

// ---------- checking what the admin typed ----------
function validate(data, { partial } = {}) {
  const errors = {};
  const d = data || {};
  if (!partial || 'title' in d) if (!String(d.title || '').trim()) errors.title = 'Give the article a title.';
  if ('slug' in d || !partial) {
    const slug = String(d.slug || '').trim();
    if (!slug) errors.slug = 'The page address is required.';
    else if (!SLUG_PATTERN.test(slug)) errors.slug = 'Use only lower-case letters, numbers and single dashes (for example "my-new-article").';
    else if (RESERVED.has(slug)) errors.slug = `"${slug}" is used by another part of the website. Choose a different address.`;
  }
  if (d.date && !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) errors.date = 'Use a date like 2026-11-30.';
  if (d.readMinutes != null && !(Number(d.readMinutes) >= 1 && Number(d.readMinutes) <= 120)) errors.readMinutes = 'Reading time must be between 1 and 120 minutes.';
  return errors;
}

// ---------- the article text: only a safe set of tags / settings is kept ----------
const BODY_TAGS = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'br', 'hr', 'blockquote', 'table',
  'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'img', 'figure', 'figcaption', 'span', 'div', 'dl', 'dt', 'dd', 'sup', 'sub', 'code', 'pre']);
const DROP_WHOLE = new Set(['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'link', 'meta', 'svg', 'noscript']);
const VOID = new Set(['br', 'hr', 'img']);
// the formatting a text can carry: colours, sizes, alignment, spacing, simple borders (what the editor's buttons produce)
const STYLE_PROPS = /^((margin|padding)(-(top|right|bottom|left))?|text-align|vertical-align|color|font-weight|font-style|text-decoration|text-decoration-line|width|max-width|height|border(-(top|right|bottom|left))?(-(width|style|color))?|border-collapse|border-radius|line-height|font-size|background|background-color)$/;
// colours written the way a browser gives them back: #abc, rgb(1, 2, 3), names, var(--lime)
const COLOUR_OK = /^(#[0-9a-fA-F]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d.]+\s*)?\)|[a-zA-Z]{3,20}|var\(--[a-z0-9-]{1,30}\))$/;

const safeUrl = (u) => (u && u.length <= 1000 && !/[\u0000-\u001f]/.test(u) && !/^\s*(javascript|data|vbscript):/i.test(u) ? u.trim() : '');

function cleanStyle(text) {
  const out = [];
  String(text || '').split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const prop = decl.slice(0, i).trim().toLowerCase();
    const val = decl.slice(i + 1).trim().replace(/\s*!important$/i, '');
    if (STYLE_PROPS.test(prop) && /^[#a-zA-Z0-9%.,()\s-]{1,80}$/.test(val) && !/url|expression|import/i.test(val)) out.push(`${prop}: ${val}`);
  });
  return out.join('; ');
}

function serializeBody(nodes) {
  let out = '';
  for (const n of nodes || []) {
    if (n.type === 'text') { out += esc(n.data); continue; }
    if (n.type !== 'tag') continue; // comments, scripts parsed as other types
    if (DROP_WHOLE.has(n.name)) continue;
    const inner = serializeBody(n.children);
    // older browsers write a colour as <font color="..."> and strike-through as <strike>: keep both, in the modern form
    if (n.name === 'font') {
      const colour = String((n.attribs || {}).color || '').trim();
      out += COLOUR_OK.test(colour) ? `<span style="color: ${esc(colour)}">${inner}</span>` : inner;
      continue;
    }
    if (n.name === 'strike') { out += `<s>${inner}</s>`; continue; }
    if (!BODY_TAGS.has(n.name)) { out += inner; continue; }
    const a = n.attribs || {};
    let attrs = '';
    if (n.name === 'a') {
      const href = safeUrl(a.href);
      if (href) attrs += ` href="${esc(href)}"`;
      if (a.target === '_blank') attrs += ' target="_blank" rel="noopener"';
    }
    if (n.name === 'img') {
      const src = safeUrl(a.src);
      if (!src) continue;
      attrs += ` src="${esc(src)}" alt="${esc(a.alt || '')}"`;
    }
    if (a.title) attrs += ` title="${esc(a.title)}"`;
    if (n.name === 'td' || n.name === 'th') {
      if (/^\d{1,2}$/.test(a.colspan || '')) attrs += ` colspan="${a.colspan}"`;
      if (/^\d{1,2}$/.test(a.rowspan || '')) attrs += ` rowspan="${a.rowspan}"`;
      if (n.name === 'th' && /^(row|col|rowgroup|colgroup)$/.test(a.scope || '')) attrs += ` scope="${a.scope}"`;
    }
    const cls = (a.class || '').split(/\s+/).filter((c) => /^[A-Za-z0-9_-]{1,40}$/.test(c)).join(' ');
    if (cls) attrs += ` class="${cls}"`;
    const st = cleanStyle(a.style);
    if (st) attrs += ` style="${esc(st)}"`;
    out += VOID.has(n.name) ? `<${n.name}${attrs}>` : `<${n.name}${attrs}>${inner}</${n.name}>`;
  }
  return out;
}

function sanitizeBody(html) {
  return serializeBody(parseDocument(String(html || '')).children).trim();
}

// ---------- pictures ----------
// The website refers to a picture by its path; the admin may hold it as uploads/<file> (copied into the site) or an https address.
function sitePicture(value, copied) {
  const v = String(value || '').trim();
  if (!v) return '';
  if (/^https:\/\//i.test(v)) return v;
  if (v.startsWith('uploads/')) {
    const name = path.basename(v);
    const from = path.join(UPLOAD_DIR, name);
    const target = path.join(SITE_DIR, 'assets', 'blog', 'uploads', name);
    if (fs.existsSync(from)) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(from, target);
      if (copied) copied.add(name);
    }
    return `assets/blog/uploads/${name}`;
  }
  return v.replace(/^\/+/, '');
}
// Pictures placed inside the article text: "uploads/<file>" is copied into the site, and a site path gets
// the "../" an article page needs (an article lives one folder deep).
function fixBodyPictures(html, copied) {
  return html.replace(/<img ([^>]*?)src="([^"]*)"/g, (all, before, src) => {
    const value = src.replace(/&amp;/g, '&');
    if (/^(https?:)?\/\//i.test(value) || value.startsWith('../')) return all;
    return '<img ' + before + 'src="' + esc(fromArticle(sitePicture(value, copied))) + '"';
  });
}
const fromArticle = (p) => (!p || /^https:\/\//i.test(p) ? p : `../${p}`); // an article lives one folder deep
const absolute = (p) => (!p ? '' : /^https:\/\//i.test(p) ? p : `${SITE_URL}/${p}`);

// ---------- one article page ----------
function structuredData(post, ctx) {
  const url = `${SITE_URL}/${post.slug}/`;
  const organization = JSON.parse(fs.readFileSync(ORGANIZATION, 'utf8'));
  const graph = [
    organization,
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      headline: post.title,
      description: post.description || post.excerpt || '',
      url,
      image: ctx.ogImage,
      datePublished: post.date || todayIso(),
      dateModified: post.modified || post.date || todayIso(),
      inLanguage: 'en-IN',
      author: { '@type': 'Person', name: post.authorName || post.author || 'Greets', jobTitle: post.authorTitle || undefined, worksFor: { '@id': `${SITE_URL}/#organization` } },
      publisher: { '@id': `${SITE_URL}/#organization` },
      keywords: post.keywords && post.keywords.length ? post.keywords : undefined,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.crumbTitle || post.title },
      ],
    },
  ];
  const faq = (post.faq || []).filter((f) => f && f.q && f.a);
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  // "</" inside a script would end it early
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/<\//g, '<\\/');
}

// puts spaces in front of every non-empty line
const indent = (text, n) => String(text || '').split('\n').map((l) => (l.trim() ? ' '.repeat(n) + l : l)).join('\n');

function faqHtml(faq) {
  const items = (faq || []).filter((f) => f && f.q && f.a);
  if (!items.length) return '';
  const rows = items.map((f) => `  <dt style="font-weight: 700; color: var(--lime); margin-top: 1.5rem;">${esc(f.q)}</dt>
  <dd style="margin: 0.5rem 0 0; color: var(--ink);">${esc(f.a)}</dd>`).join('\n\n');
  return `<h2 data-cms="blog-article.faq.heading">Frequently Asked Questions</h2>
<dl style="text-align: left; margin-top: 2rem;">
${rows}
</dl>`;
}

// The menus and the footer come from index.html (the copy the admin panel edits), so a change there shows on every
// article. The copy in the template is only used if index.html cannot be read.
function withSharedBlocks(page) {
  const head = sharedBlocks.header('../');
  const foot = sharedBlocks.footer('../');
  let out = page;
  if (head) out = out.replace(/<!-- Header -->[\s\S]*?(?=\s*<!-- Breadcrumbs -->)/, () => head);
  if (foot) out = out.replace(/<!-- Footer -->\s*<footer[\s\S]*?<\/footer>/, () => foot);
  return out;
}

function renderArticle(post, copied) {
  const template = fs.readFileSync(TEMPLATE, 'utf8');
  const image = sitePicture(post.image, copied);
  const ogSource = post.ogImage ? sitePicture(post.ogImage, copied) : image;
  const ctx = { ogImage: absolute(ogSource) };
  const body = [fixBodyPictures(sanitizeBody(post.bodyHtml), copied), faqHtml(post.faq)].filter(Boolean).join('\n\n');
  const heroTag = image ? `<img src="${esc(fromArticle(image))}" alt="${esc(post.imageAlt || post.title)}" class="article-hero-img">` : '';
  const values = {
    TITLE_TAG: esc(post.seoTitle || post.title),
    DESC: esc(post.description || post.excerpt || ''),
    URL: `${SITE_URL}/${post.slug}/`,
    OG_IMAGE: esc(ctx.ogImage),
    CRUMB: esc(post.crumbTitle || post.title),
    H1: esc(post.title),
    AUTHOR: esc(post.author || 'Greets'),
    DATE_LONG: esc(formatLong(post.date) || formatLong(todayIso())),
    READ: String(Math.max(1, Math.round(Number(post.readMinutes) || 5))),
    HERO: heroTag,
    BODY: indent(body, 8),
    JSONLD: structuredData(post, ctx),
  };
  // one pass, so a value that happens to contain "{{...}}" is never filled in again
  const page = template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (all, key) => (key in values ? values[key] : all));
  return withSharedBlocks(page);
}

// ---------- the card on the blog page ----------
function cardHtml(post, copied) {
  const url = `${post.slug}/`;
  const img = sitePicture(post.image, copied);
  const author = '<span class="meta-author"><svg viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' + esc(post.author || 'Greets') + '</span>';
  const date = '<span class="meta-date"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' + esc(formatLong(post.date)) + '</span>';
  return `        <article class="blog-card">
          <div class="blog-card__media">
            ${img ? `<img src="${esc(img)}" alt="${esc(post.imageAlt || post.title)}">` : ''}
          </div>
          <div class="blog-card__body">
            <div class="blog-card__meta">
              ${author}
${date}
            </div>
            <h3 class="blog-card__title"><a href="${esc(url)}">${esc(post.title)}</a></h3>
            <p class="blog-card__excerpt">${esc(post.excerpt || post.description || '')}</p>
            <div class="blog-card__footer">
              <a href="${esc(url)}" class="blog-card__btn">
                <span data-cms="blog.blog-posts.read_article">Read Article</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </article>`;
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

function updateBlogPage(html, posts, copied) {
  const doc = parseDocument(html, { withStartIndices: true, withEndIndices: true });
  const grid = findAll(doc, (e) => e.name === 'div' && (e.attribs.class || '').split(/\s+/).includes('blog-grid'))[0];
  if (!grid) throw new Error('The blog page (blog.html) has no article grid to fill.');
  const cards = posts.map((p) => cardHtml(p, copied)).join('\n\n');
  const empty = '        <p style="grid-column:1/-1; text-align:center;">New articles are coming soon.</p>';
  const text = `<div class="blog-grid">\n${cards || empty}\n      </div>`;
  return html.slice(0, grid.startIndex) + text + html.slice(grid.endIndex + 1);
}

// ---------- sitemap.xml ----------
function updateSitemap(xml, previousSlugs, posts) {
  const nl = xml.includes('\r\n') ? '\r\n' : '\n';
  let out = xml;
  for (const slug of new Set([...previousSlugs, ...posts.map((p) => p.slug)])) {
    const re = new RegExp(`[ \\t]*<url>\\s*<loc>${SITE_URL.replace(/[.]/g, '\\.')}/${slug.replace(/[-]/g, '\\-')}/</loc>[\\s\\S]*?</url>\\r?\\n?`);
    out = out.replace(re, '');
  }
  const blocks = posts.map((p) => [
    '  <url>',
    `    <loc>${SITE_URL}/${p.slug}/</loc>`,
    `    <lastmod>${p.modified || p.date || todayIso()}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>0.8</priority>',
    '  </url>',
  ].join(nl)).join(nl);
  if (!blocks) return out;
  const anchor = out.search(/<loc>https:\/\/www\.greetsequipment\.com\/blog(\.html)?<\/loc>/);
  if (anchor >= 0) {
    const end = out.indexOf('</url>', anchor) + '</url>'.length;
    return out.slice(0, end) + nl + blocks + out.slice(end);
  }
  return out.replace('</urlset>', blocks + nl + '</urlset>');
}

// ---------- files ----------
const readManifest = () => {
  try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { return []; }
};

function backupFiles() {
  const dir = path.join(BACKUP_DIR, 'blog-' + new Date().toISOString().replace(/[:.]/g, '-'));
  fs.mkdirSync(dir, { recursive: true });
  for (const name of ['blog.html', 'sitemap.xml', 'blog-posts.json']) {
    const from = path.join(SITE_DIR, name);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(dir, name));
  }
  const all = fs.readdirSync(BACKUP_DIR).filter((n) => n.startsWith('blog-')).sort();
  for (const old of all.slice(0, Math.max(0, all.length - KEEP_BACKUPS))) fs.rmSync(path.join(BACKUP_DIR, old), { recursive: true, force: true });
  return dir;
}

function restoreFiles(dir) {
  for (const name of ['blog.html', 'sitemap.xml', 'blog-posts.json']) {
    const from = path.join(dir, name);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(SITE_DIR, name));
  }
}

// A folder may be (re)written for an article if it is free, was written by an earlier publish,
// or is an old article page (only an index.html holding an article).
function folderIsOurs(slug, previousSlugs) {
  const dir = path.join(SITE_DIR, slug);
  if (!fs.existsSync(dir)) return true;
  if (previousSlugs.includes(slug)) return true;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (!(entries.length === 1 && entries[0].isFile() && entries[0].name === 'index.html')) return false;
  return /class="article-card"/.test(fs.readFileSync(path.join(dir, 'index.html'), 'utf8'));
}

function removeArticleFolder(slug) {
  const dir = path.resolve(SITE_DIR, slug);
  if (!dir.startsWith(SITE_DIR + path.sep) || RESERVED.has(slug) || !fs.existsSync(dir)) return false;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (!entries.every((e) => e.isFile() && e.name === 'index.html')) return false; // never delete a folder holding anything else
  fs.rmSync(dir, { recursive: true, force: true });
  const legacy = path.join(SITE_DIR, 'blogs', `${slug}.html`); // the old copy that only redirects
  if (fs.existsSync(legacy)) fs.rmSync(legacy, { force: true });
  return true;
}

// ---------- the main action ----------
async function publish() {
  if (publishing) throw Object.assign(new Error('A publish is already running. Please wait a moment.'), { status: 409 });
  publishing = true;
  let backup = null;
  try {
    const posts = await BlogPost.find({ status: 'published' }).sort({ date: -1, createdAt: -1 }).lean();
    const previous = readManifest().map((p) => p.slug);

    for (const p of posts) {
      if (!folderIsOurs(p.slug, previous)) {
        throw Object.assign(new Error(`The address "${p.slug}" is already used by another page of the website. Change the article's page address.`), { status: 409 });
      }
    }

    backup = backupFiles();
    const copied = new Set();
    const written = [];
    for (const p of posts) {
      const html = renderArticle(p, copied);
      fs.mkdirSync(path.join(SITE_DIR, p.slug), { recursive: true });
      fs.writeFileSync(path.join(SITE_DIR, p.slug, 'index.html'), html, 'utf8');
      written.push(p.slug);
    }
    const slugs = new Set(posts.map((p) => p.slug));
    const removed = previous.filter((s) => !slugs.has(s) && removeArticleFolder(s));

    const blogFile = path.join(SITE_DIR, 'blog.html');
    fs.writeFileSync(blogFile, updateBlogPage(fs.readFileSync(blogFile, 'utf8'), posts, copied), 'utf8');

    const sitemapFile = path.join(SITE_DIR, 'sitemap.xml');
    if (fs.existsSync(sitemapFile)) fs.writeFileSync(sitemapFile, updateSitemap(fs.readFileSync(sitemapFile, 'utf8'), previous, posts), 'utf8');

    fs.writeFileSync(MANIFEST, JSON.stringify(posts.map((p) => ({ slug: p.slug, title: p.title, date: p.date, modified: p.modified || p.date })), null, 2) + '\n', 'utf8');

    return { published: written.length, removed: removed.length, uploadsCopied: copied.size, backup: path.basename(backup) };
  } catch (err) {
    if (backup) restoreFiles(backup); // leave the website exactly as it was
    throw err;
  } finally {
    publishing = false;
  }
}

// One publish at a time; saves that arrive while one runs are covered by one more run right after it.
const queue = { running: false, again: false, waiters: [] };

async function runQueue() {
  queue.running = true;
  try {
    do {
      queue.again = false;
      const waiting = queue.waiters.splice(0);
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

module.exports = { requestPublish, isPublishing, publish, validate, slugify, sanitizeBody, renderArticle, cardHtml, updateBlogPage, updateSitemap, formatLong, todayIso, SLUG_PATTERN, RESERVED, TEMPLATE };
