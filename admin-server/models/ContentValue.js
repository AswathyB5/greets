const mongoose = require('mongoose');

// One document per edited field. A field with no document here simply shows
// the original text that is already written in the HTML page.
const contentValueSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    page: { type: String, required: true, index: true }, // "global", "index", "contact", "privacy"
    value: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContentValue', contentValueSchema);
