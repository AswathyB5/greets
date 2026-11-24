// Blog articles: a list, and an editor to add / change / delete them.
//   #/                 the list
//   #/new              write a new article
//   #/edit/<address>   change an article
// Every save is published to the website by the server (unless AUTO_PUBLISH=false: then use "Publish to website").
(function () {
  const { api, esc, toast, formatDate } = window.Admin;

  const viewEl = document.getElementById('view');
  const headingEl = document.getElementById('heading');
  const introEl = document.getElementById('intro');
  const errorEl = document.getElementById('error');
  const noticeEl = document.getElementById('notice');
  const actionsEl = document.getElementById('head-actions');
  const crumbsEl = document.getElementById('crumbs');

  let dirty = false;
  let autoPublish = true;
  let pendingNotice = ''; // a message to show after the next screen is drawn
  let shownHash = location.hash;
  let reverting = false;

  const showError = (message) => { errorEl.textContent = message || ''; errorEl.hidden = !message; };
  const showNotice = (message) => { noticeEl.textContent = message || ''; noticeEl.hidden = !message; };

  function setHeader(trail, title, intro, actions) {
    window.Admin.crumbs(crumbsEl, trail);
    headingEl.textContent = title;
    introEl.textContent = intro || '';
    actionsEl.innerHTML = actions || '';
  }

  window.addEventListener('beforeunload', (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  // where a stored picture can be shown from, inside the admin
  function previewUrl(value) {
    const v = String(value || '').trim();
    if (!v) return '';
    if (/^https:\/\//i.test(v)) return v;
    if (v.startsWith('uploads/')) return '/' + v;
    return '/site/' + v.replace(/^\/+/, '');
  }

  const slugify = (s) => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '');

  // ---------- the list ----------
  async function showList() {
    dirty = false;
    showError('');
    showNotice(pendingNotice); pendingNotice = '';
    const data = await api('/api/blog');
    autoPublish = data.autoPublish;
    const posts = data.posts;
    setHeader([{ label: 'Blog articles' }], 'Blog articles',
      autoPublish ? 'Every change goes to the website by itself a moment after you save.' : 'Changes reach the website when you press "Publish to website".',
      `<a class="btn" href="#/new">+ New article</a>` +
      (autoPublish ? '' : ' <button type="button" class="btn secondary" id="publish-now">Publish to website</button>'));

    if (!posts.length) {
      viewEl.innerHTML = `
        <div class="empty">
          <p>No articles in the admin yet.</p>
          <p class="muted">The articles already on the website can be brought in here so you can edit them.</p>
          <p><button type="button" class="btn" id="import">Import the existing articles</button></p>
        </div>`;
    } else {
      viewEl.innerHTML = `
        <div class="table-wrap"><table>
          <thead><tr><th>Title</th><th>Status</th><th>Date</th><th>Page address</th><th></th></tr></thead>
          <tbody>${posts.map((p) => `
            <tr>
              <td><a href="#/edit/${esc(p.slug)}"><strong>${esc(p.title)}</strong></a></td>
              <td><span class="badge ${p.status === 'published' ? 'published' : ''}">${esc(p.status)}</span></td>
              <td>${esc(p.date || '')}</td>
              <td class="muted">/${esc(p.slug)}/</td>
              <td class="row-actions"><div class="btn-group">
                <a class="btn small secondary" href="#/edit/${esc(p.slug)}">Edit</a>
                <button type="button" class="btn small danger" data-delete="${esc(p.slug)}" data-title="${esc(p.title)}">Delete</button>
              </div></td>
            </tr>`).join('')}
          </tbody>
        </table></div>`;
    }

    const imp = document.getElementById('import');
    if (imp) imp.addEventListener('click', async () => {
      imp.disabled = true;
      try {
        const r = await api('/api/blog/import', { method: 'POST' });
        toast(r.added ? `${r.added} article${r.added === 1 ? '' : 's'} imported.` : 'Nothing new to import.');
        render();
      } catch (err) { showError(err.message); imp.disabled = false; }
    });
    const pub = document.getElementById('publish-now');
    if (pub) pub.addEventListener('click', async () => {
      pub.disabled = true;
      try { await api('/api/blog/publish', { method: 'POST' }); showNotice('Published to the website.'); } catch (err) { showError(err.message); }
      pub.disabled = false;
    });
    viewEl.querySelectorAll('[data-delete]').forEach((btn) => btn.addEventListener('click', async () => {
      if (!confirm(`Delete "${btn.dataset.title}"?\n\nThe article page is removed from the website. This cannot be undone.`)) return;
      btn.disabled = true;
      try {
        const r = await api('/api/blog/' + encodeURIComponent(btn.dataset.delete), { method: 'DELETE' });
        showNotice(resultText(r, 'Article deleted'));
        if (r.error) showError(r.error);
        render();
      } catch (err) { showError(err.message); btn.disabled = false; }
    }));
  }

  function resultText(r, what) {
    if (r.published) return `${what} and the website is updated.`;
    if (r.pending) return `${what}. Press "Publish to website" to put it live.`;
    return `${what}, but the website was not updated: ${r.error || 'unknown problem'}. Try again from the list.`;
  }

  // ---------- the editor ----------
  const EMPTY = { slug: '', status: 'draft', title: '', seoTitle: '', crumbTitle: '', description: '', excerpt: '', keywords: [], author: 'Greets',
    authorName: 'Pramod Kanse', authorTitle: 'Director', date: '', readMinutes: 5, image: '', imageAlt: '', ogImage: '', bodyHtml: '', faq: [] };

  const field = (name, label, control, hint) => `
    <div class="field" data-field="${name}">
      <label for="f-${name}">${label}</label>
      ${control}
      ${hint ? `<p class="hint">${hint}</p>` : ''}
      <p class="field-error" hidden></p>
    </div>`;

  const input = (name, value, attrs) => `<input id="f-${name}" name="${name}" value="${esc(value)}" ${attrs || ''}>`;

  function faqRow(f, i) {
    return `
      <div class="faq-row" data-faq="${i}" style="border:1px solid var(--line);border-radius:var(--radius-md);padding:10px;margin-bottom:10px">
        <label>Question</label>
        <input data-faq-q value="${esc(f.q || '')}">
        <label style="margin-top:8px">Answer</label>
        <textarea data-faq-a rows="3">${esc(f.a || '')}</textarea>
        <p style="margin:8px 0 0"><button type="button" class="btn small secondary" data-faq-remove>Remove this question</button></p>
      </div>`;
  }

  async function showEditor(slug) {
    showError('');
    showNotice(pendingNotice); pendingNotice = '';
    let post = { ...EMPTY };
    const isNew = !slug;
    if (!isNew) post = (await api('/api/blog/' + encodeURIComponent(slug))).post;
    dirty = false;

    setHeader([{ label: 'Blog articles', href: '#/' }, { label: isNew ? 'New article' : post.title }], isNew ? 'New article' : 'Edit article', '');
    const url = (p) => previewUrl(p);

    viewEl.innerHTML = `
      <form id="blog-form" novalidate>
        <div class="form-grid">
          ${field('title', 'Title', input('title', post.title, 'maxlength="200" required'), 'The big heading of the article, also the title on the blog list.')}
          ${field('slug', 'Page address', isNew
            ? input('slug', post.slug, 'maxlength="80" placeholder="auto from the title"')
            : input('slug', post.slug, 'readonly style="background:var(--paper)"'),
            isNew ? 'Lower-case letters, numbers and dashes. The article will be at greetsequipment.com/<b>this-address</b>/. It cannot be changed later.' : 'The address cannot be changed after the article is created (it would break links).')}
          ${field('status', 'Status', `<select id="f-status" name="status"><option value="draft"${post.status !== 'published' ? ' selected' : ''}>Draft (not on the website)</option><option value="published"${post.status === 'published' ? ' selected' : ''}>Published (live on the website)</option></select>`)}
          ${field('date', 'Date', input('date', post.date, 'type="date"'), 'Shown under the title. Empty = today.')}
          ${field('author', 'Author (shown)', input('author', post.author, 'maxlength="80"'))}
          ${field('readMinutes', 'Reading time (minutes)', input('readMinutes', post.readMinutes, 'type="number" min="1" max="120"'))}

          <div class="full">
            <label>Main picture</label>
            <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">
              <img id="img-preview" alt="" ${post.image ? `src="${esc(url(post.image))}"` : 'hidden'} style="width:180px;max-height:120px;object-fit:cover;border:1px solid var(--line);border-radius:var(--radius-md)">
              <div style="flex:1 1 260px">
                <input id="f-image" name="image" value="${esc(post.image)}" placeholder="assets/blog/my-picture.png, or upload below">
                <p style="margin:8px 0 0"><label class="btn secondary small upload-btn" style="display:inline-block;margin:0">Upload a picture<input type="file" id="img-file" accept="image/png,image/jpeg,image/gif,image/webp" hidden></label>
                <span class="hint" id="img-msg"></span></p>
                <p class="field-error" hidden data-for="image"></p>
              </div>
            </div>
          </div>
          ${field('imageAlt', 'Picture description (alt text)', input('imageAlt', post.imageAlt, 'maxlength="250"'), 'Describes the picture for people who cannot see it, and for Google.')}
          ${field('excerpt', 'Short summary (blog list)', `<textarea id="f-excerpt" name="excerpt" rows="3" maxlength="400">${esc(post.excerpt)}</textarea>`, 'Two sentences shown on the card in the blog list.')}

          <div class="full"><label>Article text</label>
            <div id="rt-host"></div>
            <p class="hint">Use the toolbar for headings, colours, links, tables and pictures. Pasted text arrives as plain text. Scripts and unsafe formatting are removed when you save.</p>
            <p class="field-error" hidden data-for="bodyHtml"></p>
          </div>

          <div class="full"><label>Frequently asked questions</label>
            <p class="hint" style="margin-top:0">Shown at the end of the article and given to Google. Optional.</p>
            <div id="faq-list">${(post.faq || []).map(faqRow).join('')}</div>
            <p><button type="button" class="btn small secondary" id="faq-add">+ Add a question</button></p>
            <p class="field-error" hidden data-for="faq"></p>
          </div>

          <div class="full"><details ${isNew ? '' : ''}><summary style="cursor:pointer;font-weight:600">Search engines (Google) &amp; link previews</summary>
            <div class="form-grid" style="margin-top:12px">
              ${field('seoTitle', 'Google title', input('seoTitle', post.seoTitle, 'maxlength="200"'), 'The blue title in Google. Empty = the article title. About 60 characters works best.')}
              ${field('crumbTitle', 'Short title for the breadcrumb', input('crumbTitle', post.crumbTitle, 'maxlength="120"'), 'Empty = the article title.')}
              <div class="full">${field('description', 'Google description', `<textarea id="f-description" name="description" rows="3" maxlength="400">${esc(post.description)}</textarea>`, 'The grey text under the title in Google. About 150 characters works best.')}</div>
              ${field('keywords', 'Keywords', input('keywords', (post.keywords || []).join(', ')), 'Separated by commas.')}
              ${field('ogImage', 'Link-preview picture', input('ogImage', post.ogImage, 'placeholder="empty = the main picture"'), 'The picture shown when the link is shared.')}
              ${field('authorName', 'Author name (for Google)', input('authorName', post.authorName))}
              ${field('authorTitle', 'Author job title (for Google)', input('authorTitle', post.authorTitle))}
            </div>
          </details></div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn" id="save">${isNew ? 'Create article' : 'Save changes'}</button>
          <a class="btn secondary" href="#/">Cancel</a>
          ${isNew ? '' : '<button type="button" class="btn danger" id="delete" style="margin-left:auto">Delete article</button>'}
        </div>
      </form>`;

    const form = document.getElementById('blog-form');
    let slugTouched = false;

    form.addEventListener('input', () => { dirty = true; });

    // the address follows the title until it is typed by hand
    if (isNew) {
      const t = form.elements.title; const s = form.elements.slug;
      s.addEventListener('input', () => { slugTouched = true; });
      t.addEventListener('input', () => { if (!slugTouched) s.value = slugify(t.value); });
    }

    // ----- picture -----
    const imgInput = form.elements.image;
    const preview = document.getElementById('img-preview');
    const showPreview = () => { const u = previewUrl(imgInput.value); preview.hidden = !u; if (u) preview.src = u; };
    imgInput.addEventListener('input', showPreview);
    document.getElementById('img-file').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const msg = document.getElementById('img-msg');
      msg.textContent = ' Uploading...';
      try {
        const data = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(file); });
        const { path } = await api('/api/content/upload', { method: 'POST', body: { data } });
        imgInput.value = path;
        dirty = true;
        showPreview();
        msg.textContent = ' Uploaded.';
      } catch (err) { msg.textContent = ' ' + err.message; }
      e.target.value = '';
    });

    // ----- text editor (views/admin/blog-editor.js) -----
    const rte = window.BlogEditor.mount(document.getElementById('rt-host'), post.bodyHtml, {
      onChange: () => { dirty = true; },
      upload: async (file) => {
        const data = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(file); });
        return (await api('/api/content/upload', { method: 'POST', body: { data } })).path;
      },
    });

    // ----- questions -----
    const faqList = document.getElementById('faq-list');
    document.getElementById('faq-add').addEventListener('click', () => { faqList.insertAdjacentHTML('beforeend', faqRow({}, faqList.children.length)); dirty = true; });
    faqList.addEventListener('click', (e) => { const b = e.target.closest('[data-faq-remove]'); if (b) { b.closest('.faq-row').remove(); dirty = true; } });

    // ----- save -----
    function collect() {
      const v = (n) => (form.elements[n] ? form.elements[n].value : '');
      return {
        title: v('title'), slug: v('slug'), status: v('status'), date: v('date'), author: v('author'), readMinutes: v('readMinutes'),
        image: v('image'), imageAlt: v('imageAlt'), excerpt: v('excerpt'),
        bodyHtml: rte.getHtml(),
        faq: [...faqList.querySelectorAll('.faq-row')].map((r) => ({ q: r.querySelector('[data-faq-q]').value, a: r.querySelector('[data-faq-a]').value })),
        seoTitle: v('seoTitle'), crumbTitle: v('crumbTitle'), description: v('description'), keywords: v('keywords'), ogImage: v('ogImage'),
        authorName: v('authorName'), authorTitle: v('authorTitle'),
      };
    }

    function showFieldErrors(errors) {
      form.querySelectorAll('.field').forEach((f) => { f.classList.remove('invalid'); const p = f.querySelector('.field-error'); if (p) { p.hidden = true; p.textContent = ''; } });
      form.querySelectorAll('[data-for]').forEach((p) => { p.hidden = true; });
      let first = null;
      for (const [name, message] of Object.entries(errors || {})) {
        const f = form.querySelector(`[data-field="${name}"]`);
        const p = f ? f.querySelector('.field-error') : form.querySelector(`[data-for="${name}"]`);
        if (f) f.classList.add('invalid');
        if (p) { p.textContent = message; p.hidden = false; first = first || p; }
      }
      if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('save');
      btn.disabled = true;
      showError('');
      showFieldErrors({});
      const data = collect();
      try {
        const r = isNew
          ? await api('/api/blog', { method: 'POST', body: data })
          : await api('/api/blog/' + encodeURIComponent(slug), { method: 'PUT', body: data });
        dirty = false;
        const text = resultText(r, isNew ? 'Article created' : 'Saved');
        if (isNew) { pendingNotice = text; location.hash = '#/edit/' + r.post.slug; return; }
        if (r.error) showError(text); else showNotice(text);
        btn.disabled = false;
      } catch (err) {
        showError(err.message);
        showFieldErrors(err.errors);
        btn.disabled = false;
      }
    });

    const del = document.getElementById('delete');
    if (del) del.addEventListener('click', async () => {
      if (!confirm(`Delete "${post.title}"?\n\nThe article page is removed from the website. This cannot be undone.`)) return;
      try {
        const r = await api('/api/blog/' + encodeURIComponent(slug), { method: 'DELETE' });
        dirty = false;
        pendingNotice = resultText(r, 'Article deleted');
        location.hash = '#/';
      } catch (err) { showError(err.message); }
    });
  }

  // ---------- routing ----------
  async function render() {
    const hash = location.hash.replace(/^#\/?/, '');
    try {
      if (hash === 'new') await showEditor(null);
      else if (hash.startsWith('edit/')) await showEditor(decodeURIComponent(hash.slice(5)));
      else await showList();
    } catch (err) {
      showError(err.message);
      viewEl.innerHTML = '';
    }
  }

  window.addEventListener('hashchange', () => {
    if (reverting) { reverting = false; return; }
    if (dirty && !confirm('You have unsaved changes. Leave without saving?')) { reverting = true; location.hash = shownHash; return; }
    dirty = false;
    shownHash = location.hash;
    render();
  });
  render();
})();
