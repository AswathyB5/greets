const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const Enquiry = require('../models/Enquiry');
const { requireAuthApi } = require('../middleware/auth');
const mailer = require('../services/mailer');

const STATUSES = ['new', 'read', 'replied'];
const MAX_PAGE_SIZE = 50;

const isText = (v) => typeof v === 'string';
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ---------- Public: the website's contact form posts here ----------
const publicRouter = express.Router();

// 10 enquiries per hour per visitor address: stops someone flooding the inbox.
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many enquiries from this address. Please try again later.' },
});

// Cuts a form value to text of at most `max` characters ('' when missing).
function field(body, key, max) {
  const value = isText(body[key]) ? body[key].trim() : '';
  return value.slice(0, max);
}

publicRouter.post('/enquiries', submitLimiter, async (req, res, next) => {
  try {
    const body = req.body && typeof req.body === 'object' ? req.body : {};

    // Honeypot: real visitors never fill the hidden "website" box. Pretend it worked.
    if (isText(body.website) && body.website.trim()) return res.status(201).json({ ok: true });

    const name = field(body, 'name', 150);
    const email = field(body, 'email', 200).toLowerCase();
    const phone = field(body, 'phone', 40);
    const errors = {};
    if (!name) errors.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email is required.';
    if (phone && !/^[0-9+()\-.\s]{5,40}$/.test(phone)) errors.phone = 'Phone number looks invalid.';
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the form.', errors });

    const process = field(body, 'process', 200);
    const sourcePage = field(body, 'enquiry_page', 200) || field(body, 'page_source', 200);
    const saved = await Enquiry.create({
      name,
      email,
      phone,
      company: field(body, 'company', 150),
      city: field(body, 'city', 100),
      process,
      product: sourcePage || process,
      message: field(body, 'details', 5000),
      category: field(body, 'enquiry_category', 200),
      brand: field(body, 'enquiry_brand', 100),
      sourcePage,
    });
    mailer.sendEnquiryAlert(saved); // not awaited: the visitor never waits for (or sees a failure of) the email
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// ---------- Admin (login required) ----------
const adminRouter = express.Router();
adminRouter.use(requireAuthApi);

function filterOf(query) {
  const filter = {};
  if (STATUSES.includes(query.status)) filter.status = query.status;
  const q = isText(query.q) ? query.q.trim().slice(0, 100) : '';
  if (q) {
    const re = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ name: re }, { email: re }, { company: re }, { phone: re }, { product: re }, { message: re }];
  }
  return filter;
}

// A cell for Excel / Google Sheets. A value starting with = + - @ would be run as a formula, so it gets a ' in front.
function csvCell(value) {
  let text = value == null ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g, '""') + '"';
}

// GET /api/enquiries/export.csv?status=&q=   (the same filters as the list, up to 10,000 rows)
adminRouter.get('/export.csv', async (req, res, next) => {
  try {
    const rows = await Enquiry.find(filterOf(req.query)).sort({ createdAt: -1 }).limit(10000).lean();
    const head = ['Date', 'Status', 'Name', 'Company', 'Email', 'Phone', 'City', 'Interested in', 'From page', 'Brand', 'Category', 'Message'];
    const lines = [head.map(csvCell).join(',')].concat(rows.map((r) => [
      new Date(r.createdAt).toISOString().replace('T', ' ').slice(0, 19), r.status, r.name, r.company, r.email, r.phone, r.city, r.process, r.sourcePage || r.product, r.brand, r.category, r.message,
    ].map(csvCell).join(',')));
    res.set('Content-Type', 'text/csv; charset=utf-8');
    res.set('Content-Disposition', `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send('﻿' + lines.join('\r\n') + '\r\n'); // the BOM makes Excel read accents correctly
  } catch (err) {
    next(err);
  }
});

// Email alerts: are they set up, and send a test.
adminRouter.get('/mail-status', (req, res) => {
  const s = mailer.status();
  res.json({ enabled: s.enabled, to: s.to });
});
adminRouter.post('/test-mail', async (req, res, next) => {
  try {
    await mailer.sendTest();
    res.json({ ok: true, to: mailer.status().to });
  } catch (err) {
    next(err);
  }
});

// GET /api/enquiries?status=&q=&page=&pageSize=
adminRouter.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(req.query.pageSize, 10) || 20));
    const filter = filterOf(req.query);
    const [items, total, counts] = await Promise.all([
      Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
      Enquiry.countDocuments(filter),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);
    const byStatus = Object.fromEntries(counts.map((c) => [c._id, c.count]));
    res.json({ items, total, page, pageSize, counts: { new: 0, read: 0, replied: 0, ...byStatus } });
  } catch (err) {
    next(err);
  }
});

function validId(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404).json({ message: 'Enquiry not found.' });
    return false;
  }
  return true;
}

// GET /api/enquiries/:id  (opening a new enquiry marks it as read)
adminRouter.get('/:id', async (req, res, next) => {
  try {
    if (!validId(req, res)) return;
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    if (enquiry.status === 'new') {
      enquiry.status = 'read';
      await enquiry.save();
    }
    res.json(enquiry);
  } catch (err) {
    next(err);
  }
});

// PUT /api/enquiries/:id  body: { status }
adminRouter.put('/:id', async (req, res, next) => {
  try {
    if (!validId(req, res)) return;
    const status = req.body && req.body.status;
    if (!STATUSES.includes(status)) return res.status(400).json({ message: `Status must be one of: ${STATUSES.join(', ')}.` });
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json(enquiry);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/enquiries/:id
adminRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!validId(req, res)) return;
    const result = await Enquiry.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
});

module.exports = { publicRouter, adminRouter };
