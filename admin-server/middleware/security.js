// Production safety settings, all controlled from .env:
//   TRUST_PROXY      1 (or true) when the server sits behind nginx / a load balancer, so the visitor's real
//                    address is used for the rate limits (login attempts, enquiry spam protection).
//   ALLOWED_ORIGINS  the website addresses allowed to read content and send enquiries, comma separated,
//                    e.g. https://www.greetsequipment.com,https://greetsequipment.com
//                    Not set: everything is allowed while developing, nothing from other sites in production.
const cors = require('cors');

const isProduction = () => process.env.NODE_ENV === 'production';

function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean);
}

function applySecurity(app) {
  const proxy = (process.env.TRUST_PROXY || '').trim();
  if (proxy) app.set('trust proxy', /^\d+$/.test(proxy) ? Number(proxy) : proxy === 'true');
  app.disable('x-powered-by');

  app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // the admin screens must never be shown inside another website's frame
    if (!req.path.startsWith('/api/public')) res.set('X-Frame-Options', 'DENY');
    if (isProduction()) res.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
    next();
  });

  if (isProduction() && !allowedOrigins().length) {
    console.warn('ALLOWED_ORIGINS is not set: the website cannot call this server from another address. Set it in .env.');
  }
}

// CORS only for the routes the public website calls. The admin API is used by the admin pages from
// the same address, so it needs no cross-site access at all.
const publicCors = cors((req, callback) => {
  const list = allowedOrigins();
  const origin = req.get('Origin');
  if (!list.length) return callback(null, { origin: !isProduction() }); // development: allow all
  callback(null, { origin: !origin || list.includes(origin) });
});

module.exports = { applySecurity, publicCors, allowedOrigins };
