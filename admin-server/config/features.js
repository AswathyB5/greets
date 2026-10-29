// Account management (the "My account" and "Admins" screens, changing or resetting passwords from the panel).
// OFF by default: the one login is the one written in config/defaultAdmin.js, nobody can change it from the panel.
// Set ALLOW_ACCOUNT_MANAGEMENT=true in .env to turn these screens back on.
// Products go live by themselves: every save, delete, reorder or change of Published / Draft is published to the
// website a moment later (about a second). Set AUTO_PUBLISH=false in .env to publish by pressing a button instead.
const autoPublish = String(process.env.AUTO_PUBLISH || '').trim().toLowerCase() !== 'false';

// The Activity page (who changed what) is hidden by default. The log is still kept in the background;
// set SHOW_ACTIVITY=true in .env to show the page again.
const activityPage = String(process.env.SHOW_ACTIVITY || '').trim().toLowerCase() === 'true';

module.exports = {
  autoPublish,
  activityPage,
  accountManagement: String(process.env.ALLOW_ACCOUNT_MANAGEMENT || '').trim().toLowerCase() === 'true',
};
