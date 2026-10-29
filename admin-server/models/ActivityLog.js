const mongoose = require('mongoose');

// Who did what in the admin panel (every change, plus logins). Kept for 180 days.
const schema = new mongoose.Schema(
  {
    username: { type: String, default: '' },
    action: { type: String, required: true },   // a sentence, e.g. "Published the products to the website"
    kind: { type: String, default: 'change' },  // login | change
    at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

schema.index({ at: -1 });
schema.index({ at: 1 }, { expireAfterSeconds: 180 * 24 * 60 * 60 });

module.exports = mongoose.model('ActivityLog', schema);
