// Admins: everyone who can sign in to this panel. Add, reset a password, remove.
(function () {
  const { api, esc, toast } = window.Admin;
  const viewEl = document.getElementById('view');
  const errorEl = document.getElementById('error');
  document.getElementById('intro').textContent = 'People who can sign in to this admin panel. Everyone here can change everything.';

  const showError = (m) => { errorEl.textContent = m || ''; errorEl.hidden = !m; };
  const when = (v) => (v ? new Date(v).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never');
  const icon = (d, label, attrs, cls) => `<button type="button" class="btn small icon-btn ${cls || 'secondary'}" ${attrs} title="${esc(label)}" aria-label="${esc(label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg></button>`;
  const KEY = '<path d="M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>';
  const TRASH = '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>';

  let users = [];
  let resetFor = null;

  function render() {
    viewEl.innerHTML = `
      <div class="table-wrap"><table>
        <thead><tr><th>Username</th><th>Added</th><th>Last sign-in</th><th></th></tr></thead>
        <tbody>${users.map((u) => `
          <tr>
            <td><strong>${esc(u.username)}</strong>${u.you ? ' <span class="muted">(you)</span>' : ''}</td>
            <td>${esc(when(u.createdAt))}</td>
            <td>${esc(when(u.lastLoginAt))}</td>
            <td class="row-actions"><div class="btn-group">
              ${u.you ? '<a class="btn small secondary" href="/admin/account.html">Change my password</a>' : icon(KEY, 'Set a new password', `data-reset="${esc(u.id)}"`) + icon(TRASH, 'Remove this admin', `data-remove="${esc(u.id)}" data-name="${esc(u.username)}"`, 'danger')}
            </div></td>
          </tr>`).join('')}</tbody>
      </table></div>

      ${resetFor ? `
      <form class="inline-panel form-narrow" id="reset-form" style="margin-top:18px">
        <h2 style="margin:0 0 10px;font-size:1rem">New password for ${esc(resetFor.username)}</h2>
        <div class="cf-field"><input id="reset-pw" type="password" autocomplete="new-password" required minlength="8" placeholder="At least 8 characters"><p class="field-error" id="reset-err" hidden></p></div>
        <button class="btn" type="submit">Save new password</button>
        <button class="btn secondary" type="button" id="reset-cancel">Cancel</button>
        <p class="hint-line">${esc(resetFor.username)} is signed out everywhere and must use the new password.</p>
      </form>` : ''}

      <form class="inline-panel form-narrow" id="add-form" style="margin-top:18px" autocomplete="off">
        <h2 style="margin:0 0 10px;font-size:1rem">Add an admin</h2>
        <div class="cf-field"><label class="cf-label" for="new-name">Username</label><input id="new-name" type="text" autocomplete="off" required placeholder="for example priya"><p class="field-error" id="name-err" hidden></p></div>
        <div class="cf-field"><label class="cf-label" for="new-pw">Password</label><input id="new-pw" type="password" autocomplete="new-password" required minlength="8" placeholder="At least 8 characters"><p class="field-error" id="pw-err" hidden></p></div>
        <button class="btn" type="submit">Add admin</button>
      </form>`;
  }

  async function load() {
    users = (await api('/api/users')).users;
    render();
  }

  viewEl.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    showError('');
    if (btn.dataset.reset) {
      resetFor = users.find((u) => u.id === btn.dataset.reset);
      render();
      const box = document.getElementById('reset-pw');
      if (box) box.focus();
    } else if (btn.id === 'reset-cancel') {
      resetFor = null;
      render();
    } else if (btn.dataset.remove) {
      if (!confirm(`Remove the admin "${btn.dataset.name}"?\n\nThey will no longer be able to sign in.`)) return;
      try {
        await api(`/api/users/${btn.dataset.remove}`, { method: 'DELETE' });
        toast('Admin removed.');
        await load();
      } catch (err) { showError(err.message); await load(); }
    }
  });

  viewEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError('');
    if (e.target.id === 'add-form') {
      const username = document.getElementById('new-name').value;
      const password = document.getElementById('new-pw').value;
      try {
        await api('/api/users', { method: 'POST', body: { username, password } });
        toast('Admin added.');
        await load();
      } catch (err) {
        const f = err.errors || {};
        const put = (id, text) => { const p = document.getElementById(id); if (p) { p.textContent = text; p.hidden = false; } };
        if (f.username) put('name-err', f.username);
        if (f.password) put('pw-err', f.password);
        showError(err.message);
      }
    } else if (e.target.id === 'reset-form') {
      try {
        await api(`/api/users/${resetFor.id}/password`, { method: 'PUT', body: { password: document.getElementById('reset-pw').value } });
        toast('Password changed.');
        resetFor = null;
        await load();
      } catch (err) {
        const p = document.getElementById('reset-err');
        p.textContent = err.message;
        p.hidden = false;
      }
    }
  });

  window.Admin.crumbs(null, [{ label: 'Admins' }]);
  load().catch((err) => {
    if (err.status === 404) { window.location.href = '/admin/'; return; } // the feature is switched off
    showError(err.message);
  });
})();
