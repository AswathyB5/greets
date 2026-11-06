// Adds "group" information to data/content-manifest.json so the admin panel can
// show repeated blocks (an industry card, a menu item, a stat...) as ONE card
// holding all of its text, image and link fields together.
//
// How a group is found: starting from each editable element we walk up the HTML.
// An ancestor counts as a card when it has at least 2 siblings with the same tag
// and class (like the 15 industry cards). The highest such ancestor below the
// section wins, so a list inside a card belongs to that card.
//
// It also writes two marker attributes into the HTML, so the website script can
// hide a card (delete) or clone one (add):
//   data-cms-card="<card id>" on each card, data-cms-list="<list id>" on the box holding the cards.
//
// Run:  npm run group-content   (also runs automatically after tag-content)

const fs = require('fs');
const path = require('path');
const { parseDocument } = require('htmlparser2');

const SITE_DIR = path.join(__dirname, '..', '..');
const MANIFEST_PATH = path.join(__dirname, '..', 'data', 'content-manifest.json');
const PAGES = ['index.html', 'contact.html', 'privacy.html', 'blog.html'];
const MAX_FIELDS_PER_CARD = 30;
const STOP_TAGS = new Set(['section', 'header', 'footer', 'main', 'body', 'html']);

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const byKey = new Map(manifest.map((f) => [f.key, f]));
for (const f of manifest) { delete f.group; delete f.groupKind; delete f.groupLabel; delete f.groupNo; delete f.cardId; delete f.listId; delete f.repeatable; }

const kids = (el) => el.children.filter((c) => c.type === 'tag');
const classOf = (el) => (el.attribs.class || '').split(/\s+/).filter(Boolean).sort().join('.');
const sig = (el) => `${el.name}.${classOf(el)}`;
const isStop = (el) => !el.parent || el.attribs.id || STOP_TAGS.has(el.name);

function keysOf(el) {
  return Object.entries(el.attribs).filter(([n]) => n.startsWith('data-cms') && n !== 'data-cms-page').map(([, v]) => v);
}

function allKeys(el, acc = []) {
  acc.push(...keysOf(el));
  kids(el).forEach((k) => allKeys(k, acc));
  return acc;
}

function isRepeated(el) {
  if (!el.parent || !(el.attribs.class || el.name === 'li' || el.name === 'tr' || el.name === 'option')) return false;
  return kids(el.parent).filter((s) => sig(s) === sig(el)).length >= 2;
}

function humanize(el) {
  if (el.name === 'option') return 'Dropdown choice';
  const first = (el.attribs.class || el.name).split(/\s+/)[0].replace(/__/g, ' ').replace(/[-_]+/g, ' ');
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function snippet(text, max) {
  const plain = String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > max ? plain.slice(0, max) + '…' : plain;
}

function walk(el, visit) {
  visit(el);
  kids(el).forEach((k) => walk(k, visit));
}

const FORM_TAGS = new Set(['input', 'select', 'textarea', 'button', 'form']);

function hasFormControl(el) {
  let found = false;
  walk(el, (e) => { if (e.type === 'tag' && FORM_TAGS.has(e.name)) found = true; });
  return found;
}

for (const file of PAGES) {
  const filePath = path.join(SITE_DIR, file);
  const source = fs.readFileSync(filePath, 'utf8');
  const doc = parseDocument(source, { withStartIndices: true });
  const groupOf = new Map(); // element -> its card (or null)
  const parentIds = new Map(); // each list of cards gets its own number, so two lists never share ids
  const cardIds = new Map(); // card element -> id
  const inserts = [];
  const insertedList = new Set();

  function cardFor(el) {
    if (groupOf.has(el)) return groupOf.get(el);
    // each choice of a dropdown is its own card (not part of the form row around the dropdown)
    if (el.name === 'option' && isRepeated(el)) { groupOf.set(el, el); return el; }
    let best = null;
    for (let a = el; a && !isStop(a); a = a.parent) {
      if (isRepeated(a) && allKeys(a).length <= MAX_FIELDS_PER_CARD) best = a;
    }
    groupOf.set(el, best);
    return best;
  }

  // Ids are written into the HTML once and then reused, so they never change.
  function idsFor(card, field, no, listNo) {
    if (cardIds.has(card)) return cardIds.get(card);
    const inherited = allKeys(card).map((k) => byKey.get(k)).find((f) => f && f.cardId);
    let cardId = card.attribs['data-cms-card'] || (inherited && inherited.cardId);
    let listId = card.parent.attribs['data-cms-list'] || (inherited && inherited.listId);
    if (!cardId) cardId = `${field.page}.${field.section}.c${listNo}_${no}`;
    if (!listId) listId = `${field.page}.${field.section}.l${listNo}`;
    if (!card.attribs['data-cms-card']) inserts.push({ pos: card.startIndex + 1 + card.name.length, text: ` data-cms-card="${cardId}"` });
    if (!card.parent.attribs['data-cms-list'] && !insertedList.has(card.parent) && card.parent.startIndex !== undefined && card.parent.type === 'tag') {
      insertedList.add(card.parent);
      inserts.push({ pos: card.parent.startIndex + 1 + card.parent.name.length, text: ` data-cms-list="${listId}"` });
    }
    const ids = { cardId, listId, repeatable: !hasFormControl(card) };
    cardIds.set(card, ids);
    return ids;
  }

  walk(doc.children.find((c) => c.name === 'html') || doc, (el) => {
    if (el.type !== 'tag') return;
    for (const key of keysOf(el)) {
      const field = byKey.get(key);
      if (!field) continue;
      const card = cardFor(el);
      if (!card) continue;
      const siblings = kids(card.parent).filter((s) => sig(s) === sig(card));
      const no = siblings.indexOf(card) + 1;
      if (!parentIds.has(card.parent)) parentIds.set(card.parent, parentIds.size + 1);
      // Shared header/footer fields were grouped on an earlier page (first page wins), but this
      // page's copy of the card still needs the same markers, or it could not be hidden/copied here.
      const ids = idsFor(card, field, no, parentIds.get(card.parent));
      if (field.group) continue;
      const title = allKeys(card).map((k) => byKey.get(k)).find((f) => f && (f.type === 'text' || f.type === 'html') && snippet(f.default, 3).length > 2);
      field.group = `${sig(card)}#${no}@${parentIds.get(card.parent)}`;
      field.groupKind = humanize(card);
      field.groupNo = no;
      field.groupLabel = title ? snippet(title.default, 60) : '';
      Object.assign(field, ids);
    }
  });

  if (inserts.length) {
    let out = source;
    inserts.sort((a, b) => b.pos - a.pos);
    for (const ins of inserts) out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
    fs.writeFileSync(filePath, out);
    console.log(`${file}: marked ${inserts.length} cards/lists`);
  }
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 1));
const grouped = manifest.filter((f) => f.group);
console.log(`Grouped ${grouped.length} of ${manifest.length} fields into ${new Set(grouped.map((f) => f.cardId)).size} cards.`);
