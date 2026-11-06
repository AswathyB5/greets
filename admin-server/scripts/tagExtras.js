// Makes the last few things editable that tagContent.js does not cover:
//   1. the choices inside dropdowns (<option>) of the contact form
//   2. the social-sharing tags in <head> (og:title, og:description, og:image, twitter:*)
//   3. the popup / button messages written in main.js (after sending the enquiry form)
//
// It is safe to run again: options that are already tagged are skipped and manifest
// entries are never duplicated.
//
// Run:  npm run tag-extras   (also runs automatically after tag-content)

const fs = require('fs');
const path = require('path');
const { parseDocument } = require('htmlparser2');

const SITE_DIR = path.join(__dirname, '..', '..');
const MANIFEST_PATH = path.join(__dirname, '..', 'data', 'content-manifest.json');
const PAGES = [{ file: 'index.html', name: 'index' }, { file: 'contact.html', name: 'contact' }, { file: 'privacy.html', name: 'privacy' }, { file: 'blog.html', name: 'blog' }];

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const byKey = new Map(manifest.map((f) => [f.key, f]));

function addField(field) {
  if (byKey.has(field.key)) return;
  manifest.push(field);
  byKey.set(field.key, field);
}

const kids = (el) => (el.children || []).filter((c) => c.type === 'tag');
function findAll(node, test, acc = []) {
  for (const c of kids(node)) {
    if (test(c)) acc.push(c);
    findAll(c, test, acc);
  }
  return acc;
}
const clean = (text) => String(text).replace(/\s+/g, ' ').trim();

// ---- 1 + 2: HTML pages ----
const SOCIAL = [
  { attr: 'property', name: 'og:title', suffix: 'og_title', type: 'meta', label: 'Social share title (Facebook / LinkedIn)' },
  { attr: 'property', name: 'og:description', suffix: 'og_description', type: 'meta', label: 'Social share description (Facebook / LinkedIn)' },
  { attr: 'property', name: 'og:image', suffix: 'og_image', type: 'image', label: 'Social share image (Facebook / LinkedIn)' },
  { attr: 'name', name: 'twitter:title', suffix: 'twitter_title', type: 'meta', label: 'Twitter / X share title' },
  { attr: 'name', name: 'twitter:description', suffix: 'twitter_description', type: 'meta', label: 'Twitter / X share description' },
  { attr: 'name', name: 'twitter:image', suffix: 'twitter_image', type: 'image', label: 'Twitter / X share image' },
];

for (const page of PAGES) {
  const file = path.join(SITE_DIR, page.file);
  const source = fs.readFileSync(file, 'utf8');
  const doc = parseDocument(source, { withStartIndices: true, withEndIndices: true });
  const inserts = [];

  // Social tags -> manifest only (no HTML change needed; cms.js finds them by name).
  const metas = findAll(doc, (e) => e.name === 'meta');
  for (const s of SOCIAL) {
    const tag = metas.find((m) => m.attribs[s.attr] === s.name);
    if (!tag || !tag.attribs.content) continue;
    addField({ key: `${page.name}.meta.${s.suffix}`, page: page.name, section: 'meta', type: s.type, label: s.label, default: tag.attribs.content, pages: [page.name] });
  }

  // Dropdown choices (skip the product finder, which is filled by products.js).
  let n = 0;
  for (const select of findAll(doc, (e) => e.name === 'select')) {
    let skip = false;
    for (let a = select; a; a = a.parent) if (a.attribs && a.attribs.id === 'finder') skip = true;
    if (skip) continue;
    let section = 'form';
    for (let a = select.parent; a; a = a.parent) {
      if (a.name === 'section' && a.attribs.id) { section = a.attribs.id; break; }
    }
    const label = select.attribs.name || select.attribs.id || 'dropdown';
    for (const option of kids(select).filter((k) => k.name === 'option')) {
      const text = clean((option.children || []).map((c) => c.data || '').join(''));
      if (!text) continue;
      n += 1;
      if (option.attribs['data-cms']) continue;
      const key = `${page.name}.${section}.option_${n}`;
      inserts.push({ pos: option.startIndex + 1 + option.name.length, text: ` data-cms="${key}"` });
      addField({ key, page: page.name, section, type: 'text', label: `Dropdown choice (${label})`, default: text, pages: [page.name] });
    }
  }

  if (inserts.length) {
    let out = source;
    inserts.sort((a, b) => b.pos - a.pos);
    for (const ins of inserts) out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
    fs.writeFileSync(file, out);
    console.log(`${page.file}: tagged ${inserts.length} dropdown choices`);
  }
}

// ---- 3: messages that live in main.js ----
// main.js reads them through  window.GREETS_MSG[name]  (filled by cms.js from these keys).
const MESSAGES = [
  ['thanks_title', 'Popup title after sending (no name given)', 'Enquiry Received!'],
  ['thanks_title_name', 'Popup title after sending (use {name} for the visitor\'s name)', 'Thank You, {name}!'],
  ['thanks_text', 'Popup message after sending', 'Your equipment enquiry has been sent to enquiry-equipment@greets.co.in. Our team will review your specifications and get in touch.'],
  ['thanks_sla', 'Popup reply-time line', 'We reply within 1 working day'],
  ['thanks_done', 'Popup "Done" button', 'Done'],
  ['thanks_catalog', 'Popup catalog button', 'Browse Equipment Catalog →'],
  ['btn_sending', 'Send button text while sending', 'Sending…'],
  ['btn_send', 'Send button text (ready)', 'Send enquiry'],
  ['error_intro', 'Message when sending fails', 'We could not send that automatically. Your details are below — please copy them, email them to enquiry-equipment@greets.co.in, or call the Bangalore office.'],
  ['error_email', 'Failure box: email link text', 'Email the office'],
  ['error_call', 'Failure box: call link text', 'Call the office'],
  ['error_retry', 'Failure box: retry button text', 'Try sending again'],
];
for (const [name, label, def] of MESSAGES) {
  addField({
    key: `global.messages.${name}`, page: 'global', section: 'messages', type: name === 'thanks_text' || name === 'error_intro' ? 'text' : 'text',
    label, default: def, pages: ['index', 'contact', 'privacy'],
  });
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 1));
console.log(`Manifest now has ${manifest.length} editable fields.`);
