const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { JWT_SECRET, COOKIE_NAME } = require('../config/auth');

// Reads the cookie, checks the JWT signature/expiry, and loads the admin.
// Returns the admin document, or null if the visitor is not logged in.
async function getAdminFromRequest(req) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(payload.sub);
    // a password change signs out every older login (a token's "iat" is in whole seconds)
    if (admin && admin.passwordChangedAt && payload.iat * 1000 < Math.floor(admin.passwordChangedAt.getTime() / 1000) * 1000) return null;
    return admin;
  } catch (err) {
    return null;
  }
}

// For API routes: answer 401 JSON when not logged in.
async function requireAuthApi(req, res, next) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) return res.status(401).json({ message: 'Not authenticated' });
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
}

// For admin pages: redirect to the login page when not logged in.
async function requireAuthPage(req, res, next) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) return res.redirect('/login');
    req.admin = admin;
    // Stop browsers caching admin pages, so "Back" after logout shows nothing.
    res.set('Cache-Control', 'no-store');
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAdminFromRequest, requireAuthApi, requireAuthPage };
