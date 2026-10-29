// Products: brands -> families -> products, with add / edit / delete / reorder. Changes publish themselves.
//   #/                                   the three brands
//   #/brand/<b>                          families of a brand
//   #/brand/<b>/edit                     edit the brand's details
//   #/brand/<b>/family/new               add a family
//   #/brand/<b>/family/<f>               products of a family
//   #/brand/<b>/family/<f>/edit          edit a family
//   #/brand/<b>/product/new?family=<f>   add a product
//   #/brand/<b>/product/<p>              edit a product
(function () {
  const { api, esc, toast, formatDate } = window.Admin;
  const Form = window.CatalogForm;

  const viewEl = document.getElementById('view');
  const crumbsEl = document.getElementById('crumbs');
  const headingEl = document.getElementById('heading');
  const introEl = document.getElementById('intro');
  const errorEl = document.getElementById('error');
  const actionsEl = document.getElementById('head-actions');
  const publishEl = document.getElementById('publish-bar');

  let schema = null;
  let formDirty = false;      // a form on screen has unsaved edits
  let shownHash = location.hash;
  let reverting = false;

  const ICONS = {
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    up: '<path d="M18 15l-6-6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    open: '<path d="M9 18l6-6-6-6"/>',
  };
  function iconBtn(kind, label, attrs, cls) {
    return `<button type="button" class="btn small icon-btn ${cls || 'secondary'}" ${attrs} title="${esc(label)}" aria-label="${esc(label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[kind]}</svg></button>`;
  }

  const statusBadge = (status, attrs) => `<button type="button" class="badge-btn ${status === 'published' ? 'published' : 'draft'}" ${attrs} title="Click to change">${status === 'published' ? 'Published' : 'Draft'}</button>`;

  function showError(message) {
    errorEl.textContent = message || '';
    errorEl.hidden = !message;
  }

  function setHeader(crumbs, title, intro, actions) {
    Admin.crumbs(crumbsEl, crumbs);
    headingEl.textContent = title;
    introEl.textContent = intro || '';
    actionsEl.innerHTML = actions || '';
  }

  const brandName = (id, tree) => ((tree.brands.find((b) => b.id === id) || {}).name) || id;

  // ---------- publish bar ----------
  // Every change goes live by itself (the server publishes a moment after each save). This bar shows where it is:
  // "Publishing...", "Live", or what went wrong with a "Try again". With AUTO_PUBLISH=false in .env it shows the
  // old "Publish to website" button instead.
  let navSignature = null;
  let barTimer = null;
  let wasWorking = false;
  async function refreshPublishBar() {
    clearTimeout(barTimer);
    try {
      const st = await api('/api/catalog/state');
      // something was added, changed, deleted or published: redraw the Products list in the sidebar
      const signature = `${st.changedAt || ''}|${st.publishedAt || ''}`;
      if (signature !== navSignature) { navSignature = signature; if (window.Admin.refreshNav) window.Admin.refreshNav(); }

      if (st.auto) {
        const working = st.publishing || (st.dirty && !st.lastError);
        if (working) {
          wasWorking = true;
          publishEl.className = 'publish-bar working';
          publishEl.innerHTML = '<span><span class="spinner" aria-hidden="true"></span><strong>Putting your change on the website...</strong> It only takes a moment.</span>';
          barTimer = setTimeout(refreshPublishBar, 1000);
        } else if (st.lastError && st.dirty) {
          wasWorking = false;
          publishEl.className = 'publish-bar failed';
          publishEl.innerHTML = `<span><strong>Saved, but it is not on the website yet.</strong> ${esc(st.lastError.message)}</span><button type="button" class="btn" data-retry>Try again</button>`;
        } else {
          publishEl.className = 'publish-bar live';
          publishEl.innerHTML = `<span>${st.publishedAt ? `<strong>Live on the website.</strong> Last updated ${esc(formatDate(st.publishedAt))}.` : 'Nothing to publish yet.'}</span>`;
          if (wasWorking) { wasWorking = false; toast('Live on the website.'); }
        }
        return;
      }

      publishEl.className = `publish-bar${st.dirty ? ' dirty' : ''}`;
      publishEl.innerHTML = st.dirty
        ? `<span><strong>Saved, but not on the website yet.</strong> Visitors still see the old products until you press Publish.</span><button type="button" class="btn" data-publish>Publish to website</button>`
        : `<span>${st.publishedAt ? `Everything is live on the website. Last published ${esc(formatDate(st.publishedAt))}.` : 'Nothing to publish.'}</span>`;
    } catch (err) { /* the bar is optional */ }
  }

  publishEl.addEventListener('click', async (e) => {
    const retry = e.target.closest('[data-retry]');
    const btn = retry || e.target.closest('[data-publish]');
    if (!btn) return;
    if (!retry) {
      if (formDirty && !confirm('You have unsaved edits on this screen. Publish without them?')) return;
      if (!confirm('Publish the product changes to the website?\n\nThis updates the product data, every brand, family and product page, the sitemap and the home page product cards.')) return;
    }
    btn.disabled = true;
    btn.textContent = 'Publishing...';
    showError('');
    try {
      await api('/api/catalog/publish', { method: 'POST' });
      if (!retry) toast('Published.');
    } catch (err) {
      showError(`Publishing failed. The website was left as it was. ${err.message}`);
    }
    await refreshPublishBar();
  });

  // ---------- data ----------
  async function loadSchema() {
    if (!schema) schema = await api('/api/catalog/schema');
    return schema;
  }

  // ---------- overview: brands ----------
  // The 12 industries: their names appear in the product finder, in the Industries tags of every product and in the
  // industry menus. (The id of each one is fixed; only the words change.)
  async function showIndustries() {
    setHeader([{ label: 'Products', href: '#/' }, { label: 'Industries' }], 'Industries', 'The sectors your machines are sold into. Their names are used in the product finder, in the "Industries" tags of the products and in the industry menus of every page.');
    const { items } = await api('/api/catalog/industries');
    viewEl.innerHTML = `
      <form id="ind-form" novalidate>
        <div class="table-wrap"><table>
          <thead><tr><th style="width:34%">Name</th><th>One-line description</th></tr></thead>
          <tbody>${items.map((i) => `
            <tr data-ind-row="${esc(i.id)}">
              <td><input type="text" data-ind-name value="${esc(i.name)}" maxlength="120" aria-label="Name of ${esc(i.name)}"><p class="field-error" hidden></p></td>
              <td><input type="text" data-ind-desc value="${esc(i.desc)}" maxlength="300" aria-label="Description of ${esc(i.name)}"></td>
            </tr>`).join('')}
          </tbody>
        </table></div>
        <div class="save-bar form-save-bar">
          <span class="muted" id="ind-state">No unsaved changes</span>
          <a class="btn secondary" href="#/">Cancel</a>
          <button class="btn" type="submit" id="ind-save">Save industries</button>
        </div>
      </form>`;
    const form = document.getElementById('ind-form');
    form.addEventListener('input', () => { formDirty = true; document.getElementById('ind-state').textContent = 'Unsaved changes'; });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      showError('');
      form.querySelectorAll('.field-error').forEach((x) => { x.hidden = true; });
      const body = { items: [...form.querySelectorAll('[data-ind-row]')].map((r) => ({ id: r.dataset.indRow, name: r.querySelector('[data-ind-name]').value, desc: r.querySelector('[data-ind-desc]').value })) };
      try {
        await api('/api/catalog/industries', { method: 'PUT', body });
        formDirty = false;
        toast('Saved. It is going live on the website.');
        await refreshPublishBar();
        location.hash = '#/';
      } catch (err) {
        Object.entries(err.errors || {}).forEach(([id, text]) => {
          const p = form.querySelector(`[data-ind-row="${id}"] .field-error`);
          if (p) { p.textContent = text; p.hidden = false; }
        });
        showError(err.message);
      }
    });
  }

  async function showBrands() {
    setHeader([{ label: 'Products' }], 'Products', 'Choose a brand to manage its families and products. Every change goes live on the website by itself when you save.',
      '<a class="btn secondary" href="#/industries">Edit industries</a>');
    const tree = await api('/api/catalog/tree');
    viewEl.innerHTML = `
      <div class="brand-cards">${tree.brands.map((b) => `
        <a class="brand-card" href="#/brand/${esc(b.id)}">
          ${Form.thumb(b.photo)}
          <div>
            <h2>${esc(b.name)}</h2>
            <p class="muted">${esc(b.full)}${b.country ? ` &middot; ${esc(b.country)}` : ''}</p>
            <p><strong>${b.families.length}</strong> families &middot; <strong>${b.productCount}</strong> products <span class="muted">(${b.publishedCount} published)</span></p>
          </div>
          <span class="btn small">Open</span>
        </a>`).join('')}</div>`;
  }

  // ---------- families of a brand ----------
  async function showFamilies(brandId) {
    const tree = await api('/api/catalog/tree');
    const brand = tree.brands.find((b) => b.id === brandId);
    if (!brand) throw Object.assign(new Error('Brand not found.'), { status: 404 });
    setHeader(
      [{ label: 'Products', href: '#/' }, { label: brand.name }],
      brand.name,
      `${brand.families.length} families, ${brand.productCount} products.`,
      `<a class="btn secondary" href="#/brand/${esc(brandId)}/edit">Edit brand details</a><a class="btn" href="#/brand/${esc(brandId)}/family/new">+ Add family</a>`
    );
    viewEl.innerHTML = brand.families.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th></th><th>Family</th><th>Products</th><th>Status</th><th class="row-actions">Actions</th></tr></thead>
        <tbody>${brand.families.map((f, i) => `
          <tr data-id="${esc(f.id)}">
            <td class="thumb-cell">${Form.thumb(f.photo)}</td>
            <td><a href="#/brand/${esc(brandId)}/family/${esc(f.id)}"><strong>${esc(f.name)}</strong></a><div class="muted">${esc(f.sub)}</div></td>
            <td>${f.productCount}</td>
            <td>${statusBadge(f.status, `data-family-status="${esc(f.id)}"`)}</td>
            <td class="row-actions"><div class="btn-group">
              <a class="btn small secondary" href="#/brand/${esc(brandId)}/family/${esc(f.id)}">Products</a>
              <div class="act-grid">
              ${iconBtn('up', 'Move up', `data-family-move="${esc(f.id)}" data-dir="-1"${i === 0 ? ' disabled' : ''}`)}
              <a class="btn small icon-btn" href="#/brand/${esc(brandId)}/family/${esc(f.id)}/edit" title="Edit family" aria-label="Edit family"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.edit}</svg></a>
              ${iconBtn('down', 'Move down', `data-family-move="${esc(f.id)}" data-dir="1"${i === brand.families.length - 1 ? ' disabled' : ''}`)}
              ${iconBtn('trash', 'Delete family', `data-family-delete="${esc(f.id)}" data-name="${esc(f.name)}" data-count="${f.productCount}"`, 'danger')}
              </div>
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table></div>` : '<p class="empty">No families yet. Use "Add family" to create the first one.</p>';
    viewEl.dataset.brand = brandId;
    viewEl._families = brand.families;
  }

  // ---------- products of a family ----------
  async function showProducts(brandId, familyId) {
    const [tree, data] = await Promise.all([api('/api/catalog/tree'), api(`/api/catalog/brands/${brandId}/families/${familyId}`)]);
    const name = brandName(brandId, tree);
    const fam = data.family.data;
    setHeader(
      [{ label: 'Products', href: '#/' }, { label: name, href: `#/brand/${brandId}` }, { label: fam.name || familyId }],
      fam.name || familyId,
      fam.sub || '',
      `<a class="btn secondary" href="#/brand/${esc(brandId)}/family/${esc(familyId)}/edit">Edit family details</a><a class="btn" href="#/brand/${esc(brandId)}/product/new?family=${esc(familyId)}">+ Add product</a>`
    );
    viewEl.innerHTML = data.products.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th></th><th>Product</th><th>Summary</th><th>Status</th><th class="row-actions">Actions</th></tr></thead>
        <tbody>${data.products.map((p, i) => `
          <tr data-id="${esc(p.id)}">
            <td class="thumb-cell">${Form.thumb(p.photo)}</td>
            <td><a href="#/brand/${esc(brandId)}/product/${esc(p.id)}"><strong>${esc(p.name)}</strong></a>${p.tag ? ` <span class="muted">${esc(p.tag)}</span>` : ''}</td>
            <td class="muted">${esc(p.short)}</td>
            <td>${statusBadge(p.status, `data-product-status="${esc(p.id)}"`)}</td>
            <td class="row-actions"><div class="act-grid">
              ${iconBtn('up', 'Move up', `data-product-move="${esc(p.id)}" data-dir="-1"${i === 0 ? ' disabled' : ''}`)}
              <a class="btn small icon-btn" href="#/brand/${esc(brandId)}/product/${esc(p.id)}" title="Edit product" aria-label="Edit product"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.edit}</svg></a>
              ${iconBtn('down', 'Move down', `data-product-move="${esc(p.id)}" data-dir="1"${i === data.products.length - 1 ? ' disabled' : ''}`)}
              ${iconBtn('trash', 'Delete product', `data-product-delete="${esc(p.id)}" data-name="${esc(p.name)}"`, 'danger')}
            </div></td>
          </tr>`).join('')}
        </tbody>
      </table></div>` : '<p class="empty">This family has no products yet. Use "Add product" to create the first one.</p>';
    viewEl.dataset.brand = brandId;
    viewEl.dataset.family = familyId;
    viewEl._products = data.products;
  }

  // ---------- forms: brand / family / product ----------
  // the web address name is made from the name automatically and never shown
  function idBox() {
    return '';
  }
  function idBoxUnused(value, editable) {
    return `
      <div class="cf-field cf-id" data-meta="id">
        <label class="cf-label">Web address name</label>
        ${editable
    ? `<input type="text" id="meta-id" value="${esc(value)}" placeholder="filled in from the name">`
    : `<input type="text" value="${esc(value)}" readonly>`}
        <p class="hint">${editable ? 'Part of the page address, e.g. bmi/<b>this-name</b>/. Lowercase letters, numbers and hyphens. Cannot be changed later.' : 'Part of the page address. It cannot be changed after the product is created.'}</p>
        <p class="field-error" hidden></p>
      </div>`;
  }

  function statusBox(status) {
    return `
      <div class="cf-field" data-meta="status">
        <label class="cf-label">Visibility on the website</label>
        <select id="meta-status">
          <option value="published"${status === 'published' ? ' selected' : ''}>Published (shown on the website)</option>
          <option value="draft"${status === 'draft' ? ' selected' : ''}>Draft (hidden from the website)</option>
        </select>
      </div>`;
  }

  // Shows a form, wires Save / Cancel, and returns when saved.
  function mountForm({ entity, sections, data, topHtml, saveLabel, onSave, backHref, readExtra, afterRender }) {
    viewEl.innerHTML = `
      <form id="cf" novalidate>
        <div class="cf-top">${topHtml || ''}</div>
        <div class="cf-layout">
          <div class="cf-main">${Form.render(sections, data, schema)}</div>
          <aside class="cf-side">${Form.sideHtml(entity, sections)}</aside>
        </div>
        <div class="save-bar form-save-bar">
          <span class="muted" id="cf-state">No unsaved changes</span>
          <a class="btn secondary" href="${backHref}" id="cf-cancel">Cancel</a>
          <button class="btn" type="submit" id="cf-save">${esc(saveLabel)}</button>
        </div>
      </form>`;
    const form = document.getElementById('cf');
    formDirty = false;
    const stateEl = document.getElementById('cf-state');
    const mark = () => { formDirty = true; stateEl.textContent = 'Unsaved changes'; };
    Form.bind(form, sections, schema, mark);
    Form.bindGuide(form, sections);
    form.querySelector('.cf-top').addEventListener('input', mark);
    form.querySelector('.cf-top').addEventListener('change', mark);
    if (afterRender) afterRender(form);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      showError('');
      Form.clearErrors(form);
      form.querySelectorAll('.cf-top .field-error').forEach((x) => { x.hidden = true; });
      const btn = document.getElementById('cf-save');
      btn.disabled = true;
      try {
        await onSave(Form.collect(form, sections), readExtra ? readExtra(form) : {});
        formDirty = false;
      } catch (err) {
        const errors = err.errors || {};
        const shown = Form.showErrors(form, errors);
        // errors for the boxes above the sections (family, address name)
        Object.entries(errors).forEach(([key, message]) => {
          const meta = form.querySelector(`.cf-top [data-meta="${key === 'familyId' ? 'family' : key}"]`);
          if (meta) { const box = meta.querySelector('.field-error'); box.textContent = message; box.hidden = false; }
        });
        showError(shown || Object.keys(errors).length ? 'Please check the highlighted fields.' : err.message);
        btn.disabled = false;
      }
    });
  }

  async function showBrandForm(brandId) {
    await loadSchema();
    const { brand } = await api(`/api/catalog/brands/${brandId}`);
    const name = brand.data.name || brandId;
    setHeader([{ label: 'Products', href: '#/' }, { label: name, href: `#/brand/${brandId}` }, { label: 'Edit details' }], `Edit ${name}`, 'These details appear on the brand page and in search results.');
    mountForm({
      entity: 'brand', sections: schema.sections.brand, data: brand.data, saveLabel: 'Save brand', backHref: `#/brand/${brandId}`,
      onSave: async (data) => {
        await api(`/api/catalog/brands/${brandId}`, { method: 'PUT', body: { data } });
        toast('Brand saved.');
        await refreshPublishBar();
        location.hash = `#/brand/${brandId}`;
      },
    });
  }

  async function showFamilyForm(brandId, familyId) {
    await loadSchema();
    const tree = await api('/api/catalog/tree');
    const isNew = !familyId;
    const fam = isNew ? { data: {}, status: 'published' } : (await api(`/api/catalog/brands/${brandId}/families/${familyId}`)).family;
    const title = isNew ? 'Add a family' : `Edit ${fam.data.name || familyId}`;
    setHeader(
      [{ label: 'Products', href: '#/' }, { label: brandName(brandId, tree), href: `#/brand/${brandId}` }, { label: isNew ? 'New family' : (fam.data.name || familyId) }],
      title, 'A family groups similar products, for example "Gas quenching furnaces".'
    );
    const back = isNew ? `#/brand/${brandId}` : `#/brand/${brandId}/family/${familyId}`;
    mountForm({
      entity: 'family', sections: schema.sections.family, data: fam.data, saveLabel: isNew ? 'Create family' : 'Save family', backHref: back,
      topHtml: idBox(isNew ? '' : familyId, isNew) + statusBox(fam.status),
      readExtra: () => ({ id: (document.getElementById('meta-id') || {}).value, status: document.getElementById('meta-status').value }),
      onSave: async (data, extra) => {
        if (isNew) {
          const body = { data, status: extra.status };
          if (extra.id && extra.id.trim()) body.id = extra.id.trim();
          const { family } = await api(`/api/catalog/brands/${brandId}/families`, { method: 'POST', body });
          toast('Family created.');
          await refreshPublishBar();
          location.hash = `#/brand/${brandId}/family/${family.id}`;
        } else {
          await api(`/api/catalog/brands/${brandId}/families/${familyId}`, { method: 'PUT', body: { data, status: extra.status } });
          toast('Family saved.');
          await refreshPublishBar();
          location.hash = back;
        }
      },
    });
  }

  async function showProductForm(brandId, productId, presetFamily) {
    await loadSchema();
    const tree = await api('/api/catalog/tree');
    const isNew = !productId;
    let product = { data: {}, status: 'published', familyId: presetFamily };
    let families;
    if (isNew) {
      families = (tree.brands.find((b) => b.id === brandId) || { families: [] }).families;
      if (!product.familyId && families[0]) product.familyId = families[0].id;
    } else {
      const res = await api(`/api/catalog/brands/${brandId}/products/${productId}`);
      product = res.product;
      families = res.families;
    }
    const back = product.familyId ? `#/brand/${brandId}/family/${product.familyId}` : `#/brand/${brandId}`;
    setHeader(
      [{ label: 'Products', href: '#/' }, { label: brandName(brandId, tree), href: `#/brand/${brandId}` }, { label: isNew ? 'New product' : (product.data.name || productId) }],
      isNew ? 'Add a product' : `Edit ${product.data.name || productId}`,
      'Fill in the sections below. Only the product name is required. Open a section to edit it.'
    );
    const familySelect = `
      <div class="cf-field" data-meta="family">
        <label class="cf-label">Family <span class="req">*</span></label>
        <select id="meta-family">${families.map((f) => `<option value="${esc(f.id)}"${f.id === product.familyId ? ' selected' : ''}>${esc(f.name)}</option>`).join('')}</select>
        <p class="field-error" hidden></p>
      </div>`;
    mountForm({
      entity: 'product', sections: schema.sections.product, data: product.data, saveLabel: isNew ? 'Create product' : 'Save product', backHref: back,
      topHtml: familySelect + idBox(isNew ? '' : productId, isNew) + statusBox(product.status),
      readExtra: () => ({ id: (document.getElementById('meta-id') || {}).value, familyId: document.getElementById('meta-family').value, status: document.getElementById('meta-status').value }),
      onSave: async (data, extra) => {
        if (isNew) {
          const body = { data, status: extra.status, familyId: extra.familyId };
          if (extra.id && extra.id.trim()) body.id = extra.id.trim();
          await api(`/api/catalog/brands/${brandId}/products`, { method: 'POST', body });
          toast('Product created. It is going live on the website.');
        } else {
          await api(`/api/catalog/brands/${brandId}/products/${productId}`, { method: 'PUT', body: { data, status: extra.status, familyId: extra.familyId } });
          toast('Saved. It is going live on the website.');
        }
        await refreshPublishBar();
        location.hash = `#/brand/${brandId}/family/${extra.familyId}`;
      },
    });
  }

  // ---------- list actions (delegated) ----------
  // One list action at a time: a double click must not delete / copy / reorder twice from an old list.
  let acting = false;
  async function act(request, message) {
    acting = true;
    viewEl.classList.add('busy');
    showError('');
    try {
      await request();
      toast(message);
      await refreshPublishBar();
      await route(true);
    } catch (err) {
      await route(true); // show what is really in the database now
      showError(err.message);
    } finally {
      acting = false;
      viewEl.classList.remove('busy');
    }
  }

  viewEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn || btn.disabled || acting) return;
    const brand = viewEl.dataset.brand;
    const d = btn.dataset;
    if (d.familyStatus) {
      const fam = viewEl._families.find((f) => f.id === d.familyStatus);
      const next = fam.status === 'published' ? 'draft' : 'published';
      act(() => api(`/api/catalog/brands/${brand}/families/${fam.id}`, { method: 'PUT', body: { status: next } }), next === 'draft' ? 'Family set to draft: hidden from the website.' : 'Family published.');
    } else if (d.familyMove) {
      const ids = viewEl._families.map((f) => f.id);
      const i = ids.indexOf(d.familyMove);
      const j = i + Number(d.dir);
      [ids[i], ids[j]] = [ids[j], ids[i]];
      act(() => api(`/api/catalog/brands/${brand}/families-order`, { method: 'PUT', body: { ids } }), 'Order saved.');
    } else if (d.familyDelete) {
      const n = Number(d.count);
      const text = n
        ? `Delete the family "${d.name}" and its ${n} product${n === 1 ? '' : 's'}?\n\nThey disappear from the website. This cannot be undone.`
        : `Delete the family "${d.name}"?\n\nThis cannot be undone.`;
      if (!confirm(text)) return;
      act(() => api(`/api/catalog/brands/${brand}/families/${d.familyDelete}?deleteProducts=1`, { method: 'DELETE' }), 'Family deleted.');
    } else if (d.productStatus) {
      const p = viewEl._products.find((x) => x.id === d.productStatus);
      const next = p.status === 'published' ? 'draft' : 'published';
      act(() => api(`/api/catalog/brands/${brand}/products/${p.id}`, { method: 'PUT', body: { status: next } }), next === 'draft' ? 'Product set to draft: hidden from the website.' : 'Product published.');
    } else if (d.productMove) {
      const ids = viewEl._products.map((p) => p.id);
      const i = ids.indexOf(d.productMove);
      const j = i + Number(d.dir);
      [ids[i], ids[j]] = [ids[j], ids[i]];
      act(() => api(`/api/catalog/brands/${brand}/families/${viewEl.dataset.family}/products-order`, { method: 'PUT', body: { ids } }), 'Order saved.');
    } else if (d.productDelete) {
      if (!confirm(`Delete the product "${d.name}"?\n\nIt disappears from the website. This cannot be undone.`)) return;
      act(() => api(`/api/catalog/brands/${brand}/products/${d.productDelete}`, { method: 'DELETE' }), 'Product deleted.');
    }
  });

  // ---------- routing ----------
  async function route(silent) {
    showError('');
    const [path, query] = location.hash.replace(/^#\/?/, '').split('?');
    const p = path.split('/').filter(Boolean).map(decodeURIComponent);
    const params = new URLSearchParams(query || '');
    try {
      if (!silent) viewEl.innerHTML = '<p class="empty">Loading...</p>';
      if (p[0] === 'industries') await showIndustries();
      else if (p[0] !== 'brand') await showBrands();
      else if (p[2] === 'edit') await showBrandForm(p[1]);
      else if (p[2] === 'family' && p[3] === 'new') await showFamilyForm(p[1], null);
      else if (p[2] === 'family' && p[4] === 'edit') await showFamilyForm(p[1], p[3]);
      else if (p[2] === 'family' && p[3]) await showProducts(p[1], p[3]);
      else if (p[2] === 'product' && p[3] === 'new') await showProductForm(p[1], null, params.get('family'));
      else if (p[2] === 'product' && p[3]) await showProductForm(p[1], p[3]);
      else await showFamilies(p[1]);
    } catch (err) {
      viewEl.innerHTML = '<p><a class="btn secondary" href="#/">Back to products</a></p>';
      showError(err.status === 404 ? 'That item no longer exists.' : err.message);
    }
    refreshPublishBar();
  }

  window.addEventListener('hashchange', () => {
    if (reverting) { reverting = false; return; }
    if (formDirty && !confirm('You have unsaved changes. Leave without saving?')) {
      reverting = true;
      location.hash = shownHash;
      return;
    }
    formDirty = false;
    shownHash = location.hash;
    route();
  });
  window.addEventListener('beforeunload', (e) => {
    if (formDirty) { e.preventDefault(); e.returnValue = ''; }
  });

  route();
})();
