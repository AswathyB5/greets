// Activity: who changed what, and when (kept for 180 days).
(function () {
  const { api, esc } = window.Admin;
  const viewEl = document.getElementById('view');
  const errorEl = document.getElementById('error');
  document.getElementById('intro').textContent = 'Every change made in this admin panel, newest first. Kept for 180 days.';

  const state = { kind: '', page: 1 };
  const when = (v) => new Date(v).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  async function load() {
    errorEl.hidden = true;
    const params = new URLSearchParams({ page: state.page });
    if (state.kind) params.set('kind', state.kind);
    const data = await api(`/api/activity?${params}`);
    const pages = Math.max(1, Math.ceil(data.total / data.pageSize));
    viewEl.innerHTML = `
      <div class="toolbar">
        <select id="kind" aria-label="Show">
          <option value="">Changes and sign-ins</option>
          <option value="change">Changes only</option>
          <option value="login">Sign-ins only</option>
        </select>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>When</th><th>Who</th><th>What happened</th></tr></thead>
        <tbody>${data.items.length ? data.items.map((a) => `
          <tr><td>${esc(when(a.at))}</td><td>${esc(a.username) || '<span class="muted">-</span>'}</td><td>${esc(a.action)}</td></tr>`).join('') : '<tr><td colspan="3" class="empty">Nothing recorded yet.</td></tr>'}</tbody>
      </table></div>
      <div class="pagination">
        <span>${data.total} entr${data.total === 1 ? 'y' : 'ies'}</span>
        <div class="pager">
          <button class="btn secondary small" id="prev" type="button"${data.page <= 1 ? ' disabled' : ''}>Previous</button>
          <span>Page ${data.page} of ${pages}</span>
          <button class="btn secondary small" id="next" type="button"${data.page >= pages ? ' disabled' : ''}>Next</button>
        </div>
      </div>`;
    document.getElementById('kind').value = state.kind;
    document.getElementById('kind').addEventListener('change', (e) => { state.kind = e.target.value; state.page = 1; load(); });
    document.getElementById('prev').addEventListener('click', () => { state.page -= 1; load(); });
    document.getElementById('next').addEventListener('click', () => { state.page += 1; load(); });
  }

  window.Admin.crumbs(null, [{ label: 'Activity' }]);
  load().catch((err) => {
    if (err.status === 404) { window.location.href = '/admin/'; return; } // the page is switched off
    errorEl.textContent = err.message;
    errorEl.hidden = false;
  });
})();
