// The first admin login. When the server starts and the database has NO admin at all, this one is created
// automatically, so no extra command is needed. It is stored in the database as a scrambled hash, so it can be
// changed any time under "My account", and nothing here is used once an admin exists.
//
// Change the two values below (or set ADMIN_USERNAME / ADMIN_PASSWORD in .env) to use different ones.
// Anyone who can read this file can read the password, so change it in "My account" before going live.
module.exports = {
  username: (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase(),
  password: process.env.ADMIN_PASSWORD || 'GreetsEquipmentsAdmin@2026',
};
