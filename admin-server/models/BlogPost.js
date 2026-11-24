const mongoose = require('mongoose');

// One blog article. The admin panel's "Blog" section creates, edits and deletes these;
// services/blogPublish.js turns the published ones into website pages.
const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true }, // the address: /<slug>/
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },

    title: { type: String, required: true, trim: true },        // the big heading (h1) and the card title
    seoTitle: { type: String, trim: true, default: '' },        // the title Google shows (empty = the heading)
    crumbTitle: { type: String, trim: true, default: '' },      // short name in the breadcrumb (empty = the heading)
    description: { type: String, trim: true, default: '' },     // the Google description
    excerpt: { type: String, trim: true, default: '' },         // the short text on the blog list card
    keywords: { type: [String], default: [] },

    author: { type: String, trim: true, default: 'Greets' },    // shown under the title
    authorName: { type: String, trim: true, default: 'Pramod Kanse' }, // for Google (structured data)
    authorTitle: { type: String, trim: true, default: 'Director' },
    date: { type: String, default: '' },                        // published on, YYYY-MM-DD
    modified: { type: String, default: '' },                    // last changed, YYYY-MM-DD
    readMinutes: { type: Number, default: 5 },

    image: { type: String, trim: true, default: '' },           // main picture: site path, uploads/<file> or https address
    imageAlt: { type: String, trim: true, default: '' },
    ogImage: { type: String, trim: true, default: '' },         // picture for link previews (empty = the main picture)

    bodyHtml: { type: String, default: '' },                    // the article text (formatted)
    faq: { type: [{ _id: false, q: String, a: String }], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
