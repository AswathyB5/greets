// Creates the first admin from config/defaultAdmin.js when the database has none.
// While account management is OFF (the default) the password written there is ALWAYS the one that works:
// edit config/defaultAdmin.js, restart, and the login follows.
const Admin = require('../models/Admin');
const defaults = require('../config/defaultAdmin');
const { accountManagement } = require('../config/features');

async function ensureDefaultAdmin() {
  const existing = await Admin.findOne({ username: defaults.username });

  if (!existing) {
    if (accountManagement && (await Admin.countDocuments())) return { created: false }; // admins are managed in the panel
    await Admin.create({ username: defaults.username, passwordHash: await Admin.hashPassword(defaults.password) });
    console.log(`Created the admin "${defaults.username}" from config/defaultAdmin.js.`);
    return { created: true };
  }

  const matches = await existing.verifyPassword(defaults.password);
  if (!accountManagement && !matches) {
    existing.passwordHash = await Admin.hashPassword(defaults.password);
    existing.passwordChangedAt = new Date(); // signs out anyone using the old password
    await existing.save();
    console.log(`The password of "${existing.username}" now follows config/defaultAdmin.js.`);
    return { created: false, updated: true };
  }
  if (accountManagement && matches) {
    const live = process.env.NODE_ENV === 'production';
    console[live ? 'error' : 'warn'](`The admin "${existing.username}" still uses the password written in config/defaultAdmin.js. Change it under "My account"${live ? ' NOW: this server is live.' : ' before going live.'}`);
  }
  return { created: false };
}

module.exports = { ensureDefaultAdmin };
