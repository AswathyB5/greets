const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const Admin = require('../models/Admin');
const { requireAuthApi } = require('../middleware/auth');
const { log } = require('../services/activity');
const { checkPassword } = require('../services/passwords');
const requireAccountManagement = require('../middleware/accountFeature');
const { accountManagement, activityPage } = require('../config/features');
const {
  JWT_SECRET,
  COOKIE_NAME,
  TOKEN_EXPIRES_IN,
  cookieOptions,
  cookieMaxAge,
} = require('../config/auth');

const router = express.Router();

// Slows down password guessing: 10 attempts per 15 minutes per IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
});

// A real bcrypt hash of a random string. Used so a login for an unknown username
// takes as long as one for a known username (prevents guessing which usernames exist).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username: username.trim().toLowerCase() });
    const valid = admin
      ? await admin.verifyPassword(password)
      : await bcrypt.compare(password, DUMMY_HASH).then(() => false);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    admin.lastLoginAt = new Date();
    await admin.save();
    const token = jwt.sign({ sub: admin.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: cookieMaxAge });
    log(admin.username, 'Logged in', 'login');
    res.json({ username: admin.username });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);
  res.json({ message: 'Logged out' });
});

router.get('/me', requireAuthApi, (req, res) => {
  res.json({ username: req.admin.username, siteUrl: (process.env.SITE_PUBLIC_URL || '').trim(), accountManagement, activityPage });
});

// Slows down guessing of the current password through this screen too.
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again later.' },
});

// PUT /api/auth/password  body: { current, next }
// Needs the current password, then signs out every other login of this account.
router.put('/password', requireAccountManagement, requireAuthApi, passwordLimiter, async (req, res, next) => {
  try {
    const { current, next: newPassword } = req.body || {};
    if (typeof current !== 'string' || typeof newPassword !== 'string') return res.status(400).json({ message: 'Enter your current and your new password.' });
    if (!(await req.admin.verifyPassword(current))) return res.status(400).json({ message: 'Your current password is not correct.', errors: { current: 'Not correct.' } });
    const problem = checkPassword(newPassword, req.admin.username);
    if (problem) return res.status(400).json({ message: problem, errors: { next: problem } });
    if (newPassword === current) return res.status(400).json({ message: 'The new password must be different.', errors: { next: 'Choose a different password.' } });

    req.admin.passwordHash = await req.admin.constructor.hashPassword(newPassword);
    req.admin.passwordChangedAt = new Date();
    await req.admin.save();
    // keep this browser signed in with a fresh login
    const token = jwt.sign({ sub: req.admin.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: cookieMaxAge });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
