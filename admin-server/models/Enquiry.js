const mongoose = require('mongoose');

// Messages sent from the website's contact form (saved by POST /api/public/enquiries).
const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    process: { type: String, trim: true, default: '' },       // what the visitor wants (dropdown choice)
    product: { type: String, trim: true, default: '' },       // page / product they asked from, else the process
    message: { type: String, trim: true, default: '' },       // "parts, material and volumes"
    category: { type: String, trim: true, default: '' },
    brand: { type: String, trim: true, default: '' },
    sourcePage: { type: String, trim: true, default: '' },    // which website page the form was on
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
