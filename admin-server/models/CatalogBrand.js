const mongoose = require('mongoose');

// One of the three brands (bmi, novatec, huasheng). `data` keeps everything the
// website shows for the brand: name, intro, photo, gallery, ... (see services/catalogSchema.js).
const schema = new mongoose.Schema(
  {
    brandId: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('CatalogBrand', schema);
