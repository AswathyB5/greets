// The header (menus) and footer of the website live in index.html, and that is the copy the admin panel edits
// (Admin > Pages > Header & Footer). Pages that are generated from a template - the blog articles - take
// their header and footer from index.html when they are built, so an edit shows there too.
//
// Links and pictures in those blocks are written for the home page (e.g. href="contact.html");
// rebase() puts the folder prefix of the page being built in front of them ("../" for <slug>/index.html).
// If index.html cannot be read, null is returned and the caller keeps the copy that is in its own template.

const fs = require('fs');
const path = require('path');
const { SITE_DIR } = require('../config/site');

function indexHtml() {
  try { return fs.readFileSync(path.join(SITE_DIR, 'index.html'), 'utf8'); } catch (e) { return ''; }
}

function block(startMark, endMark, keepEnd) {
  const src = indexHtml();
  const a = src.indexOf(startMark);
  if (a < 0) return null;
  const b = src.indexOf(endMark, a);
  if (b < 0) return null;
  return src.slice(a, keepEnd ? b + endMark.length : b);
}

// (?<![-\w]) keeps data-cms-href="..." (the marker, not a link) untouched
function rebase(html, root) {
  return html.replace(/(?<![-\w])(href|src)="([^"]*)"/g, (all, attr, value) => {
    if (value === '' || /^(https?:|\/\/|mailto:|tel:|javascript:|data:)/i.test(value)) return all;
    if (value.startsWith('#')) return `${attr}="${root}index.html${value}"`;
    return `${attr}="${root}${value.replace(/^\.\//, '')}"`;
  });
}

// header + phone menu
function header(root) {
  const b = block('<!-- Header -->', '<!-- Product View Overlay');
  if (!b) return null;
  return rebase(b, root).replace(/(<a[^>]*href="[^"]*index\.html#hero"[^>]*?) class="active"/, '$1').trimEnd();
}

function footer(root) {
  const b = block('<!-- Footer -->', '</footer>', true);
  return b ? rebase(b, root) : null;
}

module.exports = { header, footer, rebase };
