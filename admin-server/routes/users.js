// Admin accounts: list, add, reset someone's password, remove. Every admin is equal.
const express = require('express');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const { requireAuthApi } = require('../middleware/auth');
const { checkPassword } = require('../services/passwords');
const requireAccountManagement = require('../middleware/accountFeature');

const router = express.Router();
router.use(requireAccountManagement);
router.use(requireAuthApi);

const USERNAME = /^[a-z0-9._-]{3,30}$/;
const shape = (a, meId) => ({ id: a.id, username: a.username, createdAt: a.createdAt, lastLoginAt: a.lastLoginAt || null, you: a.id === meId });

router.get('/', async (req, res, next) => {
  try {
    const admins = await Admin.find().sort({ createdAt: 1 });
    res.json({ users: admins.map((a) => shape(a, req.admin.id)) });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const username = String((req.body && req.body.username) || '').trim().toLowerCase();
    const password = req.body && req.body.password;
    if (!USERNAME.test(username)) return res.status(400).json({ message: 'Username must be 3-30 characters: letters, numbers, . _ -', errors: { username: 'Use 3-30 letters, numbers, . _ -' } });
    const problem = checkPassword(password, username);
    if (problem) return res.status(400).json({ message: problem, errors: { password: problem } });
    if (await Admin.exists({ username })) return res.status(409).json({ message: 'That username is already used.', errors: { username: 'Already used.' } });
    const admin = await Admin.create({ username, passwordHash: await Admin.hashPassword(password) });
    res.status(201).json({ user: shape(admin, req.admin.id) });
  } catch (err) { next(err); }
});

function findTarget(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) { res.status(404).json({ message: 'Admin not found.' }); return null; }
  return Admin.findById(req.params.id).then((a) => { if (!a) res.status(404).json({ message: 'Admin not found.' }); return a; });
}

// Reset another admin's password (your own is changed under "My account").
router.put('/:id/password', async (req, res, next) => {
  try {
    const target = await findTarget(req, res);
    if (!target) return;
    if (target.id === req.admin.id) return res.status(400).json({ message: 'Change your own password under "My account".' });
    const password = req.body && req.body.password;
    const problem = checkPassword(password, target.username);
    if (problem) return res.status(400).json({ message: problem, errors: { password: problem } });
    target.passwordHash = await Admin.hashPassword(password);
    target.passwordChangedAt = new Date(); // signs that admin out everywhere
    await target.save();
    res.json({ ok: true });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const target = await findTarget(req, res);
    if (!target) return;
    if (target.id === req.admin.id) return res.status(400).json({ message: 'You cannot remove your own account.' });
    if ((await Admin.countDocuments()) <= 1) return res.status(400).json({ message: 'The last admin cannot be removed.' });
    await target.deleteOne();
    res.json({ deleted: true });
  } catch (err) { next(err); }
});

module.exports = router;
