// Text with a little formatting (bold, italic, a link, a colour, a line break) as the website accepts it.
// Anything else a browser might add (scripts, pictures, fonts, styles from another program) is removed here,
// so a saved text can never carry code. cms.js cleans the text again on the website.
//
// Links and coloured words may keep a few harmless style settings, because the original pages use them
// (a footer phone number is "color:inherit; text-decoration:none; font-weight:600"): colour, bold, underline / none, italic.
const { parseDocument } = require('htmlparser2');

const TAGS = { font: 'span', strong: 'strong', b: 'strong', em: 'em', i: 'em', u: 'u', br: 'br', sub: 'sub', sup: 'sup', a: 'a', span: 'span' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const hex = (n) => Math.min(255, Number(n)).toString(16).padStart(2, '0');
// a colour: #abc, #aabbcc, rgb(1,2,3), "inherit", or one of the site's own colour variables like var(--accent-text)
function cleanColour(v) {
  v = String(v || '').trim().toLowerCase();
  let m;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(v)) return v;
  if ((m = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/.exec(v))) return '#' + hex(m[1]) + hex(m[2]) + hex(m[3]);
  if (v === 'inherit') return v;
  if (/^var\(--[a-z0-9-]{1,40}\)$/.test(v)) return v;
  return '';
}

// keeps only the four style settings above, written the same way every time
function cleanStyle(text) {
  const keep = {};
  String(text || '').split(';').forEach((d) => {
    const i = d.indexOf(':');
    if (i < 0) return;
    const p = d.slice(0, i).trim().toLowerCase();
    const v = d.slice(i + 1).trim().toLowerCase().replace(/\s*!important$/, '');
    if (p === 'color') { const c = cleanColour(v); if (c) keep.color = c; }
    else if (p === 'font-weight' && /^(normal|bold|[1-9]00)$/.test(v)) keep['font-weight'] = v;
    else if (p === 'text-decoration' && /^(none|underline)$/.test(v)) keep['text-decoration'] = v;
    else if (p === 'font-style' && /^(normal|italic)$/.test(v)) keep['font-style'] = v;
  });
  return Object.entries(keep).map(([k, v]) => `${k}:${v}`).join(';');
}

const safeHref = (h) => (h && h.length <= 500 && !/[\u0000-\u001f\s]/.test(h) && !/^(javascript|data|vbscript):/i.test(h) ? h : '');

function serialize(nodes) {
  let out = '';
  for (const n of nodes || []) {
    if (n.type === 'text') { out += esc(n.data.replace(/ /g, ' ')); continue; }
    if (n.type !== 'tag') continue;
    if (n.name === 'script' || n.name === 'style') continue;
    const inner = serialize(n.children);
    const tag = TAGS[n.name];
    if (!tag) { out += n.name === 'div' || n.name === 'p' ? (out && !/<br>$/.test(out) ? '<br>' : '') + inner : inner; continue; }
    if (tag === 'br') { out += '<br>'; continue; }
    let attrs = '';
    const a = n.attribs || {};
    if (tag === 'a') {
      const href = safeHref(a.href);
      if (href) attrs += ` href="${esc(href)}"`;
      if (a.target === '_blank') attrs += ' target="_blank" rel="noopener"';
    }
    if (tag === 'span' || tag === 'a') {
      const cls = (a.class || '').split(/\s+/).filter((c) => /^[A-Za-z0-9_-]{1,40}$/.test(c)).join(' ');
      if (cls) attrs += ` class="${cls}"`;
      let style = cleanStyle(a.style);
      if (!style && tag === 'span' && a.color) style = cleanStyle('color:' + a.color); // <font color> from old editors
      if (style) attrs += ` style="${style}"`;
    }
    // an EMPTY span with no class or style is junk and is dropped; a bare span with words in it can matter (the site's own
    // CSS may style it, like the green word in "Talk to Greets"), so it stays
    if (tag === 'span' && !attrs && !inner) continue;
    // a span that is only bold / only italic is written as the proper tag
    if (tag === 'span' && /^ style="font-weight:(bold|[6-9]00)"$/.test(attrs)) { out += `<strong>${inner}</strong>`; continue; }
    if (tag === 'span' && /^ style="font-style:italic"$/.test(attrs)) { out += `<em>${inner}</em>`; continue; }
    out += `<${tag}${attrs}>${inner}</${tag}>`;
  }
  return out;
}

function sanitizeRich(html) {
  return serialize(parseDocument(String(html)).children).replace(/(<br>)+$/, '').trim();
}

module.exports = { sanitizeRich, cleanStyle };
