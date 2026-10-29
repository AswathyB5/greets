// Enquiries sent from the website's contact form.
//   #/        list (search, status filter, pages)
//   #/<id>    one enquiry (change status, reply, delete)
(function () {
  const { api, esc, toast } = window.Admin;

  const viewEl = document.getElementById('view');
  const crumbsEl = document.getElementById('crumbs');
  const headingEl = document.getElementById('heading');
  const errorEl = document.getElementById('error');

  const STATUS_LABELS = { new: 'New', read: 'Read', replied: 'Replied' };
  const state = { status: '', q: '', page: 1 };

  function showError(message) {
    errorEl.textContent = message || '';
    errorEl.hidden = !message;
  }

  function formatDateTime(value) {
    return new Date(value).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function setHeader(crumbs, title) {
    Admin.crumbs(crumbsEl, crumbs);
    headingEl.textContent = title;
  }

  // Tells whether an email is sent for each new enquiry, with a button to test it.
  async function showMailStatus() {
    const line = document.getElementById('mail-line');
    try {
      const s = await api('/api/enquiries/mail-status');
      line.innerHTML = s.enabled
        ? `Email alerts are <strong>on</strong>: each new enquiry is emailed to ${esc(s.to.join(', '))}. <button type="button" class="link-btn" id="test-mail">Send a test email</button>`
        : 'Email alerts are off. To get an email for each new enquiry, add the email settings to the server (see DEPLOY.md).';
      const btn = document.getElementById('test-mail');
      if (btn) btn.addEventListener('click', async () => {
        btn.disabled = true;
        try { await api('/api/enquiries/test-mail', { method: 'POST' }); toast('Test email sent. Check the inbox.'); } catch (err) { showError(err.message); }
        btn.disabled = false;
      });
    } catch (err) { line.textContent = ''; }
  }

  // ---------- list ----------
  async function showList() {
    setHeader([{ label: 'Enquiries' }], 'Enquiries');
    const params = new URLSearchParams({ page: state.page, pageSize: 20 });
    if (state.status) params.set('status', state.status);
    if (state.q) params.set('q', state.q);
    const data = await api(`/api/enquiries?${params}`);
    const pages = Math.max(1, Math.ceil(data.total / data.pageSize));

    // Rebuild the page only when it is not already there, so typing in the search box is not interrupted.
    if (!document.getElementById('enq-rows')) {
      viewEl.innerHTML = `
        <div class="toolbar">
          <input class="search" id="search" type="search" placeholder="Search name, email, company, phone or message" aria-label="Search enquiries">
          <select id="status" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <a class="btn secondary" id="export" href="/api/enquiries/export.csv" download>Export to Excel (CSV)</a>
        </div>
        <p class="muted" id="mail-line" style="margin:-4px 0 14px"></p>
        <div class="table-wrap"><table>
          <thead><tr><th>Name</th><th>Contact</th><th>Interested in</th><th>Status</th><th>Received</th><th></th></tr></thead>
          <tbody id="enq-rows"></tbody>
        </table></div>
        <div class="pagination">
          <span id="summary"></span>
          <div class="pager">
            <button class="btn secondary small" id="prev" type="button">Previous</button>
            <span id="page-label"></span>
            <button class="btn secondary small" id="next" type="button">Next</button>
          </div>
        </div>`;
      let timer;
      document.getElementById('search').addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => { state.q = e.target.value.trim(); state.page = 1; refresh(); }, 250);
      });
      document.getElementById('status').addEventListener('change', (e) => { state.status = e.target.value; state.page = 1; refresh(); });
      document.getElementById('prev').addEventListener('click', () => { state.page -= 1; refresh(); });
      document.getElementById('next').addEventListener('click', () => { state.page += 1; refresh(); });
      showMailStatus();
    }

    // the export gets the same search and status filter that is on screen
    const exportParams = new URLSearchParams();
    if (state.status) exportParams.set('status', state.status);
    if (state.q) exportParams.set('q', state.q);
    document.getElementById('export').href = `/api/enquiries/export.csv${exportParams.toString() ? '?' + exportParams : ''}`;

    document.getElementById('search').value = state.q;
    document.getElementById('status').value = state.status;
    const opts = document.getElementById('status').options;
    opts[1].textContent = `New (${data.counts.new})`;
    opts[2].textContent = `Read (${data.counts.read})`;
    opts[3].textContent = `Replied (${data.counts.replied})`;

    document.getElementById('enq-rows').innerHTML = data.items.length
      ? data.items.map((e) => `
        <tr class="${e.status === 'new' ? 'unread' : ''}">
          <td><a href="#/${esc(e._id)}"><strong>${esc(e.name)}</strong></a>${e.company ? `<div class="muted">${esc(e.company)}</div>` : ''}</td>
          <td>${esc(e.email)}${e.phone ? `<div class="muted">${esc(e.phone)}</div>` : ''}</td>
          <td>${esc(e.product) || '<span class="muted">-</span>'}</td>
          <td><span class="badge ${esc(e.status)}">${esc(STATUS_LABELS[e.status])}</span></td>
          <td>${esc(formatDateTime(e.createdAt))}</td>
          <td class="row-actions"><a class="btn small" href="#/${esc(e._id)}">Open</a></td>
        </tr>`).join('')
      : `<tr><td colspan="6" class="empty">${state.q || state.status ? 'No enquiries match your search.' : 'No enquiries yet. Messages sent from the website contact form will appear here.'}</td></tr>`;

    document.getElementById('summary').textContent = `${data.total} enquir${data.total === 1 ? 'y' : 'ies'}`;
    document.getElementById('page-label').textContent = `Page ${data.page} of ${pages}`;
    document.getElementById('prev').disabled = data.page <= 1;
    document.getElementById('next').disabled = data.page >= pages;
  }

  // ---------- one enquiry ----------
  function row(label, value) {
    return `<div class="detail-row"><div class="detail-label">${esc(label)}</div><div class="detail-value">${value || '<span class="muted">-</span>'}</div></div>`;
  }

  async function showDetail(id) {
    viewEl.innerHTML = '<p class="empty">Loading...</p>';
    const e = await api(`/api/enquiries/${encodeURIComponent(id)}`);
    setHeader([{ label: 'Enquiries', href: '#/' }, { label: e.name }], e.name);

    viewEl.innerHTML = `
      <div class="detail-head">
        <span class="badge ${esc(e.status)}" id="status-badge">${esc(STATUS_LABELS[e.status])}</span>
        <span class="muted">Received ${esc(formatDateTime(e.createdAt))}</span>
        <div class="detail-actions">
          <select id="set-status" aria-label="Change status">
            ${Object.keys(STATUS_LABELS).map((s) => `<option value="${s}"${s === e.status ? ' selected' : ''}>Mark as ${STATUS_LABELS[s].toLowerCase()}</option>`).join('')}
          </select>
          <button type="button" class="btn danger small" id="delete">Delete</button>
        </div>
      </div>
      <div class="detail-grid">
        ${row('Name', esc(e.name))}
        ${row('Company', esc(e.company))}
        ${row('Email', esc(e.email))}
        ${row('Phone', esc(e.phone))}
        ${row('City', esc(e.city))}
        ${row('Looking for', esc(e.process))}
        ${row('Asked from (page / product)', esc(e.sourcePage))}
        ${row('Category', esc(e.category))}
        ${row('Brand', esc(e.brand))}
      </div>
      <h2 class="detail-sub">Parts, material and volumes</h2>
      <p class="detail-message">${e.message ? esc(e.message) : '<span class="muted">Nothing written.</span>'}</p>`;

    document.getElementById('set-status').addEventListener('change', async (ev) => {
      try {
        const updated = await api(`/api/enquiries/${encodeURIComponent(id)}`, { method: 'PUT', body: { status: ev.target.value } });
        const badge = document.getElementById('status-badge');
        badge.className = `badge ${updated.status}`;
        badge.textContent = STATUS_LABELS[updated.status];
        toast('Status updated.');
      } catch (err) {
        showError(err.message);
      }
    });

    document.getElementById('delete').addEventListener('click', async () => {
      if (!confirm(`Delete the enquiry from "${e.name}"?\n\nThis cannot be undone.`)) return;
      try {
        await api(`/api/enquiries/${encodeURIComponent(id)}`, { method: 'DELETE' });
        toast('Enquiry deleted.');
        location.hash = '#/';
      } catch (err) {
        showError(err.message);
      }
    });
  }

  function refresh() {
    showError('');
    showList().catch((err) => showError(err.message));
  }

  async function route() {
    showError('');
    const id = location.hash.replace(/^#\/?/, '');
    try {
      if (id) await showDetail(id);
      else {
        viewEl.innerHTML = '';
        await showList();
      }
    } catch (err) {
      showError(err.status === 404 ? 'That enquiry no longer exists.' : err.message);
      if (id) { viewEl.innerHTML = '<p><a class="btn secondary" href="#/">Back to enquiries</a></p>'; }
    }
  }

  window.addEventListener('hashchange', route);
  route();
})();
