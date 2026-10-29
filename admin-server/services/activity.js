// The activity log: a sentence for every change made in the admin panel.
// log() writes one entry; track() is middleware that logs each successful change automatically,
// so no route can forget to.
const ActivityLog = require('../models/ActivityLog');

const PAGE_NAMES = { global: 'the header & footer', index: 'the Home page', contact: 'the Contact page', privacy: 'the Privacy page' };

// Turns a request into words a person understands. Returns '' for requests that are not worth logging.
function describe(method, url, body) {
  const path = url.split('?')[0].replace(/\/+$/, '');
  const m = (re) => path.match(re);
  let x;
  body = body || {};

  if ((x = m(/^\/api\/content\/pages\/(\w+)$/)) && method === 'PUT') return `Edited ${PAGE_NAMES[x[1]] || x[1]}`;
  if (m(/^\/api\/content\/blocks/)) return { POST: 'Added a new item to a page', PUT: 'Edited an added item on a page', DELETE: 'Deleted an added item from a page' }[method] || '';
  if (m(/^\/api\/content\/cards\//) && method === 'PUT') return body.deleted === false ? 'Restored a deleted item on a page' : 'Deleted an item on a page';
  if (path === '/api/content/upload') return 'Uploaded a picture';

  if (path === '/api/catalog/publish') return 'Published the products to the website';
  if ((x = m(/^\/api\/catalog\/brands\/([\w-]+)$/)) && method === 'PUT') return `Edited the brand "${x[1]}"`;
  if (m(/\/families-order$/) || m(/\/products-order$/)) return 'Changed the order of the list';
  if ((x = m(/^\/api\/catalog\/brands\/([\w-]+)\/families(?:\/([\w-]+))?$/))) {
    if (method === 'POST') return `Added a family to "${x[1]}"`;
    if (method === 'PUT') return `Edited the family "${x[2]}"${body.data === undefined && body.status ? ` (now ${body.status})` : ''}`;
    if (method === 'DELETE') return `Deleted the family "${x[2]}"`;
  }
  if ((x = m(/^\/api\/catalog\/brands\/([\w-]+)\/products\/([\w-]+)\/duplicate$/))) return `Copied the product "${x[2]}"`;
  if ((x = m(/^\/api\/catalog\/brands\/([\w-]+)\/products(?:\/([\w-]+))?$/))) {
    if (method === 'POST') return `Added a product to "${x[1]}"`;
    if (method === 'PUT') return `Edited the product "${x[2]}"${body.data === undefined && body.status ? ` (now ${body.status})` : ''}`;
    if (method === 'DELETE') return `Deleted the product "${x[2]}"`;
  }

  if (m(/^\/api\/enquiries\/[0-9a-f]{24}$/)) {
    if (method === 'PUT') return `Marked an enquiry as ${body.status}`;
    if (method === 'DELETE') return 'Deleted an enquiry';
  }
  if (path === '/api/users' && method === 'POST') return `Added the admin "${body.username}"`;
  if (m(/^\/api\/users\/[0-9a-f]{24}\/password$/)) return 'Reset another admin\'s password';
  if (m(/^\/api\/users\/[0-9a-f]{24}$/) && method === 'DELETE') return 'Removed an admin';
  if (path === '/api/auth/password') return 'Changed their own password';
  return '';
}

async function log(username, action, kind = 'change') {
  try {
    await ActivityLog.create({ username: username || '', action, kind });
  } catch (err) {
    console.error('Could not write the activity log:', err.message);
  }
}

// Put before the routers: when a change request finishes successfully, one line is written.
function track(req, res, next) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return next();
  const body = req.body;
  res.on('finish', () => {
    if (res.statusCode >= 400 || !req.admin) return;
    const action = describe(req.method, req.originalUrl, body);
    if (action) log(req.admin.username, action);
  });
  next();
}

module.exports = { log, track, describe };
