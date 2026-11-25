// Makes the FIXED WORDING of the generated product pages editable from the admin panel.
//
// build_pages.js writes ~600 brand / category / machine pages. Most words on them come from the product
// catalogue (edited in Admin > Products), but every page also carries the same fixed wording:
// "Key features", "Technical data", "Enquire about this", "Authorised Dealer in India" ...
//
// How we find that wording without hand-marking every template: a piece of text that appears, word for word,
// on many pages of the same kind is template wording; text that is unique to one page is catalogue data.
// Names are swapped for tokens first ("Enquire about {model}", "Enquire for {brand} in India"), so
// wording that includes the product's name still counts as the same sentence on every page.
//
//   1. add()    - every generated page is handed over here instead of being written straight away;
//   2. finish() - counts the wording, puts a data-cms marker on the fixed pieces (the same kind of marker
//                 the home page has), writes the pages, and writes data/template-fields.json
//                 (the list the admin panel shows, loaded by routes/content.js).
//
// cms.js (the script every page already uses) then swaps in the edited wording on the live site and fills
// the {tokens} back in from the data-cms-vars attribute.
//
// If htmlparser2 is not installed the pages are simply written untouched.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let parseDocument = null;
try { ({ parseDocument } = require('htmlparser2')); } catch (e) { /* pages are written untouched */ }

const FIELDS_PATH = path.join(__dirname, '..', 'data', 'template-fields.json');

// What each kind of page is called in the admin, and how many pages must share a sentence before it counts as wording.
const KINDS = {
  brand: { title: 'Brand pages (BMI, Novatec, Huasheng)', min: 2 },
  family: { title: 'Category pages', min: 4 },
  machine: { title: 'Machine pages', min: 6 },
};
const MAX_LENGTH = 170; // longer text is catalogue data, not wording

const SKIP_TAGS = new Set(['script', 'style', 'svg', 'noscript', 'select', 'option', 'template', 'iframe', 'textarea', 'canvas', 'head', 'li', 'input']);
// Lists/tables that are filled from the catalogue (feature bullets, spec rows, process pills ...).
const SKIP_CLASSES = new Set(['spec', 'feat', 'pills', 'indline', 'crumbs', 'mthumbs', 'mrel-links']);
const INLINE_TAGS = new Set(['a', 'strong', 'em', 'b', 'i', 'span', 'br', 'u', 'small', 'sup', 'sub', 'mark', 'abbr', 'code', 'wbr']);
const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'th', 'caption', 'summary']);
const LABELS = {
  h1: 'Main heading', h2: 'Heading', h3: 'Sub-heading', h4: 'Sub-heading', h5: 'Sub-heading', h6: 'Sub-heading',
  p: 'Paragraph', a: 'Link text', span: 'Text', button: 'Button text', label: 'Label', div: 'Text', b: 'Bold text',
  em: 'Text', strong: 'Bold text', small: 'Small text', th: 'Table heading', figcaption: 'Caption', caption: 'Table caption',
  summary: 'Title',
};

const collapse = (s) => String(s).replace(/\s+/g, ' ').trim();
const classesOf = (el) => (el.attribs.class || '').split(/\s+/).filter(Boolean);
const hasText = (n) => n.type === 'text' && n.data.trim() !== '';
const insertPoint = (el) => el.startIndex + 1 + el.name.length;
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/'/g, '&#39;');

function slug(text) {
  return String(text).toLowerCase().replace(/\{(\w+)\}/g, '$1').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 36);
}
function keyFor(kind, tokenText) {
  const hash = crypto.createHash('sha1').update(tokenText).digest('hex').slice(0, 6);
  return `${kind}.wording.${slug(tokenText) || 't'}_${hash}`;
}

// Swaps the page's own names for {tokens}, longest name first.
// "4 Models in Family" / "3 product ranges": the number differs per page, so it becomes {count}
const COUNT_LINE = /^(\d+) (Models? in .+|product ranges?)$/;
function countOf(text) {
  const m = COUNT_LINE.exec(text);
  return m ? { text: `{count} ${m[2]}`, vars: { count: m[1] } } : null;
}

function tokenize(text, vars) {
  let out = text;
  Object.entries(vars || {})
    .filter(([, v]) => v && String(v).length >= 2)
    .sort((a, b) => String(b[1]).length - String(a[1]).length)
    .forEach(([name, value]) => { out = out.split(String(value)).join(`{${name}}`); });
  return out;
}
const worthEditing = (tokenText) => !/^\d/.test(tokenText) && /[A-Za-z]{2,}/.test(tokenText.replace(/\{\w+\}/g, '')) && tokenText.length <= MAX_LENGTH;

function findFirst(node, name) {
  for (const c of node.children || []) {
    if (c.type !== 'tag') continue;
    if (c.name === name) return c;
    const f = findFirst(c, name);
    if (f) return f;
  }
  return null;
}

// Candidate pieces of wording inside <main> of one page.
function candidates(html, vars) {
  const doc = parseDocument(html, { withStartIndices: true, withEndIndices: true });
  const main = findFirst(doc, 'main');
  const found = [];
  if (!main) return { doc, found };

  function visit(el) {
    if (el.type !== 'tag' || SKIP_TAGS.has(el.name) || classesOf(el).some((c) => SKIP_CLASSES.has(c))) return;
    if (el.name === 'th' && el.attribs.scope === 'row') return; // a spec label from the catalogue
    if (el.name === 'td') { el.children.filter((k) => k.type === 'tag' && (k.name === 'a' || k.name === 'button')).forEach(visit); return; }
    const kids = el.children;
    const textKids = kids.filter(hasText);
    const elementKids = kids.filter((k) => k.type === 'tag');

    if (textKids.length && elementKids.every((k) => INLINE_TAGS.has(k.name))) {
      const hasHtml = elementKids.length > 0;
      const raw = hasHtml ? collapse(html.slice(kids[0].startIndex, kids[kids.length - 1].endIndex + 1)) : collapse(kids.map((k) => k.data).join(''));
      const cnt = hasHtml ? null : countOf(raw);
      found.push({ kind: 'element', el, tag: el.name, type: hasHtml ? 'html' : 'text', text: cnt ? cnt.text : tokenize(raw, vars), itemVars: cnt ? cnt.vars : null });
      return;
    }
    for (const kid of kids) {
      if (kid.type === 'text' && hasText(kid)) {
        const cnt = countOf(collapse(kid.data));
        found.push({ kind: 'piece', el, tag: el.name, type: 'text', text: cnt ? cnt.text : tokenize(collapse(kid.data), vars), itemVars: cnt ? cnt.vars : null, node: kid });
      } else if (kid.type === 'tag') visit(kid);
    }
  }
  main.children.forEach(visit);
  return { doc, found };
}

function createTagger() {
  const pages = []; // { file, html, kind, id, vars, found }
  const seen = {};  // kind -> tokenText -> Set(page ids)

  return {
    add(file, html, ctx) {
      if (!parseDocument || !KINDS[ctx.kind]) { pages.push({ file, html, ctx, found: [] }); return; }
      const { found } = candidates(html, ctx.vars);
      for (const f of found) {
        if (!worthEditing(f.text) || /^\{\w+\}$/.test(f.text)) continue;
        const bucket = ((seen[ctx.kind] = seen[ctx.kind] || {})[f.text] = (seen[ctx.kind][f.text] || new Set()));
        bucket.add(ctx.id);
      }
      pages.push({ file, html, ctx, found });
    },

    // write(file, html) saves one page. Returns a short report.
    finish(write) {
      const fields = new Map();
      let tagged = 0;
      for (const p of pages) {
        const { ctx } = p;
        let out = p.html;
        if (parseDocument && KINDS[ctx.kind]) {
          const inserts = [];
          for (const f of p.found) {
            const ids = (seen[ctx.kind] || {})[f.text];
            if (!ids || ids.size < KINDS[ctx.kind].min || !worthEditing(f.text)) continue;
            const key = keyFor(ctx.kind, f.text);
            const usesVars = /\{\w+\}/.test(f.text);
            const attrs = ` data-cms="${key}"` + (usesVars ? ` data-cms-vars='${escAttr(JSON.stringify(Object.assign({}, ctx.vars, f.itemVars || {})))}'` : '');
            if (f.kind === 'element') inserts.push({ pos: insertPoint(f.el), text: attrs });
            else {
              const raw = html2(p.html, f.node);
              inserts.push({ pos: f.node.startIndex + raw.lead, text: `<span${attrs}>` });
              inserts.push({ pos: f.node.endIndex + 1 - raw.trail, text: '</span>' });
            }
            if (!fields.has(key)) {
              fields.set(key, {
                key, page: ctx.kind, section: HEADINGS.has(f.tag) ? 'headings' : (f.tag === 'a' || f.tag === 'button' || f.tag === 'span' || f.tag === 'em' ? 'buttons-labels' : 'text'),
                type: f.type, label: (LABELS[f.tag] || 'Text') + (usesVars ? ' (keep the {words in braces}: they are replaced by the product name)' : ''),
                default: f.text, pages: [ctx.kind], pageCount: ids.size,
              });
            }
            tagged++;
          }
          // the page name + cms.js, like every other page of the site
          const body = out.match(/<body\b/);
          if (body) inserts.push({ pos: body.index + 5, text: ` data-cms-page="${ctx.kind}"` });
          inserts.sort((a, b) => b.pos - a.pos);
          for (const ins of inserts) out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
          out = out.replace(/(<script src="((?:\.\.\/|\.\/)*)main\.js" defer><\/script>)/, '$1\n  <script src="$2cms.js" defer></script>');
        }
        write(p.file, out);
      }
      if (parseDocument) {
        const list = [...fields.values()].sort((a, b) => a.page.localeCompare(b.page) || a.section.localeCompare(b.section) || a.default.localeCompare(b.default));
        fs.mkdirSync(path.dirname(FIELDS_PATH), { recursive: true });
        fs.writeFileSync(FIELDS_PATH, JSON.stringify(list, null, 1));
        return { pages: pages.length, markers: tagged, fields: list.length };
      }
      return { pages: pages.length, markers: 0, fields: 0 };
    },
  };
}

// leading / trailing white space of a text node (so the <span> hugs the words)
function html2(source, node) {
  const raw = source.slice(node.startIndex, node.endIndex + 1);
  return { lead: raw.length - raw.trimStart().length, trail: raw.length - raw.trimEnd().length };
}

module.exports = { createTagger, KINDS };
