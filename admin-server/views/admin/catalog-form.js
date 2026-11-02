// Form engine for the product catalogue. It draws the fields described by the server
// (GET /api/catalog/schema), reads them back, shows server errors, and provides the
// picture library / upload. Used by products.js.
(function () {
  const { api, esc, toast } = window.Admin;

  // ---------- small helpers ----------
  function humanize(key) {
    return String(key).replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());
  }

  // Turns a site path (assets/x.jpg, uploads/y.png) into something this admin page can display.
  function previewUrl(path) {
    if (!path) return '';
    path = path.replace(/^https?:\/\/(www\.)?greetsequipment\.com\//i, ''); // the live address of a site picture: use the site's own copy
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('uploads/')) return '/' + path;
    return '/site/' + path;
  }

  const thumb = (path) => `<div class="img-preview">${path ? `<img src="${esc(previewUrl(path))}" alt="" onerror="this.parentNode.classList.add('broken')">` : ''}<span>No picture</span></div>`;

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read the file.'));
      reader.readAsDataURL(file);
    });
  }

  async function uploadPicture(file) {
    if (file.size > 5 * 1024 * 1024) throw new Error('That picture is larger than 5 MB.');
    const data = await readFile(file);
    const { path } = await api('/api/content/upload', { method: 'POST', body: { data } });
    return path;
  }

  // ---------- picture library (a pop-up with every picture of the website) ----------
  let imageCache = null;
  async function openLibrary(onPick) {
    if (!imageCache) imageCache = (await api('/api/catalog/images')).images;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="Picture library">
        <div class="modal-head"><strong>Choose a picture</strong>
          <button type="button" class="btn secondary small icon-btn" data-close title="Close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
        <input type="search" class="search" placeholder="Search by file name" data-search aria-label="Search pictures">
        <div class="lib-grid" data-grid></div>
      </div>`;
    document.body.appendChild(overlay);
    const grid = overlay.querySelector('[data-grid]');
    const draw = (needle) => {
      const list = imageCache.filter((i) => !needle || i.path.toLowerCase().includes(needle)).slice(0, 120);
      grid.innerHTML = list.length
        ? list.map((i) => `<button type="button" class="lib-item" data-path="${esc(i.path)}" title="${esc(i.path)}"><img loading="lazy" src="${esc(previewUrl(i.path))}" alt=""><span>${esc(i.name)}</span></button>`).join('')
        : '<p class="empty">No pictures match.</p>';
    };
    draw('');
    overlay.querySelector('[data-search]').addEventListener('input', (e) => draw(e.target.value.trim().toLowerCase()));
    overlay.addEventListener('click', (e) => {
      const item = e.target.closest('[data-path]');
      if (item) { onPick(item.dataset.path); overlay.remove(); return; }
      if (e.target === overlay || e.target.closest('[data-close]')) overlay.remove();
    });
  }

  // ---------- drawing fields ----------
  const inputHtml = (value, attrs = '') => `<input type="text" data-input value="${esc(value)}" ${attrs}>`;

  function imageControl(value) {
    return `
      <div class="cf-image">
        ${thumb(value)}
        <div class="img-controls">
          ${inputHtml(value, 'placeholder="No picture chosen" data-pathbox')}
          <div class="cf-btnrow">
            <button type="button" class="btn secondary small" data-act="pick">Choose from library</button>
            <label class="btn secondary small upload-btn">Upload new<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-act="upload" hidden></label>
            <button type="button" class="btn secondary small" data-act="clear">Remove</button>
          </div>
        </div>
      </div>`;
  }

  const rowButtons = '<button type="button" class="btn secondary small icon-btn" data-act="remove-row" title="Remove" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';

  function galleryRow(photo, alt) {
    return `
      <div class="cf-grow" data-row>
        ${thumb(photo)}
        <div class="cf-grow-fields">
          <label class="cf-sublabel">Picture file</label>
          ${inputHtml(photo, 'data-g="photo" placeholder="Choose or upload a picture"')}
          <label class="cf-sublabel">Caption</label>
          ${inputHtml(alt, 'data-g="alt" placeholder="e.g. Front view of the furnace"')}
          <p class="cf-subhint">Shown under the big picture when this photo is selected. It is also the picture description for Google and for visitors who cannot see the picture.</p>
          <div class="cf-btnrow">
            <button type="button" class="btn secondary small" data-act="pick">Choose</button>
            <label class="btn secondary small upload-btn">Upload<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-act="upload" hidden></label>
          </div>
        </div>
        ${rowButtons}
      </div>`;
  }

  function pairRow(a, b) {
    return `<tr data-row><td>${inputHtml(a, 'data-p="label"')}</td><td>${inputHtml(b, 'data-p="value"')}</td><td>${rowButtons}</td></tr>`;
  }

  function tableColumns(rows) {
    const cols = [];
    rows.forEach((r) => Object.keys(r).forEach((k) => { if (!cols.includes(k)) cols.push(k); }));
    return cols;
  }

  function dynTable(rows, columns) {
    const cols = columns || tableColumns(rows);
    const head = cols.map((c) => `<th data-col="${esc(c)}"><span title="${esc(c)}">${esc(humanize(c))}</span> <button type="button" class="link-btn" data-act="remove-col" title="Remove this column">&times;</button></th>`).join('');
    const body = rows.map((r) => dynRow(cols, r)).join('');
    return `<div class="cf-scroll"><table class="cf-table cf-dyn-table"><thead><tr>${head}<th></th></tr></thead><tbody>${body}</tbody></table></div>`;
  }

  function dynRow(cols, row) {
    return `<tr data-row>${cols.map((c) => `<td>${inputHtml(row[c] || '', `data-c="${esc(c)}"`)}</td>`).join('')}<td>${rowButtons}</td></tr>`;
  }

  function subFieldHtml(sub, value, ctx) {
    if (sub.kind === 'textarea') return `<label class="cf-sublabel">${esc(sub.label)}<textarea data-s="${esc(sub.key)}" rows="3">${esc(value || '')}</textarea></label>`;
    if (sub.kind === 'tags') return `<div class="cf-sublabel">${esc(sub.label)}${tagsHtml(value || [], ctx, `data-s="${esc(sub.key)}"`)}</div>`;
    return `<label class="cf-sublabel">${esc(sub.label)}${inputHtml(value || '', `data-s="${esc(sub.key)}"`)}</label>`;
  }

  function tagsHtml(selected, ctx, attrs) {
    return `<div class="cf-tag-list" ${attrs}>${(ctx.industries || []).map((i) => `<label class="cf-tag"><input type="checkbox" value="${esc(i.id)}"${selected.includes(i.id) ? ' checked' : ''}> ${esc(i.name)}</label>`).join('')}</div>`;
  }

  function cardHtml(def, card, ctx, index) {
    return `
      <div class="cf-card" data-row data-id="${esc(card.id || '')}">
        <div class="cf-card-head"><strong>${esc(def.itemLabel || 'Entry')} <span data-num>${index + 1}</span></strong>${rowButtons}</div>
        ${def.item.map((s) => subFieldHtml(s, card[s.key], ctx)).join('')}
      </div>`;
  }

  function control(def, value, ctx) {
    switch (def.kind) {
      case 'textarea': return `<textarea data-input rows="${Math.min(14, Math.max(4, Math.ceil((value || '').length / 90) + 1))}">${esc(value || '')}</textarea>`;
      case 'select': return `<select data-input>${def.options.map(([v, l]) => `<option value="${esc(v)}"${(value || '') === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
      case 'image': return imageControl(value || '');
      case 'gallery': return `<div class="cf-rows" data-rows>${(value || []).map(([p, a]) => galleryRow(p, a)).join('')}</div><button type="button" class="btn secondary small" data-act="add-photo">+ Add a photo</button>`;
      case 'list': return `<textarea data-input rows="${Math.min(14, Math.max(4, (value || []).length + 1))}" placeholder="One per line">${esc((value || []).join('\n'))}</textarea>`;
      case 'pairs': return `<table class="cf-table"><thead><tr><th>${esc(def.labelHead || 'Name')}</th><th>${esc(def.valueHead || 'Value')}</th><th></th></tr></thead><tbody data-rows>${(value || []).map(([a, b]) => pairRow(a, b)).join('')}</tbody></table><button type="button" class="btn secondary small" data-act="add-pair">+ Add a row</button>`;
      case 'table': return `<div data-dyn>${dynTable(value || [])}</div><div class="cf-btnrow"><button type="button" class="btn secondary small" data-act="add-dyn-row">+ Add a row</button><button type="button" class="btn secondary small" data-act="add-col">+ Add a column</button></div>`;
      case 'tags': return tagsHtml(value || [], ctx, 'data-tags');
      case 'cards': return `<div class="cf-rows" data-rows>${(value || []).map((c, i) => cardHtml(def, c, ctx, i)).join('')}</div><button type="button" class="btn secondary small" data-act="add-card">+ Add ${esc((def.itemLabel || 'entry').toLowerCase())}</button>`;
      case 'json': return `<textarea data-input class="cf-mono" rows="10" spellcheck="false">${esc(value ? JSON.stringify(value, null, 2) : '')}</textarea>`;
      default: return inputHtml(value || '');
    }
  }

  function fieldHtml(def, value, ctx) {
    return `
      <div class="cf-field cf-${def.kind}" data-key="${esc(def.key)}" data-kind="${def.kind}">
        <label class="cf-label">${esc(def.label)}${def.required ? ' <span class="req">*</span>' : ''}</label>
        ${def.where ? `<p class="cf-where">${esc(def.where)}</p>` : ''}
        ${control(def, value, ctx)}
        ${def.help ? `<p class="hint">${esc(def.help)}</p>` : ''}
        <p class="field-error" hidden></p>
      </div>`;
  }

  // The sections of one form. `data` holds the current values.
  function render(sections, data, ctx) {
    return sections.map((sec, i) => {
      const filled = sec.fields.filter((f) => { const v = data[f.key]; return !(v == null || v === '' || (Array.isArray(v) && !v.length)); }).length;
      return `
      <details class="cf-section" data-section="${esc(sec.id)}"${i === 0 ? ' open' : ''}>
        <summary><span class="cf-num">${i + 1}</span><span class="cf-sec-title">${esc(sec.title)}</span> <span class="muted">(${filled} of ${sec.fields.length} filled)</span></summary>
        <div class="cf-body">${sec.intro ? `<p class="cf-intro">${esc(sec.intro)}</p>` : ''}${sec.fields.map((f) => fieldHtml(f, data[f.key], ctx)).join('')}</div>
        <div class="cf-section-save"><button type="submit" class="btn small">Save</button><span class="muted">Saves the whole form, not only this section.</span></div>
      </details>`;
    }).join('');
  }

  // ---------- "where am I": a map of the website page, and a box that says what you are editing ----------
  const numOf = (sections, id) => { const i = sections.findIndex((s) => s.id === id); return i < 0 ? '' : i + 1; };

  // The product page drawn as boxes, laid out like the real page. Every box carries the number of the section that edits it.
  function pageMap(sections) {
    const z = (id, label, small) => `<button type="button" class="pm-zone" data-zone="${id}"><b>${numOf(sections, id)}</b><span>${esc(label)}${small ? `<small>${esc(small)}</small>` : ''}</span></button>`;
    return `
      <div class="pm" role="group" aria-label="Map of the product page">
        <div class="pm-strip">Menu and breadcrumb (not edited here)</div>
        <div class="pm-cols">
          <div class="pm-col">
            ${z('heading', 'Heading area', 'label, name, introduction, button')}
            <div class="pm-two">${z('features', 'Key features')}${z('features', 'Key benefits')}</div>
            <div class="pm-two">${z('setup', 'Configuration')}${z('setup', 'Thermochemical')}</div>
            ${z('setup', 'Supported processes')}
            ${z('setup', 'Main options')}
            ${z('extras', 'Extra cards', 'only when filled in')}
            ${z('site', 'Site requirements')}
            ${z('site', 'Industries')}
          </div>
          <div class="pm-col">
            ${z('photos', 'Photo', 'big picture and small ones')}
            ${z('tech', 'Technical data', 'table')}
          </div>
        </div>
        ${z('tech', 'Model range table', 'full width, at the bottom')}
        <div class="pm-off">${z('finder', 'Not on this page', 'product list, finder, Google')}</div>
      </div>`;
  }

  // The panel beside the form. The page map is only drawn for a product; a brand or a family gets a numbered list.
  function sideHtml(entity, sections) {
    const jump = entity === 'product' ? pageMap(sections) : `<ol class="cf-jump">${sections.map((s, i) => `<li><button type="button" class="pm-zone" data-zone="${esc(s.id)}"><b>${i + 1}</b><span>${esc(s.title)}</span></button></li>`).join('')}</ol>`;
    return `
      <div class="cf-guide">
        <div class="cf-now" id="cf-now" aria-live="polite"></div>
        <h2 class="cf-guide-title">${entity === 'product' ? 'The product page. Click a part to edit it.' : 'Sections. Click one to go to it.'}</h2>
        ${jump}
      </div>`;
  }

  function bindGuide(form, sections) {
    const side = form.querySelector('.cf-side');
    if (!side) return;
    const now = side.querySelector('#cf-now');
    const sectionEl = (id) => form.querySelector(`details.cf-section[data-section="${id}"]`);
    const mark = (id) => {
      side.querySelectorAll('[data-zone]').forEach((z) => z.classList.toggle('on', z.dataset.zone === id));
      form.querySelectorAll('details.cf-section').forEach((d) => d.classList.toggle('current', d.dataset.section === id));
    };
    const show = (n, secTitle, label, where) => {
      now.innerHTML = `<div class="cf-now-k">You are editing</div>
        <div class="cf-now-sec">${n ? `<b>${n}</b>` : ''}<span>${esc(secTitle)}</span></div>
        ${label ? `<div class="cf-now-field">${esc(label)}</div>` : ''}
        ${where ? `<div class="cf-now-where">${esc(where)}</div>` : ''}`;
    };
    const first = sections[0];
    show(1, first.title, '', 'Click in any box. It is named here, with the part of the page it changes.');
    mark(first.id);

    form.addEventListener('focusin', (e) => {
      const field = e.target.closest('.cf-field');
      if (!field) return;
      const label = (field.querySelector('.cf-label') || {}).textContent || '';
      const where = (field.querySelector('.cf-where') || {}).textContent || '';
      const sec = e.target.closest('details.cf-section');
      if (sec) {
        const id = sec.dataset.section;
        show(numOf(sections, id), (sections.find((s) => s.id === id) || {}).title || '', label.replace(/\s*\*\s*$/, '').trim(), where);
        mark(id);
      } else {
        show('', 'Page settings', label.trim(), '');
        mark('');
      }
    });
    form.addEventListener('toggle', (e) => {
      if (e.target.matches && e.target.matches('details.cf-section') && e.target.open) mark(e.target.dataset.section);
    }, true);

    side.addEventListener('click', (e) => {
      const zone = e.target.closest('[data-zone]');
      const d = zone && sectionEl(zone.dataset.zone);
      if (!d) return;
      d.open = true;
      mark(zone.dataset.zone);
      show(numOf(sections, zone.dataset.zone), (sections.find((s) => s.id === zone.dataset.zone) || {}).title || '', '', 'Opened below. Click a box to start.');
      d.scrollIntoView({ behavior: 'smooth', block: 'start' });
      d.classList.add('flash');
      setTimeout(() => d.classList.remove('flash'), 1300);
    });
  }

  // ---------- reading values back ----------
  const val = (el, sel) => { const x = el.querySelector(sel); return x ? x.value : ''; };

  function collectField(def, wrap) {
    switch (def.kind) {
      case 'gallery':
        return [...wrap.querySelectorAll('[data-row]')].map((r) => ({ photo: val(r, '[data-g="photo"]').trim(), alt: val(r, '[data-g="alt"]').trim() }));
      case 'list':
        return val(wrap, '[data-input]').split('\n');
      case 'pairs':
        return [...wrap.querySelectorAll('[data-row]')].map((r) => ({ label: val(r, '[data-p="label"]'), value: val(r, '[data-p="value"]') }));
      case 'table': {
        const cols = [...wrap.querySelectorAll('thead th[data-col]')].map((th) => th.dataset.col);
        return [...wrap.querySelectorAll('tbody [data-row]')].map((r) => Object.fromEntries(cols.map((c) => [c, val(r, `[data-c="${c}"]`)])));
      }
      case 'tags':
        return [...wrap.querySelectorAll('[data-tags] input:checked')].map((c) => c.value);
      case 'cards':
        return [...wrap.querySelectorAll('[data-row]')].map((card) => {
          const out = { id: card.dataset.id || '' };
          def.item.forEach((s) => {
            const el = card.querySelector(`[data-s="${s.key}"]`);
            out[s.key] = s.kind === 'tags' ? [...el.querySelectorAll('input:checked')].map((c) => c.value) : el.value;
          });
          return out;
        });
      default:
        return val(wrap, '[data-input]');
    }
  }

  function collect(root, sections) {
    const data = {};
    sections.forEach((sec) => sec.fields.forEach((def) => {
      const wrap = root.querySelector(`.cf-field[data-key="${def.key}"]`);
      if (wrap) data[def.key] = collectField(def, wrap);
    }));
    return data;
  }

  // ---------- errors ----------
  function clearErrors(root) {
    root.querySelectorAll('.cf-field.invalid').forEach((w) => { w.classList.remove('invalid'); w.querySelector('.field-error').hidden = true; });
  }

  function showErrors(root, errors) {
    let first = null;
    Object.entries(errors || {}).forEach(([key, message]) => {
      const wrap = root.querySelector(`.cf-field[data-key="${key}"]`);
      if (!wrap) return;
      wrap.classList.add('invalid');
      const box = wrap.querySelector('.field-error');
      box.textContent = message;
      box.hidden = false;
      const section = wrap.closest('details');
      if (section) section.open = true;
      if (!first) first = wrap;
    });
    if (first && first.scrollIntoView) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return !!first;
  }

  // ---------- behaviour (add / remove rows, pictures) ----------
  // `onChange` is called after anything changes, so the page can track unsaved edits.
  function bind(root, sections, ctx, onChange) {
    const defOf = (wrap) => sections.flatMap((s) => s.fields).find((f) => f.key === wrap.dataset.key);
    const changed = () => onChange && onChange();

    function setPicture(scope, path) {
      const box = scope.querySelector('[data-pathbox]') || scope.querySelector('[data-g="photo"]');
      box.value = path;
      const old = scope.querySelector('.img-preview');
      old.outerHTML = thumb(path);
      changed();
    }

    function renumber(wrap) {
      wrap.querySelectorAll('.cf-card [data-num]').forEach((n, i) => { n.textContent = i + 1; });
    }

    root.addEventListener('input', (e) => {
      const photo = e.target.matches('[data-pathbox], [data-g="photo"]');
      if (photo) {
        const scope = e.target.closest('.cf-image, [data-row]');
        const prev = scope.querySelector('.img-preview');
        if (prev) prev.outerHTML = thumb(e.target.value.trim());
      }
      changed();
    });
    root.addEventListener('change', async (e) => {
      if (e.target.matches('input[type="checkbox"], select')) changed();
      if (!e.target.matches('[data-act="upload"]')) return;
      const file = e.target.files[0];
      if (!file) return;
      const scope = e.target.closest('.cf-image, [data-row]');
      try {
        setPicture(scope, await uploadPicture(file));
        toast('Picture uploaded.');
      } catch (err) {
        toast(err.message);
      }
    });

    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn || btn.tagName === 'INPUT') return;
      const act = btn.dataset.act;
      const wrap = btn.closest('.cf-field');
      const scope = btn.closest('.cf-image, [data-row]');
      if (act === 'pick') { openLibrary((path) => setPicture(scope, path)); return; }
      if (act === 'clear') { setPicture(scope, ''); return; }
      if (act === 'remove-row') { btn.closest('[data-row]').remove(); renumber(wrap); changed(); return; }
      if (!wrap) return;
      const def = defOf(wrap);
      if (act === 'add-photo') {
        wrap.querySelector('[data-rows]').insertAdjacentHTML('beforeend', galleryRow('', ''));
        changed();
      } else if (act === 'add-pair') {
        wrap.querySelector('[data-rows]').insertAdjacentHTML('beforeend', pairRow('', ''));
        changed();
      } else if (act === 'add-card') {
        const rows = wrap.querySelector('[data-rows]');
        rows.insertAdjacentHTML('beforeend', cardHtml(def, {}, ctx, rows.children.length));
        changed();
      } else if (act === 'add-dyn-row') {
        const cols = [...wrap.querySelectorAll('thead th[data-col]')].map((th) => th.dataset.col);
        if (!cols.length) { toast('Add a column first.'); return; }
        wrap.querySelector('tbody').insertAdjacentHTML('beforeend', dynRow(cols, {}));
        changed();
      } else if (act === 'add-col') {
        const name = (window.prompt('Name of the new column (letters and numbers, for example "weight"):') || '').trim();
        if (!name) return;
        if (!/^[A-Za-z][A-Za-z0-9_]{0,29}$/.test(name)) { toast('Use letters and numbers only, starting with a letter.'); return; }
        const old = [...wrap.querySelectorAll('thead th[data-col]')].map((th) => th.dataset.col);
        if (old.includes(name)) { toast('That column already exists.'); return; }
        const cols = old.concat(name);
        const rows = [...wrap.querySelectorAll('tbody [data-row]')].map((r) => Object.fromEntries(cols.map((c) => [c, val(r, `[data-c="${c}"]`)])));
        wrap.querySelector('[data-dyn]').innerHTML = dynTable(rows, cols);
        changed();
      } else if (act === 'remove-col') {
        const th = btn.closest('th');
        const index = [...th.parentNode.children].indexOf(th);
        wrap.querySelectorAll('tr').forEach((tr) => { const cell = tr.children[index]; if (cell) cell.remove(); });
        changed();
      }
    });
  }

  window.CatalogForm = { render, collect, bind, showErrors, clearErrors, humanize, previewUrl, thumb, sideHtml, bindGuide };
})();
