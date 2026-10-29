const express = require('express');
const ActivityLog = require('../models/ActivityLog');
const { requireAuthApi } = require('../middleware/auth');
const { activityPage } = require('../config/features');

const router = express.Router();
// switched off: the page and its data are not reachable
router.use((req, res, next) => (activityPage ? next() : res.status(404).json({ message: 'This feature is turned off.' })));
router.use(requireAuthApi);

// GET /api/activity?page=&kind=login|change
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = 30;
    const filter = {};
    if (req.query.kind === 'login' || req.query.kind === 'change') filter.kind = req.query.kind;
    const [items, total] = await Promise.all([
      ActivityLog.find(filter).sort({ at: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
      ActivityLog.countDocuments(filter),
    ]);
    res.json({ items, total, page, pageSize });
  } catch (err) { next(err); }
});

module.exports = router;
