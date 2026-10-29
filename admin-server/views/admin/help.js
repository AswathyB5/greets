// The Help & tutorial page: small pictures of the buttons the guide talks about, and the breadcrumb trail.
(function () {
  const ICONS = {
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    restore: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    up: '<path d="M18 15l-6-6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  };
  document.querySelectorAll('[data-i]').forEach((el) => {
    const d = ICONS[el.dataset.i];
    if (d) el.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  });
  window.Admin.crumbs(null, [{ label: 'Help & tutorial' }]);
  // mentions of the Activity page appear only when that page is switched on
  fetch('/api/auth/me').then((r) => (r.ok ? r.json() : {})).then((me) => { if (me.activityPage) document.querySelectorAll('[data-activity]').forEach((e) => { e.hidden = false; }); }).catch(() => {});
})();
