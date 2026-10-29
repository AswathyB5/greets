// Shared by every admin page: builds the sidebar + top bar, checks login,
// and exposes small helpers on window.Admin.
(function () {
  const ICONS = {
    dashboard: '<path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"/>',
    pages: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5"/>',
    products: '<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/>',
    enquiries: '<path d="M4 4h16v12H8l-4 4V4z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    account: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>',
    site: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    logout: '<path d="M9 21H5V3h4M16 17l5-5-5-5M21 12H9"/>',
    // small icons for the items inside the Pages / Products dropdowns
    building: '<path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16M15 10h3a1 1 0 0 1 1 1v10M9 8h2M9 12h2M9 16h2"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    cube: '<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/>',
    home: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    mail: '<path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  };

  // The pages you can edit, listed inside the sidebar (the ids are the ones the server knows).
  const PAGES = [
    { id: 'index', label: 'Home page', icon: 'home' },
    { id: 'contact', label: 'Contact page', icon: 'mail' },
    { id: 'privacy', label: 'Privacy page', icon: 'shield' },
    { id: 'global', label: 'Header & Footer', icon: 'layout' },
  ];

  const NAV = [
    { key: 'dashboard', label: 'Dashboard', href: '/admin/' },
    { key: 'pages', label: 'Pages', href: '/admin/pages.html' },
    { key: 'products', label: 'Products', href: '/admin/products.html' },
    { key: 'enquiries', label: 'Enquiries', href: '/admin/enquiries.html' },
    { key: 'users', label: 'Admins', href: '/admin/users.html', account: true },
    { key: 'activity', label: 'Activity', href: '/admin/activity.html', activity: true },
    { key: 'help', label: 'Help & tutorial', href: '/admin/help.html' },
    { key: 'account', label: 'My account', href: '/admin/account.html', account: true },
  ];

  // a small icon that stands in front of a name in the sidebar
  const mini = (name) => `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  }

  // Turns user-supplied text into safe HTML (stops injected <script> etc.).
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  // fetch() wrapper: sends/receives JSON, redirects to login on 401,
  // and throws an Error (with .status and .errors) for any failed reply.
  async function api(url, options = {}) {
    const init = { ...options, headers: { ...(options.headers || {}) } };
    if (init.body !== undefined) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(init.body);
    }
    const res = await fetch(url, init);
    if (res.status === 401) {
      window.location.href = '/login';
      throw new Error('Not authenticated');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.message || 'Something went wrong.');
      err.status = res.status;
      err.errors = data.errors || {};
      throw err;
    }
    return data;
  }

  function toast(message) {
    const box = document.createElement('div');
    box.className = 'toast';
    box.setAttribute('role', 'status');
    box.textContent = message;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
  }

  // Breadcrumbs: "Dashboard / ... / where you are". Every part except the last one is a link, and a Back button
  // (to the level just above) is put at the start of the page heading.
  function crumbs(el, trail) {
    const all = [{ label: 'Dashboard', href: '/admin/' }].concat(trail);
    // The trail itself (Dashboard / Products / BMI) is not shown: the Back button says the same thing in fewer words.
    if (el) { el.innerHTML = ''; el.hidden = true; }
    const parent = all.length > 1 ? all[all.length - 2] : null;
    const head = document.querySelector('.page-head');
    let back = document.getElementById('back-btn');
    if (!parent || !parent.href) { if (back) back.remove(); return; }
    if (!back && head) {
      back = document.createElement('a');
      back.id = 'back-btn';
      back.className = 'btn secondary small back-btn';
      head.insertBefore(back, head.firstChild);
    }
    if (back) { back.href = parent.href; back.textContent = '\u2190 Back to ' + parent.label; back.title = 'Back to ' + parent.label; }
  }

  function formatDate(value) {
    return new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ---------- the sidebar's dropdowns: Pages, and Products > brand > family > product ----------
  // A dropdown's open / closed state is remembered while the browser tab stays open.
  const NAV_KEY = 'greets-nav-open';
  const navState = () => { try { return JSON.parse(sessionStorage.getItem(NAV_KEY) || '{}'); } catch (e) { return {}; } };
  const saveNavState = (st) => { try { sessionStorage.setItem(NAV_KEY, JSON.stringify(st)); } catch (e) { /* storage blocked: fine */ } };
  const startsOpen = (key, fallback) => { const st = navState(); return key in st ? !!st[key] : fallback; };

  // One dropdown: a row (a link or a label, plus a small arrow that opens / closes it) and what is inside.
  function dropdown(key, open, row, inner, cls) {
    return `<details class="${cls}" data-key="${esc(key)}"${startsOpen(key, open) ? ' open' : ''}><summary>${row}<span class="nav-toggle" role="button" tabindex="0" aria-label="Show or hide"></span></summary><div class="nav-children">${inner}</div></details>`;
  }

  const PRODUCTS_URL = '/admin/products.html';
  // brands, families and products are all closed until you open them (the one you are on opens by itself)
  function productsTree(tree) {
    return tree.brands.map((b) => dropdown(`b:${b.id}`, false,
      `<a href="${PRODUCTS_URL}#/brand/${esc(b.id)}" data-brand="${esc(b.id)}" title="${esc(b.name)}">${mini('building')}<span>${esc(b.name)}</span></a>`,
      b.families.map((f) => dropdown(`f:${b.id}/${f.id}`, false,
        `<a href="${PRODUCTS_URL}#/brand/${esc(b.id)}/family/${esc(f.id)}" data-family="${esc(b.id)}/${esc(f.id)}" class="${f.status === 'draft' ? 'is-draft' : ''}" title="${esc(f.name)}">${mini('folder')}<span>${esc(f.name)}</span></a>`,
        (f.products || []).map((p) => `<a class="nav-leaf${p.status === 'draft' ? ' is-draft' : ''}" href="${PRODUCTS_URL}#/brand/${esc(b.id)}/product/${esc(p.id)}" data-product="${esc(b.id)}/${esc(p.id)}" title="${esc(p.name)}">${mini('cube')}<span>${esc(p.name)}</span></a>`).join('') || '<span class="nav-empty">No products yet</span>',
        'nav-sub')).join('') || '<span class="nav-empty">No families yet</span>',
      'nav-sub')).join('');
  }

  // Highlights where you are, and opens the dropdowns above it so it can be seen.
  function markNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const active = document.body.dataset.page;
    // only the links inside the dropdowns change as you move around; Dashboard, Enquiries... keep their own highlight
    nav.querySelectorAll('.nav-group a[aria-current]').forEach((a) => a.removeAttribute('aria-current'));
    let target = null;
    if (active === 'pages') {
      const m = location.hash.match(/^#\/page\/(\w+)/);
      if (m) target = nav.querySelector(`a[data-page-id="${m[1]}"]`);
    } else if (active === 'products') {
      const parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean);
      if (parts[0] === 'brand' && parts[1]) {
        const isNew = parts[3] === 'new';
        if (parts[2] === 'product' && parts[3] && !isNew) target = nav.querySelector(`a[data-product="${parts[1]}/${parts[3]}"]`);
        else if (parts[2] === 'family' && parts[3] && !isNew) target = nav.querySelector(`a[data-family="${parts[1]}/${parts[3]}"]`);
        if (!target) target = nav.querySelector(`a[data-brand="${parts[1]}"]`);
      } else {
        target = nav.querySelector('a[data-products-home]');
      }
    }
    if (!target) return;
    target.setAttribute('aria-current', 'page');
    for (let d = target.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
  }

  async function refreshNav() {
    const host = document.getElementById('nav-products-tree');
    if (!host) return;
    try {
      host.innerHTML = productsTree(await api('/api/catalog/tree'));
    } catch (err) {
      host.innerHTML = '';
    }
    markNav();
  }

  function buildShell() {
    const active = document.body.dataset.page;
    const title = document.body.dataset.title || 'Admin';

    const links = NAV.map((item) => {
      if (item.key === 'pages') {
        return dropdown('pages', true, `<span class="nav-label">${icon('pages')}Pages</span>`,
          PAGES.map((p) => `<a href="/admin/pages.html#/page/${p.id}" data-page-id="${p.id}">${mini(p.icon)}<span>${p.label}</span></a>`).join(''), 'nav-group');
      }
      if (item.key === 'products') {
        // "Products" still opens the Products page; the arrow opens the list of brands under it
        return dropdown('products', true, `<a class="nav-label" href="${item.href}" data-products-home>${icon('products')}Products</a>`,
          '<div id="nav-products-tree"></div>', 'nav-group');
      }
      return `<a href="${item.href}"${item.key === active ? ' aria-current="page"' : ''}${item.account ? ' data-account hidden' : ''}${item.activity ? ' data-activity hidden' : ''}>${icon(item.key)}${item.label}</a>`;
    }).join('');

    document.getElementById('sidebar').innerHTML = `
      <div class="brand"><img src="/admin/logo-greets.png" alt="Greets"><span>Admin</span></div>
      <nav class="nav" aria-label="Main">
        ${links}
        <a href="#" id="site-link" target="_blank" rel="noopener" hidden>${icon('site')}View website</a>
        <button type="button" class="logout" id="logout">${icon('logout')}Logout</button>
      </nav>`;

    document.getElementById('topbar').innerHTML = `
      <button type="button" class="menu-btn" id="menu-btn" aria-label="Show or hide the menu" title="Show or hide the menu" aria-controls="sidebar">&#9776;</button>
      <span class="page-title">${esc(title)}</span>
      <span class="who" id="who"></span>`;

    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('backdrop');
    const setOpen = (open) => {
      sidebar.classList.toggle('open', open);
      backdrop.classList.toggle('show', open);
    };
    // on a phone the menu slides over the page; on a computer it is hidden / shown, and the choice is remembered
    const phone = () => window.matchMedia && window.matchMedia('(max-width: 860px)').matches;
    try { if (localStorage.getItem('greets-nav-hidden') === '1') document.body.classList.add('nav-hidden'); } catch (e) { /* fine */ }
    document.getElementById('menu-btn').addEventListener('click', () => {
      if (phone()) { setOpen(!sidebar.classList.contains('open')); return; }
      const hidden = document.body.classList.toggle('nav-hidden');
      try { localStorage.setItem('greets-nav-hidden', hidden ? '1' : '0'); } catch (e) { /* fine */ }
    });
    backdrop.addEventListener('click', () => setOpen(false));
    // choosing a page closes the menu on a phone
    sidebar.addEventListener('click', (e) => { if (phone() && e.target.closest('a[href]')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

    const nav = sidebar.querySelector('.nav');
    // the small arrow opens / closes a dropdown without leaving the page
    const flip = (e) => {
      const t = e.target.closest('.nav-toggle');
      if (!t) return false;
      e.preventDefault();
      const d = t.closest('details');
      d.open = !d.open;
      return true;
    };
    nav.addEventListener('click', flip);
    nav.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') flip(e); });
    // remember what is open
    nav.addEventListener('toggle', (e) => {
      const d = e.target;
      if (d.matches && d.matches('details[data-key]')) { const st = navState(); st[d.dataset.key] = d.open; saveNavState(st); }
    }, true);
    markNav();
    window.addEventListener('hashchange', markNav);

    document.getElementById('logout').addEventListener('click', async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    });
  }

  buildShell();

  fetch('/api/auth/me')
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      const who = document.getElementById('who');
      // the Activity page only exists when SHOW_ACTIVITY=true (see config/features.js)
      if (data.activityPage) document.querySelectorAll('[data-activity]').forEach((a) => { a.hidden = false; });
      // "Admins" / "My account" only exist when account management is switched on (see config/features.js)
      if (data.accountManagement) {
        document.querySelectorAll('[data-account]').forEach((a) => { a.hidden = false; });
        who.innerHTML = `<a href="/admin/account.html" title="My account">${esc(data.username)}</a>`;
      } else {
        who.textContent = data.username;
      }
      if (data.siteUrl && /^https?:\/\//i.test(data.siteUrl)) {
        const link = document.getElementById('site-link');
        link.href = data.siteUrl;
        link.hidden = false;
      }
    })
    .catch(() => { window.location.href = '/login'; });

  window.Admin = { api, esc, toast, formatDate, refreshNav, crumbs };
  refreshNav();
})();
