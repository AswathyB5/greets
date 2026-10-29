const mongoose = require('mongoose');

// A single document that remembers the publishing state and a few lists.
const schema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'state' },
    dirty: { type: Boolean, default: false },          // changes not yet published
    changedAt: { type: Date },
    publishedAt: { type: Date },
    lastPublish: { type: mongoose.Schema.Types.Mixed },  // summary of the last publish
    lastError: { type: mongoose.Schema.Types.Mixed },    // { message, at } when the last publish failed; cleared by the next good one
    industries: { type: [mongoose.Schema.Types.Mixed], default: [] }, // [{id, n, d}] from the site
    published: { type: mongoose.Schema.Types.Mixed },    // what the live site was built from (for cleaning up renamed/removed pages)
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('CatalogMeta', schema);
