const path = require('path');

// The folder that holds the website files (index.html, products.js, bmi/, ...).
// Product publishing writes into it. Set SITE_DIR in .env if the site lives elsewhere.
const SITE_DIR = path.resolve(process.env.SITE_DIR || path.join(__dirname, '..', '..'));

module.exports = { SITE_DIR };
