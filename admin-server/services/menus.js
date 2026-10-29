// The Products menus (the "Products" drop-down and the phone menu's product list) come from the product catalogue:
// brand name, brand logo, and the families of each brand. They are written into every page's HTML when you publish,
// so a renamed family, a new family or a new logo shows in every menu of every page, with or without JavaScript.
// The industry menus keep their own wording (editable in Pages); only the names of the industries follow
// Products > Industries.
const { parseDocument } = require('htmlparser2');

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Same markup the site's products.js used to build in the browser.
function productsMegaHtml(catalog, logos) {
  return '<div class="mega-grid">' + catalog.map((b) => `
        <div>
          <a class="mega-brand" href="${esc(b.id)}/">
            <img src="${esc(logos[b.id] || '')}" alt="${esc(b.name)}">
          </a>
          <ul>${(b.cats || []).map((c) => `
            <li><a href="${esc(b.id)}/${esc(c.id)}/">${esc(c.name)}</a></li>`).join('')}
          </ul>
        </div>`).join('') + '\n      </div>';
}

const SEARCH_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

// `finderHref` differs by page: "#finder" on the home page, "index.html#finder" elsewhere.
// `label` is the editable words of the top link (kept as the page has them, with its admin marker).
function mobileProductsHtml(catalog, logos, finderHref, label) {
  return `
        <a href="${esc(finderHref)}" class="mobile-all-products-link">
          ${SEARCH_SVG}
          ${label}
        </a>` + catalog.map((b) => `
        <div class="mobile-brand-group">
          <a class="mobile-brand-title" href="${esc(b.id)}/">
            ${logos[b.id] ? `<img src="${esc(logos[b.id])}" alt="${esc(b.name)}">` : ''}
            <span>${esc(b.name)}</span>
          </a>
          <ul class="mobile-cat-list">${(b.cats || []).map((c) => `
            <li><a href="${esc(b.id)}/${esc(c.id)}/">${esc(c.name)}</a></li>`).join('')}
          </ul>
        </div>`).join('') + '\n      ';
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

// The text between an element's opening and closing tag.
function innerRange(html, el) {
  const from = html.indexOf('>', el.startIndex) + 1;
  const to = html.lastIndexOf('</', el.endIndex);
  return [from, to];
}

// Rewrites the menus of one page. `industryNames` is { id: name }.
function updateMenus(html, { catalog, logos, industryNames, isHome }) {
  const doc = parseDocument(html, { withStartIndices: true, withEndIndices: true });
  const edits = [];
  const mega = findAll(doc, (e) => e.attribs && e.attribs.id === 'mega')[0];
  if (mega) edits.push({ range: innerRange(html, mega), text: '\n      ' + productsMegaHtml(catalog, logos) + '\n    ' });

  const mobile = findAll(doc, (e) => e.attribs && e.attribs.id === 'mobile-products-panel')[0];
  if (mobile) {
    // keep the words of the top link ("Find a system - All products") exactly as the page has them, marker included
    const label = findAll(mobile, (e) => e.name === 'span' && e.attribs['data-cms'] === 'global.header.phone_all_products')[0];
    const labelHtml = label ? html.slice(label.startIndex, label.endIndex + 1) : '<span data-cms="global.header.phone_all_products">Find a system &mdash; All products</span>';
    edits.push({ range: innerRange(html, mobile), text: mobileProductsHtml(catalog, logos, isHome ? '#finder' : 'index.html#finder', labelHtml) });
  }

  // industry menus: the words of each item follow the industries list; everything else stays as the page has it
  for (const id of ['mega-ind', 'mobile-industries-panel']) {
    const box = findAll(doc, (e) => e.attribs && e.attribs.id === id)[0];
    if (!box) continue;
    for (const a of findAll(box, (e) => e.name === 'a' && e.attribs['data-ind'])) {
      const name = industryNames[a.attribs['data-ind']];
      if (name) edits.push({ range: innerRange(html, a), text: esc(name) });
    }
  }

  edits.sort((x, y) => y.range[0] - x.range[0]);
  let out = html;
  for (const e of edits) out = out.slice(0, e.range[0]) + e.text + out.slice(e.range[1]);
  return out;
}

module.exports = { updateMenus, productsMegaHtml, mobileProductsHtml };
