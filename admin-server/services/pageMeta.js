// Search-engine settings of the four hand-made pages (home, contact, privacy, blog list): the browser-tab title,
// the description Google shows, and the Facebook / LinkedIn / Twitter share title, description and picture.
//
// When they are saved in Admin > Pages, the new words are written straight into the <head> of the page file,
// so Google and the share previews read them from the HTML itself (not from JavaScript).
// cms.js still applies the same values when the page loads, so nothing depends on this step succeeding.
//
// Only these tags are touched: <title>, meta description, og:title / og:description / og:image and
// twitter:title / twitter:description / twitter:image.

const fs = require('fs');
const path = require('path');

const PAGE_FILES = { index: 'index.html', contact: 'contact.html', privacy: 'privacy.html', blog: 'blog.html' };

// field name (the last part of the key, e.g. "og_title") -> the tag it belongs to
const TAGS = {
  description: { attr: 'name', name: 'description' },
  og_title: { attr: 'property', name: 'og:title' },
  og_description: { attr: 'property', name: 'og:description' },
  og_image: { attr: 'property', name: 'og:image', image: true },
  twitter_title: { attr: 'name', name: 'twitter:title' },
  twitter_description: { attr: 'name', name: 'twitter:description' },
  twitter_image: { attr: 'name', name: 'twitter:image', image: true },
};

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const reEscape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// A share picture must be a full web address. Pictures uploaded to the admin server (uploads/...) stay as they
// are in the file: cms.js shows them on the live page.
function imageValue(value, publicUrl) {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^uploads\//.test(value)) return null;
  return publicUrl.replace(/\/$/, '') + '/' + value.replace(/^\.?\//, '');
}

// values: { title, description, og_title, ... } (only the ones to write). Returns the list of tags changed.
function applyMeta(page, values, siteDir, publicUrl) {
  const file = PAGE_FILES[page] && path.join(siteDir, PAGE_FILES[page]);
  if (!file || !fs.existsSync(file)) return [];
  let html = fs.readFileSync(file, 'utf8');
  const changed = [];
  const base = publicUrl || 'https://www.greetsequipment.com';

  if (typeof values.title === 'string' && values.title.trim()) {
    const next = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escText(values.title.trim())}</title>`);
    if (next !== html) { html = next; changed.push('title'); }
  }
  for (const [field, tag] of Object.entries(TAGS)) {
    let value = values[field];
    if (typeof value !== 'string' || !value.trim()) continue;
    if (tag.image) {
      value = imageValue(value.trim(), base);
      if (value === null) continue;
    }
    // <meta name="x" content="...">, also when the content sits on the next line
    const re = new RegExp(`(<meta\\s+${tag.attr}="${reEscape(tag.name)}"\\s+content=")[^"]*(")`);
    const next = html.replace(re, (all, a, b) => a + escAttr(String(value).replace(/\s+/g, ' ').trim()) + b);
    if (next !== html) { html = next; changed.push(field); }
  }
  if (changed.length) fs.writeFileSync(file, html);
  return changed;
}

module.exports = { applyMeta, PAGE_FILES };
