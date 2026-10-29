require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const catalogRoutes = require('./routes/catalog');
const importCatalog = require('./scripts/importCatalog');
const { ensureDefaultAdmin } = require('./services/seedAdmin');
const { SITE_DIR } = require('./config/site');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activity');
const { applySecurity, publicCors } = require('./middleware/security');
const { track } = require('./services/activity');
const { publicRouter: publicContentRoutes, adminRouter: contentRoutes, UPLOAD_DIR } = require('./routes/content');
const { publicRouter: publicEnquiryRoutes, adminRouter: enquiryRoutes } = require('./routes/enquiries');
const { requireAuthPage, getAdminFromRequest } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

applySecurity(app);
app.use(express.json({ limit: '8mb' })); // 8mb so photos can be uploaded
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// The website's own calls (read content, send an enquiry) are the only ones allowed from another address.
app.use('/api/public', publicCors);
app.use('/api', track); // writes a line in the activity log for every successful change

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/public', publicContentRoutes);
app.use('/api/public', publicEnquiryRoutes); // the website's contact form posts here
app.use('/api/enquiries', enquiryRoutes);

// Pictures uploaded from the admin panel, and a read-only copy of the site's
// own images so the admin can preview them. Only these two folders are shared.
app.use('/uploads', express.static(UPLOAD_DIR, { setHeaders: (res) => res.set('X-Content-Type-Options', 'nosniff') }));
for (const folder of ['assets', 'BMI-machine-photos', 'Novatec-machine-photos', 'Huasheng-machine-photos']) {
  app.use(`/site/${folder}`, express.static(path.join(SITE_DIR, folder)));
}

// Public files for the login page (css/js).
app.use('/static', express.static(path.join(__dirname, 'public')));

// Login page. If you are already logged in, skip straight to the admin area.
app.get('/login', async (req, res, next) => {
  try {
    if (await getAdminFromRequest(req)) return res.redirect('/admin/');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  } catch (err) {
    next(err);
  }
});

// Everything under /admin requires a valid login cookie.
app.use('/admin', requireAuthPage, express.static(path.join(__dirname, 'views', 'admin')));

app.get('/', (req, res) => res.redirect('/admin/'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  // in production a crash never shows its inner details to the browser
  const message = status >= 500 && process.env.NODE_ENV === 'production' ? 'Server error. Please try again.' : err.message || 'Server error';
  res.status(status).json({ message });
});

connectDB()
  .then(async () => {
    await ensureDefaultAdmin(); // first start with an empty database: creates the login written in config/defaultAdmin.js
    // First start: copy the catalogue written in the website's products.js into the database.
    const imported = await importCatalog();
    if (!imported.skipped) console.log(`Imported the product catalogue: ${imported.brands} brands, ${imported.families} families, ${imported.products} products.`);
    app.listen(PORT, () => console.log(`Admin server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
