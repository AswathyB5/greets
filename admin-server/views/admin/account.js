// My account: who you are and changing your own password.
(function () {
  const { api, esc, toast } = window.Admin;
  const viewEl = document.getElementById('view');
  const errorEl = document.getElementById('error');
  document.getElementById('intro').textContent = 'Change the password you sign in with.';

  const showError = (m) => { errorEl.textContent = m || ''; errorEl.hidden = !m; };
  const when = (v) => (v ? new Date(v).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-');

  async function render() {
    const { users } = await api('/api/users');
    const me = users.find((u) => u.you) || {};
    viewEl.innerHTML = `
      <p>Signed in as <strong>${esc(me.username)}</strong>. Last sign-in before this one: ${esc(when(me.lastLoginAt))}.</p>
      <form id="pw" class="form-narrow" autocomplete="off">
        <div class="cf-field"><label class="cf-label" for="cur">Current password</label><input id="cur" type="password" autocomplete="current-password" required><p class="field-error" data-for="current" hidden></p></div>
        <div class="cf-field"><label class="cf-label" for="new1">New password</label><input id="new1" type="password" autocomplete="new-password" required minlength="8"><p class="hint-line">At least 8 characters. Avoid easy ones like "password".</p><p class="field-error" data-for="next" hidden></p></div>
        <div class="cf-field"><label class="cf-label" for="new2">Type the new password again</label><input id="new2" type="password" autocomplete="new-password" required><p class="field-error" data-for="again" hidden></p></div>
        <button class="btn" type="submit" id="save">Change password</button>
        <p class="hint-line">Changing it signs you out of every other browser or device.</p>
      </form>`;

    document.getElementById('pw').addEventListener('submit', async (e) => {
      e.preventDefault();
      showError('');
      viewEl.querySelectorAll('.field-error').forEach((x) => { x.hidden = true; });
      const mark = (name, text) => { const p = viewEl.querySelector(`[data-for="${name}"]`); p.textContent = text; p.hidden = false; };
      const current = document.getElementById('cur').value;
      const next = document.getElementById('new1').value;
      if (next !== document.getElementById('new2').value) { mark('again', 'The two passwords are different.'); return; }
      const btn = document.getElementById('save');
      btn.disabled = true;
      try {
        await api('/api/auth/password', { method: 'PUT', body: { current, next } });
        toast('Password changed.');
        e.target.reset();
      } catch (err) {
        const fields = err.errors || {};
        if (fields.current) mark('current', fields.current);
        else if (fields.next) mark('next', fields.next);
        showError(err.message);
      }
      btn.disabled = false;
    });
  }

  window.Admin.crumbs(null, [{ label: 'My account' }]);
  render().catch((err) => {
    if (err.status === 404) { window.location.href = '/admin/'; return; } // the feature is switched off
    showError(err.message);
  });
})();
