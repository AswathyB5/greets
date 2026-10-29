const mongoose = require('mongoose');

// A product family (the website calls it a "category"), e.g. "Gas quenching furnaces".
const schema = new mongoose.Schema(
  {
    brandId: { type: String, required: true },
    familyId: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

schema.index({ brandId: 1, familyId: 1 }, { unique: true });
schema.index({ brandId: 1, order: 1 });

module.exports = mongoose.model('CatalogFamily', schema);
