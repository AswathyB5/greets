const fs = require('fs');
const path = require('path');
const express = require('express');
const CatalogBrand = require('../models/CatalogBrand');
const CatalogFamily = require('../models/CatalogFamily');
const CatalogProduct = require('../models/CatalogProduct');
const CatalogMeta = require('../models/CatalogMeta');
const UploadedImage = require('../models/UploadedImage');
const { requireAuthApi } = require('../middleware/auth');
const { SITE_DIR } = require('../config/site');
const { cleanData, publicSchema, slugify, SLUG_PATTERN, UPLOAD_DIR } = require('../services/catalogSchema');
const { requestPublish, isPublishing } = require('../services/publishCatalog');
const { autoPublish } = require('../config/features');

const router = express.Router();
router.use(requireAuthApi);

const STATUSES = ['published', 'draft'];
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ---------- small helpers ----------
async function getMeta() {
  return (await CatalogMeta.findOne({ key: 'state' })) || (await CatalogMeta.create({ key: 'state' }));
}

// Remembers that the database now differs from the live website.
async function markChanged() {
  await CatalogMeta.findOneAndUpdate({ key: 'state' }, { key: 'state', dirty: true, changedAt: new Date() }, { upsert: true });
  // by default the change goes to the website by itself; the answer comes back through GET /state
  if (autoPublish) requestPublish().catch(() => {});
}

async function context() {
  const meta = await getMeta();
  return { industries: meta.industries || [] };
}

function fail(res, status, message, errors) {
  return res.status(status).json({ message, errors: errors || {} });
}

async function requireBrand(req, res) {
  const brand = await CatalogBrand.findOne({ brandId: req.params.brand });
  if (!brand) fail(res, 404, 'Brand not found.');
  return brand;
}

// A family and a product of one brand may not share an id (they become folder names).
async function idTaken(brandId, id) {
  const [family, product] = await Promise.all([
    CatalogFamily.exists({ brandId, familyId: id }),
    CatalogProduct.exists({ brandId, productId: id }),
  ]);
  return !!(family || product);
}

async function freeId(brandId, wanted, fallback) {
  const base = slugify(wanted).slice(0, 50) || fallback;
  let id = base;
  for (let n = 2; await idTaken(brandId, id); n++) id = `${base}-${n}`;
  return id;
}

function checkStatus(status) {
  return status === undefined || STATUSES.includes(status);
}

const summaryOfProduct = (p) => ({
  id: p.productId, familyId: p.familyId, name: p.data.name || p.productId, tag: p.data.tag || '', short: p.data.short || '',
  photo: p.data.photo || '', status: p.status, order: p.order, updatedAt: p.updatedAt,
});
const summaryOfFamily = (f) => ({
  id: f.familyId, name: f.data.name || f.familyId, sub: f.data.sub || '', photo: f.data.photo || '', status: f.status, order: f.order,
});

// ---------- schema, state, overview ----------
router.get('/schema', wrap(async (req, res) => {
  const ctx = await context();
  res.json({ ...publicSchema(), industries: ctx.industries.map((i) => ({ id: i.id, name: i.n })) });
}));

router.get('/state', wrap(async (req, res) => {
  const meta = await getMeta();
  // Changes that are waiting but nobody is publishing them (saved before automatic publishing existed, or the server
  // restarted mid-way): publish them now instead of showing "publishing..." for ever. A failed publish is not retried
  // on every look; it waits for the "Try again" button or the next change.
  if (autoPublish && meta.dirty && !meta.lastError && !isPublishing()) requestPublish().catch(() => {});
  res.json({ dirty: meta.dirty, changedAt: meta.changedAt, publishedAt: meta.publishedAt, lastPublish: meta.lastPublish || null, auto: autoPublish, publishing: isPublishing() || (autoPublish && meta.dirty && !meta.lastError), lastError: meta.lastError || null });
}));

router.get('/tree', wrap(async (req, res) => {
  const [brands, families, products, meta] = await Promise.all([
    CatalogBrand.find().sort({ order: 1 }).lean(),
    CatalogFamily.find().sort({ order: 1 }).lean(),
    CatalogProduct.find().sort({ order: 1 }).lean(),
    getMeta(),
  ]);
  res.json({
    state: { dirty: meta.dirty, changedAt: meta.changedAt, publishedAt: meta.publishedAt },
    brands: brands.map((b) => ({
      id: b.brandId, name: b.data.name || b.brandId, full: b.data.full || '', country: b.data.country || '', photo: b.data.photo || '',
      families: families.filter((f) => f.brandId === b.brandId).map((f) => ({
        ...summaryOfFamily(f),
        productCount: products.filter((p) => p.brandId === b.brandId && p.familyId === f.familyId).length,
        products: products.filter((p) => p.brandId === b.brandId && p.familyId === f.familyId).map((p) => ({ id: p.productId, name: p.data.name || p.productId, status: p.status })), // for the sidebar
      })),
      productCount: products.filter((p) => p.brandId === b.brandId).length,
      publishedCount: products.filter((p) => p.brandId === b.brandId && p.status === 'published').length,
    })),
  });
}));

// ---------- industries (the 12 sectors: names in the product finder, product tags and the industry menus) ----------
router.get('/industries', wrap(async (req, res) => {
  const ctx = await context();
  res.json({ items: ctx.industries.map((i) => ({ id: i.id, name: i.n, desc: i.d || '' })) });
}));

router.put('/industries', wrap(async (req, res) => {
  const meta = await getMeta();
  const current = meta.industries || [];
  const items = req.body && Array.isArray(req.body.items) ? req.body.items : null;
  if (!items || items.length !== current.length) return fail(res, 400, 'The list of industries is not complete.');
  const errors = {};
  const next = current.map((old) => {
    const sent = items.find((x) => x && x.id === old.id);
    if (!sent) { errors[old.id] = 'Missing.'; return old; }
    const name = typeof sent.name === 'string' ? sent.name.trim() : '';
    const desc = typeof sent.desc === 'string' ? sent.desc.trim() : '';
    if (!name) errors[old.id] = 'The name cannot be empty.';
    else if (name.length > 120) errors[old.id] = 'The name must be 120 characters or fewer.';
    else if (desc.length > 300) errors[old.id] = 'The description must be 300 characters or fewer.';
    return { id: old.id, n: name || old.n, d: desc };
  });
  if (Object.keys(errors).length) return fail(res, 400, 'Please check the highlighted rows.', errors);
  meta.industries = next;
  meta.markModified('industries');
  await meta.save();
  await markChanged();
  res.json({ items: next.map((i) => ({ id: i.id, name: i.n, desc: i.d })) });
}));

// ---------- picture library ----------
const IMAGE_FOLDERS = ['assets/catalog', 'BMI-machine-photos', 'Novatec-machine-photos', 'Huasheng-machine-photos'];
router.get('/images', wrap(async (req, res) => {
  const out = [];
  const add = (dir, rel) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && /\.(png|jpe?g|webp|gif)$/i.test(entry.name)) out.push({ path: `${rel}/${entry.name}`, name: entry.name, folder: rel });
      if (out.length > 800) return;
    }
  };
  for (const rel of IMAGE_FOLDERS) add(path.join(SITE_DIR, rel), rel);
  add(path.join(SITE_DIR, 'assets', 'catalog', 'uploads'), 'assets/catalog/uploads');
  add(UPLOAD_DIR, 'uploads');
  // pictures kept in Cloudinary (newest first)
  const stored = await UploadedImage.find({ value: /^https:\/\// }).sort({ createdAt: -1 }).limit(200).lean();
  for (const u of stored) out.unshift({ path: u.value, name: u.name, folder: 'Cloudinary' });
  res.json({ images: out });
}));

// ---------- brands ----------
router.get('/brands/:brand', wrap(async (req, res) => {
  const brand = await requireBrand(req, res);
  if (!brand) return;
  res.json({ brand: { id: brand.brandId, data: brand.data } });
}));

router.put('/brands/:brand', wrap(async (req, res) => {
  const brand = await requireBrand(req, res);
  if (!brand) return;
  const { data, errors } = cleanData('brand', req.body && req.body.data, brand.data, await context());
  if (Object.keys(errors).length) return fail(res, 400, 'Please check the highlighted fields.', errors);
  brand.data = data;
  brand.markModified('data');
  await brand.save();
  await markChanged();
  res.json({ brand: { id: brand.brandId, data: brand.data } });
}));

// ---------- families ----------
router.post('/brands/:brand/families', wrap(async (req, res) => {
  const brand = await requireBrand(req, res);
  if (!brand) return;
  const body = req.body || {};
  if (!checkStatus(body.status)) return fail(res, 400, 'Status must be published or draft.');
  const { data, errors } = cleanData('family', body.data, {}, await context());
  if (Object.keys(errors).length) return fail(res, 400, 'Please check the highlighted fields.', errors);

  let id;
  if (body.id) {
    id = String(body.id).trim().toLowerCase();
    if (!SLUG_PATTERN.test(id) || id.length > 60) return fail(res, 400, 'Please check the highlighted fields.', { id: 'Use lowercase letters, numbers and single hyphens.' });
    if (await idTaken(brand.brandId, id)) return fail(res, 409, 'Please check the highlighted fields.', { id: 'That web address name is already used in this brand.' });
  } else {
    id = await freeId(brand.brandId, data.name, 'family');
  }
  const last = await CatalogFamily.findOne({ brandId: brand.brandId }).sort({ order: -1 }).lean();
  const family = await CatalogFamily.create({ brandId: brand.brandId, familyId: id, order: last ? last.order + 1 : 0, status: body.status || 'published', data });
  await markChanged();
  res.status(201).json({ family: { id: family.familyId, status: family.status, data: family.data } });
}));

router.get('/brands/:brand/families/:family', wrap(async (req, res) => {
  const { brand, family } = req.params;
  const doc = await CatalogFamily.findOne({ brandId: brand, familyId: family });
  if (!doc) return fail(res, 404, 'Family not found.');
  const products = await CatalogProduct.find({ brandId: brand, familyId: family }).sort({ order: 1 }).lean();
  res.json({ family: { id: doc.familyId, status: doc.status, data: doc.data }, products: products.map(summaryOfProduct) });
}));

router.put('/brands/:brand/families/:family', wrap(async (req, res) => {
  const doc = await CatalogFamily.findOne({ brandId: req.params.brand, familyId: req.params.family });
  if (!doc) return fail(res, 404, 'Family not found.');
  const body = req.body || {};
  if (!checkStatus(body.status)) return fail(res, 400, 'Status must be published or draft.');
  if (body.data !== undefined) {
    const { data, errors } = cleanData('family', body.data, doc.data, await context());
    if (Object.keys(errors).length) return fail(res, 400, 'Please check the highlighted fields.', errors);
    doc.data = data;
    doc.markModified('data');
  }
  if (body.status) doc.status = body.status;
  await doc.save();
  await markChanged();
  res.json({ family: { id: doc.familyId, status: doc.status, data: doc.data } });
}));

router.delete('/brands/:brand/families/:family', wrap(async (req, res) => {
  const { brand, family } = req.params;
  const doc = await CatalogFamily.findOne({ brandId: brand, familyId: family });
  if (!doc) return fail(res, 404, 'Family not found.');
  const count = await CatalogProduct.countDocuments({ brandId: brand, familyId: family });
  if (count && req.query.deleteProducts !== '1') return fail(res, 409, `This family still has ${count} product${count === 1 ? '' : 's'}. Move them to another family first, or delete them with the family.`);
  await CatalogProduct.deleteMany({ brandId: brand, familyId: family });
  await doc.deleteOne();
  await markChanged();
  res.json({ deleted: true, productsDeleted: count });
}));

async function saveOrder(Model, filter, idField, ids) {
  if (!Array.isArray(ids) || ids.some((i) => typeof i !== 'string')) return false;
  const docs = await Model.find(filter).select(idField).lean();
  const known = new Set(docs.map((d) => d[idField]));
  if (ids.length !== known.size || ids.some((i) => !known.has(i)) || new Set(ids).size !== ids.length) return false;
  await Model.bulkWrite(ids.map((id, order) => ({ updateOne: { filter: { ...filter, [idField]: id }, update: { $set: { order } } } })));
  return true;
}

router.put('/brands/:brand/families-order', wrap(async (req, res) => {
  const ok = await saveOrder(CatalogFamily, { brandId: req.params.brand }, 'familyId', req.body && req.body.ids);
  if (!ok) return fail(res, 400, 'The list of families is not complete.');
  await markChanged();
  res.json({ ok: true });
}));

router.put('/brands/:brand/families/:family/products-order', wrap(async (req, res) => {
  const ok = await saveOrder(CatalogProduct, { brandId: req.params.brand, familyId: req.params.family }, 'productId', req.body && req.body.ids);
  if (!ok) return fail(res, 400, 'The list of products is not complete.');
  await markChanged();
  res.json({ ok: true });
}));

// ---------- products ----------
router.post('/brands/:brand/products', wrap(async (req, res) => {
  const brand = await requireBrand(req, res);
  if (!brand) return;
  const body = req.body || {};
  if (!checkStatus(body.status)) return fail(res, 400, 'Status must be published or draft.');
  const family = await CatalogFamily.findOne({ brandId: brand.brandId, familyId: String(body.familyId || '') });
  if (!family) return fail(res, 400, 'Please check the highlighted fields.', { familyId: 'Choose a family.' });
  const { data, errors } = cleanData('product', body.data, {}, await context());
  if (Object.keys(errors).length) return fail(res, 400, 'Please check the highlighted fields.', errors);

  let id;
  if (body.id) {
    id = String(body.id).trim().toLowerCase();
    if (!SLUG_PATTERN.test(id) || id.length > 60) return fail(res, 400, 'Please check the highlighted fields.', { id: 'Use lowercase letters, numbers and single hyphens.' });
    if (await idTaken(brand.brandId, id)) return fail(res, 409, 'Please check the highlighted fields.', { id: 'That web address name is already used in this brand.' });
  } else {
    id = await freeId(brand.brandId, data.name, 'product');
  }
  const last = await CatalogProduct.findOne({ brandId: brand.brandId, familyId: family.familyId }).sort({ order: -1 }).lean();
  const product = await CatalogProduct.create({
    brandId: brand.brandId, familyId: family.familyId, productId: id, order: last ? last.order + 1 : 0, status: body.status || 'published', data,
  });
  await markChanged();
  res.status(201).json({ product: { id: product.productId, familyId: product.familyId, status: product.status, data: product.data } });
}));

router.get('/brands/:brand/products/:product', wrap(async (req, res) => {
  const doc = await CatalogProduct.findOne({ brandId: req.params.brand, productId: req.params.product });
  if (!doc) return fail(res, 404, 'Product not found.');
  const families = await CatalogFamily.find({ brandId: req.params.brand }).sort({ order: 1 }).lean();
  res.json({
    product: { id: doc.productId, familyId: doc.familyId, status: doc.status, data: doc.data },
    families: families.map(summaryOfFamily),
  });
}));

router.put('/brands/:brand/products/:product', wrap(async (req, res) => {
  const doc = await CatalogProduct.findOne({ brandId: req.params.brand, productId: req.params.product });
  if (!doc) return fail(res, 404, 'Product not found.');
  const body = req.body || {};
  if (!checkStatus(body.status)) return fail(res, 400, 'Status must be published or draft.');
  if (body.familyId && body.familyId !== doc.familyId) {
    const target = await CatalogFamily.findOne({ brandId: doc.brandId, familyId: String(body.familyId) });
    if (!target) return fail(res, 400, 'Please check the highlighted fields.', { familyId: 'Choose a family.' });
    const last = await CatalogProduct.findOne({ brandId: doc.brandId, familyId: target.familyId }).sort({ order: -1 }).lean();
    doc.familyId = target.familyId;
    doc.order = last ? last.order + 1 : 0;
  }
  if (body.data !== undefined) {
    const { data, errors } = cleanData('product', body.data, doc.data, await context());
    if (Object.keys(errors).length) return fail(res, 400, 'Please check the highlighted fields.', errors);
    doc.data = data;
    doc.markModified('data');
  }
  if (body.status) doc.status = body.status;
  await doc.save();
  await markChanged();
  res.json({ product: { id: doc.productId, familyId: doc.familyId, status: doc.status, data: doc.data } });
}));

router.delete('/brands/:brand/products/:product', wrap(async (req, res) => {
  const doc = await CatalogProduct.findOne({ brandId: req.params.brand, productId: req.params.product });
  if (!doc) return fail(res, 404, 'Product not found.');
  await doc.deleteOne();
  await markChanged();
  res.json({ deleted: true });
}));

router.post('/brands/:brand/products/:product/duplicate', wrap(async (req, res) => {
  const doc = await CatalogProduct.findOne({ brandId: req.params.brand, productId: req.params.product });
  if (!doc) return fail(res, 404, 'Product not found.');
  const id = await freeId(doc.brandId, `${doc.productId}-copy`, 'product');
  const last = await CatalogProduct.findOne({ brandId: doc.brandId, familyId: doc.familyId }).sort({ order: -1 }).lean();
  const data = JSON.parse(JSON.stringify(doc.data));
  data.name = `${data.name || doc.productId} (copy)`;
  const copy = await CatalogProduct.create({ brandId: doc.brandId, familyId: doc.familyId, productId: id, order: last.order + 1, status: 'draft', data });
  await markChanged();
  res.status(201).json({ product: { id: copy.productId, familyId: copy.familyId, status: copy.status } });
}));

// ---------- publish ----------
router.post('/publish', wrap(async (req, res) => {
  try {
    const summary = await requestPublish();
    res.json({ summary });
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
}));

module.exports = router;
