// What can be edited for a brand, a family and a product, and how each value is checked.
// The admin form is built from the same list (GET /api/catalog/schema), so the screen and
// the server always agree. Fields that are not listed here are kept untouched.

const fs = require('fs');
const path = require('path');
const { SITE_DIR } = require('../config/site');
const imageStore = require('./imageStore');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ---------- field lists ----------
const f = (key, label, kind, extra = {}) => ({ key, label, kind, ...extra });

// Every section says which part of the website page it controls ("intro"), and every field says where its
// words or picture appear ("where"), so the person editing can tell what they are changing.
// Fields the website never shows (a product's "tag", "configNote", "spec_url") are not offered; a product that
// has them keeps them untouched.
const BRAND_SECTIONS = [
  {
    id: 'basic', title: 'Brand details', intro: 'The heading area of the brand page, and the brand on the home page.', fields: [
      f('name', 'Brand name', 'text', { required: true, max: 120, where: 'Heading of the brand page, the menus and the brand cards' }),
      f('full', 'Full company name', 'text', { max: 200, where: 'Not on the page itself. Used in the page description Google shows' }),
      f('country', 'Country', 'text', { max: 80, where: 'Small country label next to the heading' }),
      f('site', 'Manufacturer website', 'url', { where: 'The "View on ... website" button' }),
      f('intro', 'Introduction', 'textarea', { help: 'Shown at the top of the brand page and in search results.', where: 'The paragraph under the heading, and the description Google shows' }),
      f('strengths', 'Key strengths', 'list', { help: 'One strength per line.', where: 'The "Key strengths" list on the brand page' }),
    ],
  },
  {
    id: 'photos', title: 'Photos', intro: 'The picture area on the right of the brand page.', fields: [
      f('logo', 'Brand logo', 'image', { where: 'The small logo in the Products menu, the finder buttons and the top of the brand page' }),
      f('photo', 'Main photo', 'image', { where: 'The big picture on the brand page, and the brand card on the home page' }),
      f('gallery', 'Photo gallery', 'gallery', { where: 'The small pictures under the big one (the first caption shows under the big picture)' }),
    ],
  },
  {
    id: 'seo', title: 'Google search listing', intro: 'The title and description Google shows for this brand page. Leave a box empty to use the automatic wording.', fields: [
      f('seo_title', 'Page title', 'text', { max: 200, help: 'Example: Huasheng PVD coating machines in India | Authorised Partner – Greets Equipment. Empty = automatic title.', where: 'The browser tab title and the blue title link in Google. Not shown on the page itself' }),
      f('seo_desc', 'Page description', 'textarea', { max: 400, help: 'About 150 to 160 characters. Empty = automatic description.', where: 'The grey text under the title in Google. Not shown on the page itself' }),
    ],
  },
];

const FAMILY_SECTIONS = [
  {
    id: 'basic', title: 'Family details', intro: 'The heading area of the family page, and the family card on the home page.', fields: [
      f('name', 'Family name', 'text', { required: true, max: 150, help: 'Example: Gas quenching furnaces', where: 'Heading of the family page, and the family card on the home page' }),
      f('sub', 'Short subtitle', 'text', { max: 200, where: 'The green line under the heading, and the small line on the home-page card' }),
      f('desc', 'Description', 'textarea', { where: 'The paragraph under the heading' }),
      f('family', 'Family label', 'text', { max: 150, help: 'Optional extra label used on some pages.', where: 'Small grey label above the heading' }),
      f('url', 'Manufacturer page for this family', 'url', { where: 'The "View on ... website" button' }),
    ],
  },
  {
    id: 'photos', title: 'Photo', intro: 'The picture of the family.', fields: [
      f('photo', 'Family photo', 'image', { where: 'The picture on the family page, and the small picture on the home-page family card' }),
    ],
  },
  {
    id: 'applications', title: 'Applications', intro: 'Optional: typical uses of this family.', fields: [
      f('applications', 'Applications', 'cards', {
        help: 'Optional. Typical uses of this family, shown as cards on its page.',
        where: 'Cards of typical uses, used by the product finder on the home page',
        itemLabel: 'Application',
        item: [
          f('name', 'Name', 'text', { max: 150 }),
          f('short', 'Short line', 'text', { max: 300 }),
          f('desc', 'Description', 'textarea'),
          f('url', 'Link', 'url'),
          f('k', 'Search keywords', 'text', { max: 500 }),
          f('i', 'Industries', 'tags'),
        ],
      }),
    ],
  },
  {
    id: 'seo', title: 'Google search listing', intro: 'The title and description Google shows for this family page. Leave a box empty to use the automatic wording.', fields: [
      f('seo_title', 'Page title', 'text', { max: 200, help: 'Example: Huasheng PVD coating machines in India | Authorised Partner – Greets Equipment. Empty = automatic title.', where: 'The browser tab title and the blue title link in Google. Not shown on the page itself' }),
      f('seo_desc', 'Page description', 'textarea', { max: 400, help: 'About 150 to 160 characters. Empty = automatic description.', where: 'The grey text under the title in Google. Not shown on the page itself' }),
    ],
  },
];

// The product sections follow the product page from top to bottom, and the number of each section
// matches the number on the page map beside the form.
const PRODUCT_SECTIONS = [
  {
    id: 'heading', title: 'Heading area', intro: 'The title block at the top left of the product page.', fields: [
      f('name', 'Product name', 'text', { required: true, max: 200, where: 'The big heading, and the name in menus, lists and the home-page finder' }),
      f('desc', 'Introduction', 'textarea', { help: 'The main text on the product page.', where: 'The paragraph under the heading' }),
      f('series', 'Series', 'text', { max: 120, where: 'Small grey label above the heading (used first when filled)' }),
      f('family', 'Family label', 'text', { max: 200, where: 'Small grey label above the heading, when there is no series' }),
      f('bmi_desc', 'Manufacturer headline', 'text', { max: 300, where: 'Small grey label above the heading, when there is no series or family label' }),
      f('url', 'Manufacturer page', 'url', { where: 'The "View on ... website" button under the paragraph' }),
    ],
  },
  {
    id: 'photos', title: 'Photos', intro: 'The picture area at the top right of the product page.', fields: [
      f('photo', 'Main photo', 'image', { where: 'The big picture on the right, and the picture on its card in lists' }),
      f('caption', 'Photo caption', 'text', { max: 300, where: 'The small text under the big picture' }),
      f('gallery', 'Photo gallery', 'gallery', { where: 'The small pictures under the big one (click to enlarge)' }),
    ],
  },
  {
    id: 'features', title: 'Key features and benefits', intro: 'The two cards with green ticks, under the heading.', fields: [
      f('features', 'Features', 'list', { help: 'One feature per line.', where: 'The "Key features" card, one tick per line' }),
      f('benefits', 'Benefits', 'list', { where: 'The "Key benefits" card, one tick per line' }),
    ],
  },
  {
    id: 'setup', title: 'Configuration, processes and options', intro: 'The cards below the features.', fields: [
      f('config', 'Configuration', 'text', { max: 300, where: 'The "Configuration" card' }),
      f('thermochemical', 'Thermochemical process', 'text', { max: 200, where: 'The "Thermochemical options" card' }),
      f('process', 'Processes', 'list', { where: 'The "Supported processes" row of green labels' }),
      f('options', 'Options', 'list', { where: 'The "Main options" card, one tick per line' }),
    ],
  },
  {
    id: 'extras', title: 'Extra information cards', intro: 'Optional cards. Each one appears on the page only when you fill it in.', fields: [
      f('family_desc', 'About this family', 'textarea', { where: '"About this family" card (shown only when filled)' }),
      f('series_desc', 'Series description', 'textarea', { where: 'The same card, used when "About this family" is empty' }),
      f('typical_applications', 'Typical applications', 'textarea', { where: '"Typical applications" card' }),
      f('typical_use', 'Typical use', 'textarea', { where: 'The same card, called "Typical use", when "Typical applications" is empty' }),
    ],
  },
  {
    id: 'site', title: 'Site requirements and industries', intro: 'Installation needs, and the industries this machine is for.', fields: [
      f('site_reqs_title', 'Site requirements title', 'text', { max: 200, where: 'Heading of the installation card (default: "Installation & site requirements")' }),
      f('site_reqs', 'Site requirements', 'pairs', { labelHead: 'Requirement', valueHead: 'Value', where: 'The installation card, a small table' }),
      f('i', 'Industries', 'tags', { help: 'The industries this product is shown for.', where: 'The "Industries" card, and the industry filter of the home-page finder' }),
    ],
  },
  {
    id: 'tech', title: 'Technical data and model table', intro: 'The technical data table on the right, and the model range table across the bottom.', fields: [
      f('specs', 'Technical specifications', 'pairs', { labelHead: 'Specification', valueHead: 'Value', where: 'The "Technical data" table on the right' }),
      f('models', 'Models table', 'table', { help: 'One row per model. Add or remove columns as needed.', where: 'The "Standard model range" table across the bottom' }),
      f('specs_layout', 'Specification layout', 'select', { options: [['', 'Standard'], ['full', 'Full width']], where: 'Makes the technical data table full width on the home-page product view' }),
    ],
  },
  {
    id: 'finder', title: 'Not on this page: product list and search', intro: 'These do not appear on the product page. They are used by the product list, the home-page finder and Google.', fields: [
      f('seo_title', 'Google page title', 'text', { max: 200, help: 'Optional. Empty = automatic title (product name – brand | Greets Equipment India).', where: 'The browser tab title and the blue title link in Google. Not shown on the page itself' }),
      f('seo_desc', 'Google page description', 'textarea', { max: 400, help: 'Optional. Empty = the one-line summary plus the standard dealer sentence.', where: 'The grey text under the title in Google. Not shown on the page itself' }),
      f('short', 'One-line summary', 'text', { max: 300, help: 'Shown on cards and in the product list.', where: 'The line under the name on product cards, and in the page description Google shows' }),
      f('k', 'Search words', 'textarea', { help: 'Optional. Extra words the product finder on the home page matches, for example "hob, gear cutting, broach". The product is found even when the visitor types a word that is not in its name.', where: 'Only the home-page finder reads this. Visitors never see it' }),
    ],
  },
];

const SECTIONS = { brand: BRAND_SECTIONS, family: FAMILY_SECTIONS, product: PRODUCT_SECTIONS };
const FIELDS = Object.fromEntries(Object.entries(SECTIONS).map(([k, secs]) => [k, secs.flatMap((s) => s.fields)]));

// ---------- helpers ----------
const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
const str = (v) => (typeof v === 'string' ? v.trim() : v == null ? '' : null);

function slugify(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// A path to a picture inside the website folder or the uploads folder.
function checkImagePath(value) {
  if (value === '') return null;
  if (/^https?:\/\//i.test(value)) return imageStore.isOurUrl(value) && value.length <= 500 && !/\s/.test(value) ? null : 'Use a picture from the library or upload one.';
  if (value.length > 300 || !/^[\w\-./ ()%,&+]+$/.test(value) || value.includes('..') || value.startsWith('/')) return 'Not a valid picture path.';
  if (!/\.(png|jpe?g|webp|gif)$/i.test(value)) return 'Use a PNG, JPG, WebP or GIF picture.';
  const base = value.startsWith('uploads/') ? path.join(UPLOAD_DIR, value.slice('uploads/'.length)) : path.join(SITE_DIR, value);
  if (!fs.existsSync(base)) return 'That picture file does not exist.';
  return null;
}

// Each validator returns { value } or { error }.
function makeValidators(ctx) {
  const industries = new Set((ctx.industries || []).map((i) => i.id));

  const text = (def, v) => {
    const s = str(v);
    if (s === null) return { error: 'Must be text.' };
    const max = def.max || (def.kind === 'textarea' ? 10000 : 400);
    if (s.length > max) return { error: `Must be ${max} characters or fewer.` };
    if (def.kind === 'url' && s && !/^https?:\/\/[^\s]+$/i.test(s)) return { error: 'Must start with http:// or https://' };
    return { value: s };
  };

  const validators = {
    text, textarea: text, url: (d, v) => text({ ...d, max: d.max || 500 }, v),
    select: (def, v) => {
      const s = str(v);
      if (s === null || !def.options.some(([val]) => val === s)) return { error: 'Choose one of the options.' };
      return { value: s };
    },
    image: (def, v) => {
      const s = str(v);
      if (s === null) return { error: 'Must be a picture path.' };
      const problem = checkImagePath(s);
      return problem ? { error: problem } : { value: s };
    },
    gallery: (def, v) => {
      if (!Array.isArray(v)) return { error: 'Must be a list.' };
      if (v.length > 40) return { error: 'At most 40 photos.' };
      const out = [];
      for (const row of v) {
        const photo = Array.isArray(row) ? str(row[0]) : isPlainObject(row) ? str(row.photo) : null;
        const alt = Array.isArray(row) ? str(row[1]) : isPlainObject(row) ? str(row.alt) : null;
        if (photo === null || alt === null) return { error: 'Each photo needs a picture and a description.' };
        if (!photo && !alt) continue;
        const problem = checkImagePath(photo);
        if (problem || !photo) return { error: problem || 'Every gallery row needs a picture.' };
        if (alt.length > 400) return { error: 'Photo descriptions must be 400 characters or fewer.' };
        out.push([photo, alt]);
      }
      return { value: out };
    },
    list: (def, v) => {
      const items = typeof v === 'string' ? v.split('\n') : v;
      if (!Array.isArray(items)) return { error: 'Must be a list.' };
      const out = [];
      for (const item of items) {
        const s = str(item);
        if (s === null) return { error: 'Every item must be text.' };
        if (s.length > 1000) return { error: 'Each item must be 1000 characters or fewer.' };
        if (s) out.push(s);
      }
      if (out.length > 100) return { error: 'At most 100 items.' };
      return { value: out };
    },
    pairs: (def, v) => {
      if (!Array.isArray(v)) return { error: 'Must be a list.' };
      const out = [];
      for (const row of v) {
        const label = Array.isArray(row) ? str(row[0]) : isPlainObject(row) ? str(row.label) : null;
        const value = Array.isArray(row) ? str(row[1]) : isPlainObject(row) ? str(row.value) : null;
        if (label === null || value === null) return { error: 'Every row needs a name and a value.' };
        if (!label && !value) continue;
        if (label.length > 300 || value.length > 1500) return { error: 'A row is too long.' };
        out.push([label, value]);
      }
      if (out.length > 100) return { error: 'At most 100 rows.' };
      return { value: out };
    },
    table: (def, v) => {
      if (!Array.isArray(v)) return { error: 'Must be a list of rows.' };
      if (v.length > 200) return { error: 'At most 200 rows.' };
      const out = [];
      for (const row of v) {
        if (!isPlainObject(row)) return { error: 'Every row must be a set of columns.' };
        const clean = {};
        const keys = Object.keys(row);
        if (keys.length > 20) return { error: 'At most 20 columns.' };
        for (const key of keys) {
          if (!/^[A-Za-z][A-Za-z0-9_]{0,29}$/.test(key)) return { error: `Column name "${key}" is not allowed (letters, numbers, underscore).` };
          const cell = str(row[key]);
          if (cell === null || cell.length > 1000) return { error: 'A cell is not valid or too long.' };
          clean[key] = cell;
        }
        if (Object.values(clean).some((x) => x)) out.push(clean);
      }
      return { value: out };
    },
    tags: (def, v) => {
      if (!Array.isArray(v)) return { error: 'Must be a list.' };
      const out = [...new Set(v.map(str))];
      if (out.some((t) => t === null || !industries.has(t))) return { error: 'Unknown industry.' };
      return { value: out };
    },
    cards: (def, v) => {
      if (!Array.isArray(v)) return { error: 'Must be a list.' };
      if (v.length > 50) return { error: 'At most 50 entries.' };
      const out = [];
      for (const row of v) {
        if (!isPlainObject(row)) return { error: 'Invalid entry.' };
        const clean = {};
        for (const sub of def.item) {
          if (!(sub.key in row)) continue;
          const r = validators[sub.kind](sub, row[sub.key]);
          if (r.error) return { error: `${sub.label}: ${r.error}` };
          if (r.value !== '' && !(Array.isArray(r.value) && !r.value.length)) clean[sub.key] = r.value;
        }
        if (!Object.keys(clean).length) continue;
        if (!clean.name) return { error: 'Every entry needs a name.' };
        out.push({ id: slugify(row.id || clean.name) || 'item', ...clean });
      }
      return { value: out };
    },
    json: (def, v) => {
      let value = v;
      if (typeof v === 'string') {
        if (!v.trim()) return { value: null };
        try { value = JSON.parse(v); } catch (e) { return { error: 'This is not valid JSON.' }; }
      }
      if (value === null) return { value: null };
      if (!isPlainObject(value)) return { error: 'Must be an object.' };
      const depthOk = (x, d) => d < 7 && (Array.isArray(x) ? x.every((y) => depthOk(y, d + 1)) : isPlainObject(x) ? Object.values(x).every((y) => depthOk(y, d + 1)) : typeof x === 'string' ? x.length <= 3000 : typeof x === 'number' || typeof x === 'boolean' || x === null);
      if (!depthOk(value, 0) || JSON.stringify(value).length > 40000) return { error: 'Too large or too deeply nested.' };
      return { value };
    },
  };
  return validators;
}

const isEmpty = (v) => v === '' || v == null || (Array.isArray(v) && v.length === 0);

// Applies the submitted `input` over `existing` data. Returns { data, errors }.
function cleanData(entity, input, existing, ctx) {
  const defs = FIELDS[entity];
  const validators = makeValidators(ctx);
  const src = isPlainObject(input) ? input : {};
  const data = { ...(existing || {}) };
  const errors = {};
  for (const def of defs) {
    if (!(def.key in src)) continue;
    const r = validators[def.kind](def, src[def.key]);
    if (r.error) { errors[def.key] = r.error; continue; }
    if (isEmpty(r.value)) delete data[def.key];
    else data[def.key] = r.value;
  }
  for (const def of defs) {
    if (def.required && isEmpty(data[def.key])) errors[def.key] = `${def.label} is required.`;
  }
  return { data, errors };
}

// What the browser needs to draw the forms.
function publicSchema() {
  return { sections: SECTIONS };
}

module.exports = { SECTIONS, FIELDS, SLUG_PATTERN, slugify, cleanData, publicSchema, checkImagePath, UPLOAD_DIR };
