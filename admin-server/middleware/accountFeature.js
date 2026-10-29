// Answers 404 for every account / password route while account management is switched off.
const { accountManagement } = require('../config/features');

module.exports = function requireAccountManagement(req, res, next) {
  if (accountManagement) return next();
  res.status(404).json({ message: 'This feature is turned off.' });
};
