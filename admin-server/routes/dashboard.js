const express = require('express');
const CatalogProduct = require('../models/CatalogProduct');
const Enquiry = require('../models/Enquiry');
const { requireAuthApi } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuthApi);

// GET /api/dashboard — the numbers and the latest enquiries for the dashboard cards.
router.get('/', async (req, res, next) => {
  try {
    const [totalProducts, publishedProducts, newEnquiries, latestEnquiries] = await Promise.all([
      CatalogProduct.countDocuments(),
      CatalogProduct.countDocuments({ status: 'published' }),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).select('name email company product status createdAt').lean(),
    ]);

    res.json({ totalProducts, publishedProducts, newEnquiries, latestEnquiries });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
