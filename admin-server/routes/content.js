const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const ContentValue = require('../models/ContentValue');
const imageStore = require('../services/imageStore');
const { sanitizeRich } = require('../services/richText');
const { requireAuthApi } = require('../middleware/auth');

const MANIFEST = require('../data/content-manifest.json');
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const MAX_VALUE_LENGTH = 20000;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const FIELDS = new Map(MANIFEST.map((f) => [f.key, f]));

// Links to other pages of this site (contact.html, bmi/, #why ...) are not offered for
// editing, except in the header/footer and menus. External links (https://..., mailto:, tel:)
// are editable everywhere.
const LINK_SECTIONS = new Set(['header', 'footer', 'mobile-products-panel', 'mobile-industries-panel']);
const OWN_SITE = /^https?:\/\/(www\.)?greetsequipment\.com/i;
const isExternalLink = (href) => (/^(https?:\/\/|mailto:|tel:)/i.test(href) || href.startsWith('//')) && !OWN_SITE.test(href);
// Only what a visitor can see on the website is offered for editing:
//  - the contact form's hidden spam-trap box has a label nobody sees,
//  - the "description" of a picture (alt text) is read by Google and screen readers, not shown.
const isAltText = (f) => /alt text/i.test(f.label || '');
const isHiddenField = (f) => /^please leave this field empty$/i.test(String(f.default || '').trim()) || isAltText(f);

// Words on the page can carry bold / italic / a link / a colour. A few fields are plain by nature: the words
// of a dropdown choice, a placeholder, the popup messages (the website uses them as plain text).
const isPlainField = (f) => /placeholder/i.test(f.label || '') || f.groupKind === 'Dropdown choice' || f.section === 'messages' || f.type !== 'text';
const isRich = (f) => f.type === 'html' || (f.type === 'text' && !isPlainField(f));
const typeFor = (f) => (isRich(f) ? 'html' : f.type); // how the website applies the saved value
const cleanFor = (f, value) => (isRich(f) ? sanitizeRich(value) : value);
const isEditable = (f) => !isHiddenField(f) && (f.type !== 'link' || f.button || (f.page === 'global' && LINK_SECTIONS.has(f.section)) || isExternalLink(f.default));

// Cards (repeated blocks): id -> { cardId, listId, page, repeatable, fields }
const CARDS = new Map();
for (const f of MANIFEST) {
  if (!f.cardId) continue;
  if (!CARDS.has(f.cardId)) CARDS.set(f.cardId, { cardId: f.cardId, listId: f.listId, page: f.page, no: f.groupNo, repeatable: f.repeatable, fields: [] });
  CARDS.get(f.cardId).fields.push(f);
}
const MAX_ADDED_PER_LIST = 30;

// The first card of a list is the model new cards are copied from.
function templateOf(listId) {
  const cards = [...CARDS.values()].filter((c) => c.listId === listId && c.repeatable);
  cards.sort((a, b) => a.no - b.no);
  return cards[0] || null;
}

const PAGE_TITLES = {
  global: 'Header & Footer (all pages)',
  index: 'Home page',
  contact: 'Contact page',
  privacy: 'Privacy Notice page',
  blog: 'Blog page',
};

// Image types we accept, checked by the file's first bytes (not its name).
const IMAGE_SIGNATURES = [
  { ext: 'png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: 'gif', test: (b) => b.subarray(0, 4).toString('ascii') === 'GIF8' },
  { ext: 'webp', test: (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP' },
];

function parseBlock(raw) {
  try {
    const b = JSON.parse(raw);
    return { template: String(b.template || ''), fields: b.fields && typeof b.fields === 'object' ? b.fields : {} };
  } catch (e) {
    return { template: '', fields: {} };
  }
}

// ---------- Public: what the website asks for ----------
const publicRouter = express.Router();

// GET /api/public/content/:page -> { values, types } for the shared
// header/footer plus that page. No login needed (visitors read this).
publicRouter.get('/content/:page', async (req, res, next) => {
  try {
    const page = req.params.page;
    if (!PAGE_TITLES[page] || page === 'global') return res.status(404).json({ message: 'Unknown page' });
    const rows = await ContentValue.find({ page: { $in: ['global', page] } }).select('key value -_id').lean();
    const values = {};
    const types = {}; // text | html | image | link ... so the site knows how to apply each value
    for (const row of rows) {
      values[row.key] = row.value;
      if (FIELDS.has(row.key)) types[row.key] = typeFor(FIELDS.get(row.key));
      else if (row.key.endsWith('.deleted')) types[row.key] = 'deleted';
      else if (row.key.includes('.new.')) {
        types[row.key] = 'block';
        // the site also needs to know how to apply each field of an added card (text or rich text)
        for (const k of Object.keys(parseBlock(row.value).fields)) if (FIELDS.has(k)) types[k] = typeFor(FIELDS.get(k));
      }
    }
    res.set('Cache-Control', 'no-cache');
    res.json({ values, types });
  } catch (err) {
    next(err);
  }
});

// ---------- Admin (login required) ----------
const adminRouter = express.Router();
adminRouter.use(requireAuthApi);

// GET /api/content/pages -> the list of editable pages with field counts.
adminRouter.get('/pages', async (req, res, next) => {
  try {
    const edited = await ContentValue.aggregate([{ $group: { _id: '$page', count: { $sum: 1 } } }]);
    const editedBy = Object.fromEntries(edited.map((e) => [e._id, e.count]));
    const pages = Object.keys(PAGE_TITLES).map((id) => ({
      id,
      title: PAGE_TITLES[id],
      fields: MANIFEST.filter((f) => f.page === id && isEditable(f)).length,
      edited: editedBy[id] || 0,
    }));
    res.json({ pages });
  } catch (err) {
    next(err);
  }
});

// GET /api/content/pages/:page -> every field of the page with its original and current value.
adminRouter.get('/pages/:page', async (req, res, next) => {
  try {
    const page = req.params.page;
    if (!PAGE_TITLES[page]) return res.status(404).json({ message: 'Unknown page' });
    const rows = await ContentValue.find({ page }).select('key value -_id').lean();
    const saved = new Map(rows.map((r) => [r.key, r.value]));
    const list = MANIFEST.filter((f) => f.page === page);
    const fields = list.map((f, i) => {
      if (!isEditable(f)) return null;
      // A link has no words of its own, so say which text sits next to it.
      const next = list[i + 1];
      const nextIsText = next && next.section === f.section && (next.type === 'text' || next.type === 'html');
      return {
        key: f.key,
        section: f.section,
        type: f.type,
        rich: isRich(f),
        button: !!f.button,
        label: f.label,
        group: f.group || '',
        cardId: f.cardId || '',
        listId: f.listId || '',
        repeatable: !!f.repeatable,
        groupKind: f.groupKind || '',
        groupNo: f.groupNo || 0,
        groupLabel: f.groupLabel || '',
        context: f.type === 'link' && nextIsText ? next.default : '',
        original: f.default,
        value: saved.has(f.key) ? saved.get(f.key) : null,
      };
    }).filter(Boolean);
    const extra = await ContentValue.find({ page, key: { $regex: /\.(deleted|new\.)/ } }).sort({ key: 1 }).lean();
    const deleted = extra.filter((r) => r.key.endsWith('.deleted')).map((r) => r.key.slice(0, -'.deleted'.length));
    const blocks = extra.filter((r) => r.key.includes('.new.')).map((r) => ({
      key: r.key,
      listId: r.key.split('.new.')[0],
      ...parseBlock(r.value),
    }));
    res.json({ page, title: PAGE_TITLES[page], fields, blocks, deleted });
  } catch (err) {
    next(err);
  }
});

function checkValue(field, value) {
  if (typeof value !== 'string') return 'Must be text.';
  if (value.length > MAX_VALUE_LENGTH) return `Must be ${MAX_VALUE_LENGTH} characters or fewer.`;
  if ((field.type === 'link' || field.type === 'image') && /^\s*(javascript|data|vbscript):/i.test(value)) {
    return 'This kind of address is not allowed.';
  }
  return null;
}

// PUT /api/content/pages/:page  body: { values: { key: "new text" | null } }
// null puts the original text back. Only the keys sent are changed.
adminRouter.put('/pages/:page', async (req, res, next) => {
  try {
    const page = req.params.page;
    if (!PAGE_TITLES[page]) return res.status(404).json({ message: 'Unknown page' });
    const values = req.body && typeof req.body.values === 'object' && req.body.values ? req.body.values : null;
    if (!values) return res.status(400).json({ message: 'Nothing to save.' });

    const errors = {};
    const ops = [];
    for (const [key, value] of Object.entries(values)) {
      const field = FIELDS.get(key);
      if (!field || field.page !== page) {
        errors[key] = 'Unknown field.';
        continue;
      }
      if (value === null) {
        ops.push({ deleteOne: { filter: { key } } });
        continue;
      }
      const problem = checkValue(field, value);
      if (problem) {
        errors[key] = problem;
        continue;
      }
      ops.push({
        updateOne: { filter: { key }, update: { $set: { key, page, value: cleanFor(field, value) } }, upsert: true },
      });
    }
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Some fields are not valid.', errors });
    if (ops.length) await ContentValue.bulkWrite(ops);
    res.json({ saved: ops.length });
  } catch (err) {
    next(err);
  }
});

// Checks the values of an added card against the model card. Returns { fields } or { errors }.
function cleanBlockFields(template, input) {
  const allowed = new Map(template.fields.filter(isEditable).map((f) => [f.key, f]));
  const errors = {};
  const fields = {};
  if (!input || typeof input !== 'object') return { errors: { _: 'No values received.' } };
  for (const [key, value] of Object.entries(input)) {
    const field = allowed.get(key);
    if (!field) { errors[key] = 'Unknown field.'; continue; }
    const problem = checkValue(field, value);
    if (problem) errors[key] = problem;
    else fields[key] = cleanFor(field, value);
  }
  return Object.keys(errors).length ? { errors } : { fields };
}

// POST /api/content/blocks  body: { listId, fields }  -> adds a new card copied from the list's first card.
adminRouter.post('/blocks', async (req, res, next) => {
  try {
    const template = templateOf(req.body && req.body.listId);
    if (!template) return res.status(400).json({ message: 'This list cannot have new items.' });
    const count = await ContentValue.countDocuments({ key: { $regex: '^' + template.listId.replace(/\./g, '\\.') + '\\.new\\.' } });
    if (count >= MAX_ADDED_PER_LIST) return res.status(400).json({ message: `At most ${MAX_ADDED_PER_LIST} items can be added to one list.` });
    const clean = cleanBlockFields(template, req.body.fields);
    if (clean.errors) return res.status(400).json({ message: 'Some fields are not valid.', errors: clean.errors });
    const key = `${template.listId}.new.${Date.now().toString(36)}`;
    await ContentValue.create({ key, page: template.page, value: JSON.stringify({ template: template.cardId, fields: clean.fields }) });
    res.status(201).json({ key });
  } catch (err) {
    next(err);
  }
});

async function findBlock(key) {
  if (!key.includes('.new.')) return null;
  return ContentValue.findOne({ key });
}

// PUT /api/content/blocks/:key  body: { fields }  -> edits an added card.
adminRouter.put('/blocks/:key', async (req, res, next) => {
  try {
    const row = await findBlock(req.params.key);
    if (!row) return res.status(404).json({ message: 'Item not found.' });
    const template = CARDS.get(parseBlock(row.value).template);
    if (!template) return res.status(400).json({ message: 'The original card no longer exists.' });
    const clean = cleanBlockFields(template, req.body && req.body.fields);
    if (clean.errors) return res.status(400).json({ message: 'Some fields are not valid.', errors: clean.errors });
    row.value = JSON.stringify({ template: template.cardId, fields: clean.fields });
    await row.save();
    res.json({ saved: 1 });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/content/blocks/:key  -> removes an added card for good.
adminRouter.delete('/blocks/:key', async (req, res, next) => {
  try {
    const row = await findBlock(req.params.key);
    if (!row) return res.status(404).json({ message: 'Item not found.' });
    await row.deleteOne();
    res.json({ deleted: 1 });
  } catch (err) {
    next(err);
  }
});

// PUT /api/content/cards/:cardId  body: { deleted: true|false }
// Hides a card that is written in the page (or brings it back). Nothing is erased from the HTML.
adminRouter.put('/cards/:cardId', async (req, res, next) => {
  try {
    const card = CARDS.get(req.params.cardId);
    if (!card || !card.repeatable) return res.status(404).json({ message: 'This item cannot be deleted.' });
    const key = `${card.cardId}.deleted`;
    if (req.body && req.body.deleted === true) {
      await ContentValue.updateOne({ key }, { $set: { key, page: card.page, value: '1' } }, { upsert: true });
    } else if (req.body && req.body.deleted === false) {
      await ContentValue.deleteOne({ key });
    } else {
      return res.status(400).json({ message: 'Say whether to delete or restore.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// POST /api/content/upload  body: { data: "<base64 of the image file>" }
// Saves the picture (Cloudinary if configured, else admin-server/uploads) and returns the value to store.
adminRouter.post('/upload', async (req, res, next) => {
  try {
    const raw = req.body && typeof req.body.data === 'string' ? req.body.data.replace(/^data:[^,]*,/, '') : '';
    if (!raw) return res.status(400).json({ message: 'No image received.' });
    const buffer = Buffer.from(raw, 'base64');
    if (buffer.length < 12) return res.status(400).json({ message: 'That file is empty or not an image.' });
    if (buffer.length > MAX_IMAGE_BYTES) return res.status(413).json({ message: 'Image is larger than 5 MB.' });
    const type = IMAGE_SIGNATURES.find((s) => s.test(buffer));
    if (!type) return res.status(400).json({ message: 'Only PNG, JPG, GIF or WebP images are allowed.' });

    const saved = await imageStore.save(buffer, type.ext); // Cloudinary address, or uploads/<file> when it is not set up
    res.status(201).json({ path: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = { publicRouter, adminRouter, UPLOAD_DIR };
