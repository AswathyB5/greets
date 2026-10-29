// Copies the catalogue that is written inside the website's products.js
// (brands -> families -> products, plus the industries list) into the database,
// so it can be edited from the admin panel.
//
// Run:  npm run import-catalog            (does nothing if the catalogue is already imported)
//       npm run import-catalog -- --force (replaces what is in the database)

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const CatalogBrand = require('../models/CatalogBrand');
const CatalogFamily = require('../models/CatalogFamily');
const CatalogProduct = require('../models/CatalogProduct');
const CatalogMeta = require('../models/CatalogMeta');
const { readSource, readConst } = require('../services/productsJs');

async function importCatalog({ force = false } = {}) {
  if (!force && (await CatalogBrand.countDocuments())) return { skipped: true };

  const code = readSource();
  const catalog = readConst(code, 'CATALOG');
  const photos = readConst(code, 'PHOTOS');
  const industries = readConst(code, 'IND');
  const logoPaths = readConst(code, 'LOGO_PATHS');
  const toPath = (id) => photos[id] || id; // a photo id becomes the picture path
  const photoFields = (obj) => {
    const out = { ...obj };
    if (out.photo) out.photo = toPath(out.photo);
    if (out.gallery) out.gallery = out.gallery.map(([id, alt]) => [toPath(id), alt]);
    return out;
  };

  await Promise.all([CatalogBrand.deleteMany({}), CatalogFamily.deleteMany({}), CatalogProduct.deleteMany({})]);
  const counts = { brands: 0, families: 0, products: 0 };
  for (const [bi, brand] of catalog.entries()) {
    const { id, cats, ...brandData } = brand;
    await CatalogBrand.create({ brandId: id, order: bi, data: { ...photoFields(brandData), ...(logoPaths[id] ? { logo: logoPaths[id] } : {}) } });
    counts.brands++;
    for (const [ci, cat] of cats.entries()) {
      const { id: familyId, machines, ...familyData } = cat;
      await CatalogFamily.create({ brandId: id, familyId, order: ci, status: 'published', data: photoFields(familyData) });
      counts.families++;
      for (const [mi, machine] of machines.entries()) {
        const { id: productId, ...productData } = machine;
        await CatalogProduct.create({ brandId: id, familyId, productId, order: mi, status: 'published', data: photoFields(productData) });
        counts.products++;
      }
    }
  }
  await CatalogMeta.findOneAndUpdate(
    { key: 'state' },
    { key: 'state', dirty: false, industries, published: null, $unset: { lastPublish: 1 } },
    { upsert: true }
  );
  return counts;
}

module.exports = importCatalog;

if (require.main === module) {
  (async () => {
    await connectDB();
    const result = await importCatalog({ force: process.argv.includes('--force') });
    console.log(result.skipped ? 'The catalogue is already in the database (use --force to import again).' : `Imported ${result.brands} brands, ${result.families} families, ${result.products} products.`);
    await mongoose.disconnect();
  })().catch((err) => { console.error(err.message); process.exit(1); });
}
