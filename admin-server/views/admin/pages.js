// Page content editor with three levels:
//   #/                      list of pages
//   #/page/<id>             list of that page's sections
//   #/page/<id>/<section>   edit every item of one section
(function () {
  const { api, esc, toast } = window.Admin;

  const viewEl = document.getElementById('view');
  const crumbsEl = document.getElementById('crumbs');
  const headingEl = document.getElementById('heading');
  const introEl = document.getElementById('intro');
  const errorEl = document.getElementById('error');
  const saveBar = document.getElementById('save-bar');
  const dirtyLabel = document.getElementById('dirty-label');

  let pageId = null;
  let pageTitle = '';
  let fields = [];           // all fields of the loaded page
  const draft = new Map();   // key -> new value (string) or null (= back to original)
  let blocks = [];           // cards added through the admin: { key, listId, template, fields }
  let deletedIds = new Set(); // ids of original cards that are hidden on the website
  const forms = new Map();   // open add/edit forms: id -> { listId, blockKey, values }
  let editorOpen = false;    // true while a section editor is on screen (the Save bar is shown only there)
  let rerender = () => {};   // redraws the section being edited
  let shownHash = location.hash;

  const KIND_NAMES = { 'Form row': 'Contact form fields' };

  // where the lists that are NOT typed here come from
  const SECTION_NOTES = {
    header: '<div class="tip"><strong>The Products and Industries dropdowns.</strong> The Products dropdown lists your families by itself, so a renamed or new family shows in every menu: change them under <a href="/admin/products.html">Products</a>. The names in the Industries dropdown come from <a href="/admin/products.html#/industries">Products &rsaquo; Edit industries</a>; the three column titles are below. The phone menu shows the same items, and its words are the ones below.</div>',
  };

  const SECTION_NAMES = {
    header: 'Header (top menu)', footer: 'Footer', meta: 'Search engine & browser tab',
    'mobile-products-panel': 'Phone menu: Products list', 'mobile-industries-panel': 'Phone menu: Industries list',
    mega: 'Top menu: Products dropdown', 'mega-ind': 'Top menu: Industries dropdown', hero: 'Hero (top banner)', page: 'Page top',
    content: 'Main content', contact: 'Contact', why: 'Why buy through Greets', partners: 'Partners',
    industries: 'Industries', finder: 'Product finder: labels (the words around the search)', bmi: 'BMI section', novatec: 'Novatec section', huasheng: 'Huasheng section',
    'home-crumb-wrap': 'Breadcrumb', messages: 'Form messages & popups (after sending an enquiry)', 'privacy-page-hero': 'Privacy page heading', navgroup: 'Top navigation',
  };

  // A page can word a menu item a little differently from the shared menu; those few items show up under the page.
  const PAGE_ONLY = { header: 'Top menu: wording that differs on this page', 'mobile-products-panel': 'Phone menu: wording that differs on this page', 'mobile-industries-panel': 'Phone menu: wording that differs on this page', footer: 'Footer: wording that differs on this page' };
  function sectionName(id, page) {
    if (page && page !== 'global' && PAGE_ONLY[id]) return PAGE_ONLY[id];
    return SECTION_NAMES[id] || id.replace(/[-_]/g, ' ').replace(/^./, (c) => c.toUpperCase());
  }

  function showError(message) {
    errorEl.textContent = message || '';
    errorEl.hidden = !message;
  }

  // ---------- field helpers ----------
  function effective(field) {
    if (draft.has(field.key)) return draft.get(field.key) === null ? field.original : draft.get(field.key);
    return field.value === null ? field.original : field.value;
  }

  function isEdited(field) {
    if (draft.has(field.key)) return draft.get(field.key) !== null;
    return field.value !== null;
  }

  // Turns a site path (assets/x.png, uploads/y.jpg) into something this admin page can display.
  const SITE_FOLDERS = /^(assets|BMI-machine-photos|Novatec-machine-photos|Huasheng-machine-photos)\//;
  function previewUrl(path) {
    if (!path) return '';
    // the share-picture fields hold the live address of a picture that is also in the site folder: show that copy
    path = path.replace(/^https?:\/\/(www\.)?greetsequipment\.com\//i, '');
    if (/^(https?:)?\/\//.test(path)) return path;
    if (path.startsWith('uploads/')) return '/' + path;
    if (SITE_FOLDERS.test(path)) return '/site/' + path;
    return '';
  }

  // ---------- text with formatting, shown as normal text (never as HTML code) ----------
  // The website allows a few formatting tags inside some texts (bold, a coloured word, a line break, a link).
  // The editor shows them as they look; nobody has to read or type a tag.
  const RT_TAG = { STRONG: 'strong', B: 'strong', EM: 'em', I: 'em', SUB: 'sub', SUP: 'sup', BR: 'br', A: 'a', SPAN: 'span', FONT: 'span' };
  // Keeps only colour, bold, underline / none and italic (the settings the original pages use on links); anything else goes.
  function cleanStyle(text) {
    var keep = {};
    String(text || '').split(';').forEach(function (d) {
      var i = d.indexOf(':');
      if (i < 0) return;
      var p = d.slice(0, i).trim().toLowerCase();
      var v = d.slice(i + 1).trim().toLowerCase().replace(/\s*!important$/, '');
      var m;
      if (p === 'color') {
        if (/^(#[0-9a-f]{3}|#[0-9a-f]{6}|inherit|var\(--[a-z0-9-]{1,40}\))$/.test(v)) keep.color = v;
        else if ((m = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/.exec(v))) keep.color = '#' + [m[1], m[2], m[3]].map(function (x) { return ('0' + Math.min(255, +x).toString(16)).slice(-2); }).join('');
      } else if (p === 'font-weight' && /^(normal|bold|[1-9]00)$/.test(v)) keep['font-weight'] = v;
      else if (p === 'text-decoration' && /^(none|underline)$/.test(v)) keep['text-decoration'] = v;
      else if (p === 'font-style' && /^(normal|italic)$/.test(v)) keep['font-style'] = v;
    });
    return Object.keys(keep).map(function (k) { return k + ':' + keep[k]; }).join(';');
  }

  function rtClean(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    function walk(node) {
      let out = '';
      node.childNodes.forEach((n) => {
        if (n.nodeType === 3) { out += esc(n.textContent.replace(/\u00a0/g, ' ')); return; }
        if (n.nodeType !== 1 || n.tagName === 'SCRIPT' || n.tagName === 'STYLE') return; // their contents are never text
        if (n.tagName === 'DIV' || n.tagName === 'P') { out += (out && !/<br>$/.test(out) ? '<br>' : '') + walk(n); return; }
        const tag = RT_TAG[n.tagName];
        if (!tag) { out += walk(n); return; }
        if (tag === 'br') { out += '<br>'; return; }
        let attrs = '';
        if (tag === 'a') {
          const href = n.getAttribute('href') || '';
          if (href && !/^\s*(javascript|data|vbscript):/i.test(href)) attrs += ` href="${esc(href)}"`;
          if (n.getAttribute('target')) attrs += ` target="${esc(n.getAttribute('target'))}"`;
          if (n.getAttribute('rel')) attrs += ` rel="${esc(n.getAttribute('rel'))}"`;
        }
        if ((tag === 'span' || tag === 'a') && n.getAttribute('class')) attrs += ` class="${esc(n.getAttribute('class').split(/\s+/).filter((c) => /^[A-Za-z0-9_-]{1,40}$/.test(c)).join(' '))}"`;
        if (tag === 'span' || tag === 'a') {
          let style = cleanStyle(n.getAttribute('style'));
          if (!style && n.getAttribute('color')) style = cleanStyle('color:' + n.getAttribute('color')); // <font color>
          if (style) attrs += ` style="${style}"`;
        }
        if (tag === 'span' && !attrs && !n.textContent) return; // an empty span with no class or style is junk; one with words stays (the site's CSS may style it)
        if (tag === 'span' && /^style="font-weight:(bold|[6-9]00)"$/.test(attrs.trim())) { out += `<strong>${walk(n)}</strong>`; return; }
        if (tag === 'span' && /^style="font-style:italic"$/.test(attrs.trim())) { out += `<em>${walk(n)}</em>`; return; }
        out += `<${tag}${attrs}>${walk(n)}</${tag}>`;
      });
      return out;
    }
    return walk(tpl.content).replace(/(<br>)+$/, '');
  }
  const rtHtml = (attrs, value, label) => `
    <div class="rt-box">
      <div class="rt" contenteditable="true" role="textbox" aria-multiline="true" aria-label="${esc(label)}" ${attrs}>${rtClean(value)}</div>
    </div>`;
  const readInput = (el) => (el.classList.contains('rt') ? rtClean(el.innerHTML) : el.value);

  // ---------- the toolbar that appears over selected words: bold, italic, link, colour ----------
  const POP_COLOURS = [['#1B2328', 'Black'], ['#02963C', 'Green'], ['#C62828', 'Red'], ['#1565C0', 'Blue'], ['#E65100', 'Orange'], ['#6A1B9A', 'Purple'], ['#6B7780', 'Grey']];
  const SVG = (d) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const pop = document.createElement('div');
  pop.className = 'rt-pop';
  pop.hidden = true;
  pop.innerHTML = `
    <div class="rt-pop-bar">
      <button type="button" data-rtp="bold" title="Bold" aria-label="Bold"><b>B</b></button>
      <button type="button" data-rtp="italic" title="Italic" aria-label="Italic"><i>I</i></button>
      <button type="button" data-rtp="link" title="Link" aria-label="Link">${SVG('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>')}</button>
      <button type="button" data-rtp="color" title="Text colour" aria-label="Text colour"><span class="rt-a">A</span></button>
      <button type="button" data-rtp="clear" title="Remove formatting" aria-label="Remove formatting">${SVG('<path d="M18 6 6 18M6 6l12 12"/>')}</button>
    </div>
    <div class="rt-pop-link" hidden>
      <input type="text" data-site-links autocomplete="off" placeholder="Paste or type the link address, or pick a page" aria-label="Link address">
      <button type="button" class="btn small" data-rtp="link-apply">Apply</button>
      <button type="button" class="btn small secondary" data-rtp="link-remove">Remove link</button>
    </div>
    <div class="rt-pop-colors" hidden>${POP_COLOURS.map(([c, n]) => `<button type="button" data-rtp="set-color" data-color="${c}" style="background:${c}" title="${n}" aria-label="${n}"></button>`).join('')}</div>`;
  document.body.appendChild(pop);

  let savedRange = null;
  let popBox = null;
  const boxOf = (node) => { const el = node && (node.nodeType === 1 ? node : node.parentElement); return el ? el.closest('.rt') : null; };
  const popBusy = () => pop.contains(document.activeElement); // a link address is being typed
  function hidePop() {
    pop.hidden = true;
    pop.querySelector('.rt-pop-link').hidden = true;
    pop.querySelector('.rt-pop-colors').hidden = true;
  }
  function placePop() {
    const sel = window.getSelection && window.getSelection();
    const box = sel && sel.rangeCount && !sel.isCollapsed ? boxOf(sel.anchorNode) : null;
    if (!box || box !== boxOf(sel.focusNode)) { if (!popBusy()) hidePop(); return; }
    popBox = box;
    savedRange = sel.getRangeAt(0).cloneRange();
    const r = savedRange.getBoundingClientRect();
    pop.hidden = false;
    const w = pop.offsetWidth || 230;
    pop.style.top = Math.max(8, r.top - (pop.offsetHeight || 40) - 8) + 'px';
    pop.style.left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), Math.max(8, window.innerWidth - w - 8)) + 'px';
  }
  document.addEventListener('selectionchange', placePop);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hidePop(); });
  window.addEventListener('scroll', () => { if (!pop.hidden && !popBusy()) placePop(); }, true);

  // runs a formatting command on the words that were selected, then tells the screen the text changed
  function format(command, arg) {
    if (!savedRange || !popBox) return;
    popBox.focus();
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange);
    document.execCommand('styleWithCSS', false, command === 'foreColor'); // a colour is a style; bold and italic are proper tags
    document.execCommand(command, false, arg);
    popBox.dispatchEvent(new Event('input', { bubbles: true }));
    placePop();
  }

  // "contact.html", "https://...", "www.site.com", "name@site.com" and phone numbers all become a proper link
  function linkFrom(text) {
    const v = String(text || '').trim();
    if (/^\+?[\d\s()-]{7,}$/.test(v)) return 'tel:' + v.replace(/[\s()-]/g, ''); // a phone number may contain spaces
    if (!v || /^(javascript|data|vbscript):/i.test(v) || /\s/.test(v)) return '';
    if (/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(v)) return v;
    if (/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(v)) return 'mailto:' + v;
    if (/^(www\.|[\w-]+(\.[\w-]+)*\.(com|in|org|net|io|co|it|fr|cn)\b)/i.test(v) && !/\.html?$/i.test(v)) return 'https://' + v;
    return v; // a page of this website, such as contact.html or bmi/
  }

  pop.addEventListener('mousedown', (e) => { if (!e.target.closest('input')) e.preventDefault(); }); // the words stay selected
  pop.addEventListener('click', (e) => {
    const b = e.target.closest('[data-rtp]');
    if (!b) return;
    const what = b.dataset.rtp;
    const linkRow = pop.querySelector('.rt-pop-link');
    const colours = pop.querySelector('.rt-pop-colors');
    if (what === 'bold') format('bold');
    else if (what === 'italic') format('italic');
    else if (what === 'clear') { format('removeFormat'); format('unlink'); }
    else if (what === 'color') { colours.hidden = !colours.hidden; linkRow.hidden = true; }
    else if (what === 'set-color') { format('foreColor', b.dataset.color); colours.hidden = true; }
    else if (what === 'link') {
      linkRow.hidden = !linkRow.hidden;
      colours.hidden = true;
      if (!linkRow.hidden) {
        const input = linkRow.querySelector('input');
        const anchor = savedRange && boxOf(savedRange.commonAncestorContainer) && (savedRange.commonAncestorContainer.nodeType === 1 ? savedRange.commonAncestorContainer : savedRange.commonAncestorContainer.parentElement).closest('a');
        input.value = anchor ? anchor.getAttribute('href') || '' : '';
        input.focus();
      }
    } else if (what === 'link-apply') {
      const url = linkFrom(linkRow.querySelector('input').value);
      if (!url) { toast('Type or paste the address the link should open.'); return; }
      format('createLink', url);
      linkRow.hidden = true;
    } else if (what === 'link-remove') { format('unlink'); linkRow.hidden = true; }
  });
  pop.querySelector('.rt-pop-link input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); pop.querySelector('[data-rtp="link-apply"]').click(); }
  });

  function previewHtml(value) {
    const url = previewUrl(value);
    return `${url ? `<img src="${esc(url)}" alt="" onerror="this.parentNode.classList.add('broken')">` : ''}<span>No preview</span>`;
  }

  // Small icon-only buttons (the words live in title/aria-label for hover and screen readers).
  const ICON_PATHS = {
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    restore: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  };
  function iconBtn(kind, label, attrs, extraClass) {
    return `<button type="button" class="btn small icon-btn ${extraClass || ''}" ${attrs} title="${esc(label)}" aria-label="${esc(label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[kind]}</svg></button>`;
  }
  const editBtn = (isOpen) => iconBtn(isOpen ? 'close' : 'edit', isOpen ? 'Close' : 'Edit', 'data-edit-card', 'card-edit');

  function snippet(text, max) {
    const plain = String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return plain.length > max ? plain.slice(0, max) + '…' : plain;
  }

  const isAlt = (field) => /^Image description \(alt text\)/.test(field.label || '');

  // A readable title: the kind of item plus the words it shows on the website.
  function titleOf(field) {
    if (isAlt(field)) return field.label.replace(/^Image description \(alt text\) for /, 'Picture description (alt text) for ');
    if (field.type === 'image' || field.type === 'meta') return field.label;
    if (field.type === 'link' && field.button) return field.context ? `${field.label}: “${snippet(field.context, 40)}”` : field.label;
    if (field.type === 'link') return field.context ? `Link address of “${snippet(field.context, 50)}”` : field.label;
    return field.label;
  }

  function fieldHtml(field) {
    const value = effective(field);
    const id = 'f-' + field.key.replace(/[^a-z0-9]/gi, '_');
    const edited = isEdited(field);
    let input;

    if (field.type === 'image') {
      input = `
        <div class="img-field">
          <div class="img-preview">${previewHtml(value)}</div>
          <div class="img-controls">
            <input id="${id}" data-key="${esc(field.key)}" type="text" value="${esc(value)}" aria-label="${esc(field.label)}">
            <label class="btn secondary small upload-btn">Upload new image
              <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-upload="${esc(field.key)}" hidden>
            </label>
          </div>
        </div>`;
    } else if (field.rich) {
      input = rtHtml(`id="${id}" data-key="${esc(field.key)}"`, value, field.label);
    } else if (field.type !== 'link' && (value.length > 90 || field.original.length > 90)) {
      const rows = Math.min(10, Math.max(2, Math.ceil(value.length / 80)));
      input = `<textarea id="${id}" data-key="${esc(field.key)}" rows="${rows}">${esc(value)}</textarea>`;
    } else {
      input = `<input id="${id}" data-key="${esc(field.key)}" type="text" value="${esc(value)}"${field.type === 'link' ? ' data-site-links placeholder="Type, or pick a page of the site" autocomplete="off"' : ''}>`;
    }

    const hint = field.rich ? ''
      : isAlt(field) ? '<p class="hint">Not shown on the page. It describes the picture for Google and for visitors who cannot see it.</p>' : '';
    return `
      <div class="cms-field${edited ? ' edited' : ''}" data-field="${esc(field.key)}">
        <div class="cms-label">
          <label for="${id}">${esc(titleOf(field))}</label>
          <span class="badge-edited">Edited</span>
          <button type="button" class="link-btn" data-reset="${esc(field.key)}"${edited ? '' : ' hidden'}>Reset to original</button>
        </div>
        ${input}
        ${hint}
      </div>`;
  }

  // Search-engine / social-share settings are not offered here (they stay as written in the website).
  const HIDDEN_SECTIONS = new Set(['meta', 'messages']);

  function sectionsOf() {
    const groups = new Map();
    for (const f of fields) {
      if (HIDDEN_SECTIONS.has(f.section)) continue;
      if (!groups.has(f.section)) groups.set(f.section, []);
      groups.get(f.section).push(f);
    }
    return groups;
  }

  // ---------- save bar ----------
  function updateSaveBar() {
    const n = draft.size;
    saveBar.hidden = !editorOpen;
    document.getElementById('save').disabled = n === 0;
    document.getElementById('discard').disabled = n === 0;
    dirtyLabel.textContent = n === 0 ? 'No unsaved changes' : n === 1 ? '1 unsaved change' : `${n} unsaved changes`;
    saveBar.classList.toggle('dirty', n > 0);
    document.querySelectorAll('[data-save-all]').forEach((b) => { b.disabled = n === 0; });
  }

  function setDraft(field, value) {
    if ((value === null && field.value === null) || value === field.value) draft.delete(field.key);
    else draft.set(field.key, value);
    updateSaveBar();
  }

  function replaceField(field) {
    const box = viewEl.querySelector(`[data-field="${CSS.escape(field.key)}"]`);
    if (box) box.outerHTML = fieldHtml(field);
  }

  // ---------- views ----------
  function setHeader(crumbs, title, intro) {
    Admin.crumbs(crumbsEl, crumbs);
    headingEl.textContent = title;
    introEl.textContent = intro || '';
  }

  async function showPageList() {
    setHeader([{ label: 'Pages' }], 'Pages', 'Choose a page to edit. Changes go live as soon as you save. Products are managed separately.');
    viewEl.innerHTML = '<p class="empty">Loading...</p>';
    const { pages } = await api('/api/content/pages');
    viewEl.innerHTML = `
      <div class="table-wrap"><table>
        <thead><tr><th>Page</th><th>Items</th><th>Edited</th><th></th></tr></thead>
        <tbody>${pages.map((p) => `
          <tr>
            <td><a href="#/page/${esc(p.id)}"><strong>${esc(p.title)}</strong></a></td>
            <td>${p.fields}</td>
            <td>${p.edited ? `<span class="badge published">${p.edited} edited</span>` : '<span class="muted">-</span>'}</td>
            <td class="row-actions"><a class="btn small" href="#/page/${esc(p.id)}">Open</a></td>
          </tr>`).join('')}
        </tbody>
      </table></div>`;
  }

  function takeData(data) {
    fields = data.fields;
    blocks = data.blocks || [];
    deletedIds = new Set(data.deleted || []);
  }

  // every address on the site, offered as suggestions in each link box (the visitor can still type any address)
  const SITE_LINKS = [['index.html', 'Home'], ['index.html#finder', 'Home - Find a system'], ['index.html#partners', 'Home - Our brands'], ['index.html#why', 'Home - Why Greets'], ['contact.html', 'Contact'], ['privacy.html', 'Privacy policy']];
  let siteLinkItems = SITE_LINKS.slice();
  async function loadSiteLinks() {
    const items = SITE_LINKS.slice();
    try {
      const tree = await api('/api/catalog/tree');
      for (const b of tree.brands || []) {
        items.push([b.id + '/', b.name + ' (brand page)']);
        for (const f of b.families || []) {
          items.push([b.id + '/' + f.id + '/', b.name + ' - ' + (f.name || f.id)]);
          for (const pr of f.products || []) items.push([b.id + '/' + f.id + '/' + pr.id + '/', (pr.name || pr.id) + ' (product)']);
        }
      }
    } catch (e) { /* the fixed pages are still offered */ }
    siteLinkItems = items;
  }

  // the dropdown under a link box: shows EVERY address; typing narrows the list
  let linkMenu = null, linkInput = null;
  function closeLinkMenu() { if (linkMenu) linkMenu.hidden = true; linkInput = null; }
  function openLinkMenu(input, filter) {
    if (!linkMenu) {
      linkMenu = document.createElement('div');
      linkMenu.className = 'link-menu';
      linkMenu.addEventListener('mousedown', (e) => {
        const li = e.target.closest('[data-url]');
        if (!li || !linkInput) return;
        e.preventDefault();
        linkInput.value = li.dataset.url;
        linkInput.dispatchEvent(new Event('input', { bubbles: true }));
        closeLinkMenu();
      });
      document.body.appendChild(linkMenu);
    }
    const q = (filter || '').trim().toLowerCase();
    const list = q ? siteLinkItems.filter(([u, n]) => (u + ' ' + n).toLowerCase().includes(q)) : siteLinkItems;
    linkInput = input;
    linkMenu.innerHTML = list.length
      ? list.map(([u, n]) => '<div class="link-opt" data-url="' + esc(u) + '"><strong>' + esc(n) + '</strong><span>' + esc(u) + '</span></div>').join('')
      : '<div class="link-none">No page matches. You can still type any address.</div>';
    const r = input.getBoundingClientRect();
    linkMenu.style.left = r.left + 'px';
    linkMenu.style.width = Math.max(r.width, 320) + 'px';
    const below = window.innerHeight - r.bottom;
    linkMenu.style.maxHeight = Math.max(160, Math.min(320, below > 200 ? below - 12 : r.top - 12)) + 'px';
    linkMenu.style.top = (below > 200 ? r.bottom + 2 : Math.max(8, r.top - Math.min(320, r.top - 12) - 2)) + 'px';
    linkMenu.hidden = false;
  }
  document.addEventListener('focusin', (e) => { if (e.target.matches && e.target.matches('input[data-site-links]')) openLinkMenu(e.target, ''); else if (!e.target.closest || !e.target.closest('.link-menu')) closeLinkMenu(); });
  document.addEventListener('click', (e) => { if (e.target.matches && e.target.matches('input[data-site-links]') && (!linkMenu || linkMenu.hidden)) openLinkMenu(e.target, ''); });
  document.addEventListener('input', (e) => { if (e.target.matches && e.target.matches('input[data-site-links]')) openLinkMenu(e.target, e.target.value === e.target.defaultValue ? '' : e.target.value); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLinkMenu(); });
  window.addEventListener('scroll', () => closeLinkMenu(), true);

  async function loadPage(id) {
    loadSiteLinks();
    if (pageId === id && fields.length) return;
    const data = await api(`/api/content/pages/${id}`);
    pageId = id;
    pageTitle = data.title;
    takeData(data);
    forms.clear();
    draft.clear();
  }

  // Re-reads the page after an add/delete/restore, keeping any unsaved edits.
  async function refreshData() {
    takeData(await api(`/api/content/pages/${pageId}`));
  }

  // ---------- add / edit form for a new card ----------
  // The first card of a list is the model: a new card has the same fields.
  function modelFields(listId) {
    const inList = fields.filter((f) => f.listId === listId && f.repeatable);
    if (!inList.length) return [];
    const modelId = inList.reduce((a, b) => (b.groupNo < a.groupNo ? b : a)).cardId;
    return inList.filter((f) => f.cardId === modelId);
  }

  function formFieldHtml(formId, field, value, isNew) {
    const f = esc(formId);
    const k = esc(field.key);
    // in a new card the first card's words are shown as a grey example, never as text that must be erased
    const hint = isNew && field.type !== 'image' && field.type !== 'link' ? snippet(effective(field), 70) : '';
    const ph = hint ? ` placeholder="e.g. ${esc(hint)}"` : '';
    let input;
    if (field.type === 'image') {
      input = `
        <div class="img-field">
          <div class="img-preview">${previewHtml(value)}</div>
          <div class="img-controls">
            <input type="text" value="${esc(value)}" data-bform="${f}" data-bkey="${k}" aria-label="${esc(field.label)}"${isNew ? ' placeholder="Upload a picture (or leave empty to use the first card\'s picture)"' : ''}>
            <label class="btn secondary small upload-btn">Upload new image
              <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-bupload-form="${f}" data-bupload-key="${k}" hidden>
            </label>
          </div>
        </div>`;
    } else if (field.rich) {
      input = rtHtml(`data-bform="${f}" data-bkey="${k}"${hint ? ` data-placeholder="e.g. ${esc(hint)}"` : ''}`, value, field.label);
    } else if (value.length > 90) {
      input = `<textarea rows="${Math.min(10, Math.max(2, Math.ceil(value.length / 80)))}" data-bform="${f}" data-bkey="${k}" aria-label="${esc(field.label)}"${ph}>${esc(value)}</textarea>`;
    } else {
      input = `<input type="text" value="${esc(value)}" data-bform="${f}" data-bkey="${k}" aria-label="${esc(field.label)}"${field.type === 'link' ? ' data-site-links autocomplete="off"' : ph}>`;
    }
    return `<div class="cms-field"><div class="cms-label"><label>${esc(titleOf(field))}</label></div>${input}</div>`;
  }

  function formHtml(formId) {
    const form = forms.get(formId);
    const items = modelFields(form.listId).map((f) => formFieldHtml(formId, f, form.values[f.key] ?? '', !form.blockKey)).join('');
    return `
      <div class="cms-form">
        <div class="cms-fields">${items}</div>
        <div class="form-actions">
          <button type="button" class="btn" data-form-save="${esc(formId)}">${form.blockKey ? 'Save changes' : 'Add to website'}</button>
          ${form.blockKey ? '' : `<button type="button" class="btn secondary" data-form-cancel="${esc(formId)}">Cancel</button>`}
        </div>
      </div>`;
  }

  function openForm(formId, listId, blockKey, savedValues) {
    const values = {};
    // a card being edited starts with its own words; a NEW card starts empty (the first card's words are only a grey hint)
    modelFields(listId).forEach((f) => { values[f.key] = savedValues && f.key in savedValues ? savedValues[f.key] : (blockKey ? effective(f) : ''); });
    forms.set(formId, { listId, blockKey, values });
  }

  // Loose items first, then each list of repeated blocks (industries, menu items, stats...) as cards.
  function bodyHtml(list, open) {
    const loose = list.filter((f) => !f.group);
    const lists = new Map(); // listId -> Map(cardId -> fields)
    list.filter((f) => f.group).forEach((f) => {
      if (!lists.has(f.listId)) lists.set(f.listId, new Map());
      const cards = lists.get(f.listId);
      if (!cards.has(f.cardId)) cards.set(f.cardId, []);
      cards.get(f.cardId).push(f);
    });
    const looseHtml = loose.length ? `<div class="cms-fields">${loose.map(fieldHtml).join('')}</div><div class="card-save"><button type="button" class="btn small" data-save-all${draft.size ? '' : ' disabled'}>Save changes</button><span class="muted">Saves every change you made on this screen.</span></div>` : '';

    const listsHtml = Array.from(lists, ([listId, cards]) => {
      const sample = cards.values().next().value[0];
      const canAdd = sample.repeatable && modelFields(listId).length > 0;

      // Rows that cannot be added or deleted (the contact form's rows) are ONE card with every field in it.
      if (!sample.repeatable && cards.size > 1) {
        const all = Array.from(cards.values()).flat();
        const kind = KIND_NAMES[sample.groupKind] || `${sample.groupKind}s`;
        const editedN = all.filter(isEdited).length;
        return `<div class="cms-list"><div class="cms-cards">
          <details class="cms-card"${open ? ' open' : ''}>
            <summary><span class="card-title">${esc(kind)}</span>
              <span class="muted">(${all.length} items${editedN ? ', ' + editedN + ' edited' : ''})</span><span class="card-actions">${editBtn(open)}</span></summary>
            <div class="cms-fields">${all.map(fieldHtml).join('')}</div>
            <div class="card-save"><button type="button" class="btn small" data-save-all${draft.size ? '' : ' disabled'}>Save changes</button><span class="muted">Saves every change you made on this screen.</span></div>
          </details></div></div>`;
      }

      const cardsHtml = Array.from(cards.values(), (items) => {
        const first = items[0];
        const title = `${first.groupKind} ${first.groupNo}${first.groupLabel ? ' – ' + first.groupLabel : ''}`;
        const gone = deletedIds.has(first.cardId);
        const edited = items.filter(isEdited).length;
        let action = '';
        if (gone) {
          action = iconBtn('restore', 'Restore', `data-restore="${esc(first.cardId)}"`, 'secondary');
        } else {
          action = editBtn(open);
          if (first.repeatable) action += iconBtn('trash', 'Delete', `data-delete-card="${esc(first.cardId)}" data-name="${esc(title)}"`, 'danger');
        }
        return `
          <details class="cms-card${gone ? ' is-deleted' : ''}"${open && !gone ? ' open' : ''}>
            <summary><span class="card-title">${esc(title)}</span>
              <span class="muted">${gone ? '(deleted: hidden on the website)' : `(${items.length} items${edited ? ', ' + edited + ' edited' : ''})`}</span><span class="card-actions">${action}</span></summary>
            ${gone ? '' : `<div class="cms-fields">${items.map(fieldHtml).join('')}</div><div class="card-save"><button type="button" class="btn small" data-save-all${draft.size ? '' : ' disabled'}>Save changes</button><span class="muted">Saves every change you made on this screen.</span></div>`}
          </details>`;
      }).join('');

      const addedHtml = blocks.filter((b) => b.listId === listId).map((b) => {
        const formId = `edit|${b.key}`;
        if (!forms.has(formId)) openForm(formId, listId, b.key, b.fields);
        const name = snippet(Object.values(b.fields).find((v) => snippet(v, 3).length > 2 && !/^(assets|uploads)\//.test(v)) || '', 50);
        return `
          <details class="cms-card is-new">
            <summary><span class="card-title">New ${esc(sample.groupKind)}${name ? ' – ' + esc(name) : ''}</span> <span class="badge new">Added by you</span>
              <span class="card-actions">${editBtn(false)}${iconBtn('trash', 'Delete', `data-delete-block="${esc(b.key)}" data-name="${esc(name || 'this new item')}"`, 'danger')}</span></summary>
            ${formHtml(formId)}
          </details>`;
      }).join('');

      const addId = `add|${listId}`;
      const addHtml = !canAdd ? '' : forms.has(addId)
        ? `<div class="cms-card is-new add-box"><div class="add-title">New ${esc(sample.groupKind)}</div>${formHtml(addId)}</div>`
        : `<button type="button" class="btn secondary add-btn" data-add="${esc(listId)}">+ Add new ${esc(sample.groupKind.toLowerCase())}</button>`;

      const heading = lists.size > 1 ? `<h3 class="cms-list-title">${esc(sample.groupKind)} list</h3>` : '';
      return `<div class="cms-list">${heading}<div class="cms-cards">${cardsHtml}${addedHtml}</div>${addHtml}</div>`;
    }).join('');

    return looseHtml + listsHtml;
  }

  // A few of the words inside the section, so you can recognise it on the website.
  function previewOf(list) {
    const words = list.filter((f) => f.type === 'text' || f.type === 'html').map((f) => snippet(f.original, 40)).filter((t) => t.length > 2);
    return words.slice(0, 3).join('  •  ') || 'Images and links';
  }

  async function showSectionList(id) {
    viewEl.innerHTML = '<p class="empty">Loading...</p>';
    await loadPage(id);
    setHeader([{ label: pageTitle }], pageTitle, 'Choose a section to edit its text, images and links.');
    viewEl.innerHTML = `
      <div class="table-wrap"><table>
        <thead><tr><th>Section</th><th>What is in it</th><th>Items</th><th>Edited</th><th></th></tr></thead>
        <tbody>${Array.from(sectionsOf(),([section, list]) => {
          const edited = list.filter((f) => f.value !== null).length;
          const href = `#/page/${esc(id)}/${encodeURIComponent(section)}`;
          return `
          <tr>
            <td><a href="${href}"><strong>${esc(sectionName(section, id))}</strong></a></td>
            <td class="muted">${esc(previewOf(list))}</td>
            <td>${list.length}</td>
            <td>${edited ? `<span class="badge published">${edited} edited</span>` : '<span class="muted">-</span>'}</td>
            <td class="row-actions"><a class="btn small" href="${href}">Edit</a></td>
          </tr>`;
        }).join('')}
        </tbody>
      </table></div>`;
  }

  async function showSectionEditor(id, section) {
    viewEl.innerHTML = '<p class="empty">Loading...</p>';
    await loadPage(id);
    if (HIDDEN_SECTIONS.has(section)) { location.replace(`#/page/${id}`); return; }
    const list = fields.filter((f) => f.section === section);
    const name = sectionName(section, id);
    setHeader(
      [{ label: pageTitle, href: `#/page/${id}` }, { label: name }],
      name,
      'Click a box and type, then press "Save changes". Tip: select some words to make them bold, add a link or change their colour. New here? Open "Help & tutorial" in the menu.'
    );
    if (!list.length) {
      viewEl.innerHTML = '<p class="empty">This section has no items.</p>';
      return;
    }
    editorOpen = true;
    const note = SECTION_NOTES[section] || '';
    viewEl.innerHTML = `
      ${note}
      <div class="toolbar">
        <input class="search" id="filter" type="search" placeholder="Search in this section" aria-label="Search in this section">
        <span class="muted" id="count"></span>
      </div>
      <div class="cms-fields" id="cms-fields"></div>`;
    const box = document.getElementById('cms-fields');
    const filter = document.getElementById('filter');
    const count = document.getElementById('count');
    const render = () => {
      const list = fields.filter((f) => f.section === section); // fresh copy: fields are replaced after add/delete
      const needle = filter.value.trim().toLowerCase();
      const shown = list.filter((f) => !needle || `${f.label} ${f.original} ${effective(f)}`.toLowerCase().includes(needle));
      count.textContent = `${shown.length} of ${list.length} items`;
      // cards that were open stay open after a redraw (save, add, delete, restore)
      const openTitles = new Set(Array.from(box.querySelectorAll('details[open] > summary .card-title'), (t) => t.textContent));
      box.innerHTML = shown.length ? bodyHtml(shown, !!needle) : '<p class="empty">Nothing matches your search.</p>';
      box.querySelectorAll('details:not(.is-deleted)').forEach((d) => {
        const t = d.querySelector(':scope > summary .card-title');
        if (t && openTitles.has(t.textContent)) d.open = true;
      });
      updateSaveBar();
    };
    filter.addEventListener('input', render);
    rerender = render;
    render();
  }

  async function route() {
    showError('');
    editorOpen = false;
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    try {
      if (parts[0] === 'page' && parts[1] && parts[2]) await showSectionEditor(parts[1], parts[2]);
      else if (parts[0] === 'page' && parts[1]) await showSectionList(parts[1]);
      else { location.replace('#/page/index'); return; } // the pages are listed in the sidebar
    } catch (err) {
      viewEl.innerHTML = '';
      showError(err.message);
    }
    updateSaveBar();
  }

  // ---------- editing events (delegated on the view) ----------
  viewEl.addEventListener('input', (e) => {
    const formId = e.target.dataset && e.target.dataset.bform;
    if (formId) {
      const form = forms.get(formId);
      form.values[e.target.dataset.bkey] = readInput(e.target);
      form.touched = true;
      const preview = e.target.closest('.img-field') && e.target.closest('.img-field').querySelector('.img-preview');
      if (preview) preview.innerHTML = previewHtml(e.target.value);
      return;
    }
    const key = e.target.dataset && e.target.dataset.key;
    if (!key) return;
    const field = fields.find((f) => f.key === key);
    const value = readInput(e.target);
    setDraft(field, value === field.original ? null : value); // typing the original back = not edited
    const box = e.target.closest('.cms-field');
    box.classList.toggle('edited', isEdited(field));
    box.querySelector('[data-reset]').hidden = !isEdited(field);
    if (field.type === 'image') box.querySelector('.img-preview').innerHTML = previewHtml(value);
  });

  // Runs an add/delete/restore request, then redraws the section.
  // Only one such request at a time, so a double click cannot add or delete twice.
  let busy = false;
  async function act(request, doneMessage) {
    if (busy) return;
    busy = true;
    showError('');
    try {
      await request();
      await refreshData();
      rerender();
      toast(doneMessage);
    } catch (err) {
      const first = err.errors && Object.values(err.errors)[0];
      showError(first ? `${err.message} ${first}` : err.message);
    } finally {
      busy = false;
    }
  }

  // Unsaved work: edited fields, or text typed into an add / edit form of an added card.
  const hasUnsaved = () => draft.size > 0 || Array.from(forms.values()).some((f) => f.touched);

  const isRt = (el) => el && el.classList && el.classList.contains('rt');
  viewEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isRt(e.target)) { e.preventDefault(); document.execCommand('insertLineBreak'); }
  });
  viewEl.addEventListener('paste', (e) => {
    if (!isRt(e.target)) return;
    e.preventDefault(); // pasted text comes in as plain words, never with another program's formatting
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text.replace(/\s*\n\s*/g, ' '));
  });

  viewEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    const d = (btn && btn.dataset) || {};
    if (btn && btn.hasAttribute('data-edit-card')) {
      e.preventDefault(); // the button sits in the card title: we open/close the card ourselves
      const card = btn.closest('details');
      card.open = !card.open;
      return;
    }
    if (d.deleteCard || d.restore || d.deleteBlock) {
      e.preventDefault(); // the button sits inside a card title: do not open/close the card
      if (d.restore) {
        act(() => api(`/api/content/cards/${encodeURIComponent(d.restore)}`, { method: 'PUT', body: { deleted: false } }), 'Restored. It is visible on the website again.');
      } else if (d.deleteCard) {
        if (!confirm(`Delete "${d.name}"?

It will disappear from the website.`)) return;
        act(() => api(`/api/content/cards/${encodeURIComponent(d.deleteCard)}`, { method: 'PUT', body: { deleted: true } }), 'Deleted. It is hidden on the website.');
      } else {
        if (!confirm(`Delete "${d.name}"?

This removes the item you added for good. It cannot be undone.`)) return;
        act(() => api(`/api/content/blocks/${encodeURIComponent(d.deleteBlock)}`, { method: 'DELETE' }), 'Deleted.');
      }
      return;
    }
    if (btn && btn.hasAttribute('data-save-all')) {
      document.getElementById('save').click();
      return;
    }
    if (d.add) {
      openForm(`add|${d.add}`, d.add, null, null);
      rerender();
      return;
    }
    if (d.formCancel) {
      forms.delete(d.formCancel);
      rerender();
      return;
    }
    if (d.formSave) {
      const form = forms.get(d.formSave);
      const send = {};
      for (const [key, v] of Object.entries(form.values)) {
        const fld = fields.find((x) => x.key === key);
        if (form.blockKey || !fld || (fld.type !== 'image' && fld.type !== 'link') || String(v).trim()) send[key] = v;
      }
      if (!form.blockKey && !Object.entries(send).some(([key, v]) => { const fld = fields.find((x) => x.key === key); return fld && fld.type !== 'image' && fld.type !== 'link' && String(v).replace(/<[^>]*>/g, '').trim(); })) {
        showError('Fill in at least one box before adding.');
        return;
      }
      const request = form.blockKey
        ? () => api(`/api/content/blocks/${encodeURIComponent(form.blockKey)}`, { method: 'PUT', body: { fields: send } })
        : () => api('/api/content/blocks', { method: 'POST', body: { listId: form.listId, fields: send } });
      act(async () => {
        await request();
        forms.delete(d.formSave);
        if (form.blockKey) forms.delete(d.formSave);
      }, form.blockKey ? 'Saved.' : 'Added. It is now on the website.');
      return;
    }
    const key = e.target.dataset && e.target.dataset.reset;
    if (!key) return;
    const field = fields.find((f) => f.key === key);
    setDraft(field, null);
    replaceField(field);
  });

  // Image upload: read the file, send as base64, put the returned path in the box.
  viewEl.addEventListener('change', async (e) => {
    const formId = e.target.dataset && e.target.dataset.buploadForm;
    if (formId) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { showError('That image is larger than 5 MB.'); return; }
      showError('');
      try {
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Could not read the file.'));
          reader.readAsDataURL(file);
        });
        const { path } = await api('/api/content/upload', { method: 'POST', body: { data } });
        const form = forms.get(formId);
        form.values[e.target.dataset.buploadKey] = path;
        form.touched = true;
        const box = e.target.closest('.img-field');
        box.querySelector('input[type="text"]').value = path;
        box.querySelector('.img-preview').innerHTML = previewHtml(path);
      } catch (err) {
        showError(err.message);
      }
      return;
    }
    const key = e.target.dataset && e.target.dataset.upload;
    const file = key && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showError('That image is larger than 5 MB.'); return; }
    showError('');
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Could not read the file.'));
        reader.readAsDataURL(file);
      });
      const { path } = await api('/api/content/upload', { method: 'POST', body: { data } });
      const field = fields.find((f) => f.key === key);
      setDraft(field, path);
      replaceField(field);
      toast('Image uploaded. Press "Save changes" to publish it.');
    } catch (err) {
      showError(err.message);
    }
  });

  viewEl.addEventListener('toggle', (e) => {
    const b = e.target.querySelector && e.target.querySelector(':scope > summary [data-edit-card]');
    if (b) b.replaceWith(Object.assign(document.createElement('div'), { innerHTML: editBtn(e.target.open) }).firstElementChild);
  }, true);

  document.getElementById('discard').addEventListener('click', () => {
    draft.clear();
    forms.clear(); // typed-but-unsaved add / edit forms are discarded too
    updateSaveBar();
    route();
  });

  document.getElementById('save').addEventListener('click', async () => {
    const button = document.getElementById('save');
    button.disabled = true;
    showError('');
    try {
      await api(`/api/content/pages/${pageId}`, { method: 'PUT', body: { values: Object.fromEntries(draft) } });
      toast('Saved. The website now shows your changes.');
      draft.clear();
      // Reload the values and redraw in place: open cards, add forms and the scroll position stay as they were.
      await refreshData();
      rerender();
    } catch (err) {
      const first = err.errors && Object.values(err.errors)[0];
      showError(first ? `${err.message} ${first}` : err.message);
    } finally {
      updateSaveBar(); // re-enables Save only if something is still unsaved
    }
  });

  // Warn before leaving with unsaved edits (moving to another page of the editor, or closing the tab).
  let reverting = false;
  window.addEventListener('hashchange', () => {
    if (reverting) { reverting = false; return; }
    if (hasUnsaved() && !confirm('You have unsaved changes. Leave without saving?')) {
      reverting = true;
      location.hash = shownHash; // go back to where we were
      return;
    }
    draft.clear();
    forms.clear();
    shownHash = location.hash;
    route();
  });
  window.addEventListener('beforeunload', (e) => {
    if (hasUnsaved()) { e.preventDefault(); e.returnValue = ''; }
  });

  route();
})();
