// The article text editor of the Blog section: a toolbar on top of an editable area.
//   const rte = window.BlogEditor.mount(hostElement, htmlText, { onChange, upload });
//   rte.getHtml()   -> the text as HTML (what is saved)
// It uses the browser's own editing commands (document.execCommand) and writes colours / sizes as inline styles.
// The server cleans the result again before anything reaches the website (services/blogPublish.js).
(function () {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Pictures inside the text are stored as site paths ("assets/blog/x.png" / "uploads/x.png"); the editor page
  // lives in /admin/, so it shows them from /site/ and /uploads/ and converts back when saving.
  const previewUrl = (v) => (/^(https?:)?\/\//i.test(v) || v.startsWith('/') ? v : v.startsWith('uploads/') ? '/' + v : '/site/' + v);
  const toEditor = (html) => String(html || '').replace(/<img ([^>]*?)src="([^"]*)"/g, (all, b, src) => `<img ${b}src="${previewUrl(src)}"`);
  const fromEditor = (html) => String(html || '').replace(/<img ([^>]*?)src="([^"]*)"/g, (all, b, src) => {
    if (src.startsWith('/uploads/')) return `<img ${b}src="${src.slice(1)}"`;
    if (src.startsWith('/site/')) return `<img ${b}src="${src.slice(6)}"`;
    return all;
  });

  const btn = (cmd, label, title, extra) => `<button type="button" class="rt-btn" data-cmd="${cmd}" title="${esc(title)}" aria-label="${esc(title)}"${extra || ''}>${label}</button>`;
  const colour = (id, label, title, value) => `<label class="rt-btn rt-colour" title="${esc(title)}">${label}<input type="color" id="${id}" value="${value}" aria-label="${esc(title)}"></label>`;

  function mount(host, initialHtml, options) {
    const opts = options || {};
    const changed = () => { if (opts.onChange) opts.onChange(); };

    host.innerHTML = `
      <div class="rt">
        <div class="rt-bar" id="rt-bar">
          <div class="rt-group">
            ${btn('undo', '&#8630;', 'Undo')}${btn('redo', '&#8631;', 'Redo')}
          </div>
          <div class="rt-group">
            <select id="rt-block" title="Text style" aria-label="Text style">
              <option value="p">Paragraph</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option><option value="blockquote">Quote</option>
            </select>
            <select id="rt-size" title="Text size" aria-label="Text size">
              <option value="">Size</option><option value="2">Small</option><option value="3">Normal</option><option value="5">Large</option><option value="6">Larger</option>
            </select>
          </div>
          <div class="rt-group">
            ${btn('bold', '<b>B</b>', 'Bold')}${btn('italic', '<i>I</i>', 'Italic')}${btn('underline', '<u>U</u>', 'Underline')}${btn('strikeThrough', '<s>S</s>', 'Strike-through')}
          </div>
          <div class="rt-group">
            ${colour('rt-fore', '<span class="rt-a">A</span>', 'Text colour', '#02963c')}
            ${colour('rt-back', '<span class="rt-hl">ab</span>', 'Highlight colour', '#fff59d')}
            ${btn('resetColour', 'A&#215;', 'Back to the normal text colour (select the text first)')}
          </div>
          <div class="rt-group">
            ${btn('justifyLeft', '&#8676;', 'Align left')}${btn('justifyCenter', '&#8596;', 'Centre')}${btn('justifyRight', '&#8677;', 'Align right')}${btn('justifyFull', '&#9776;', 'Justify')}
          </div>
          <div class="rt-group">
            ${btn('insertUnorderedList', '&bull; List', 'Bulleted list')}${btn('insertOrderedList', '1. List', 'Numbered list')}
          </div>
          <div class="rt-group">
            ${btn('link', 'Link', 'Add a link to the selected text')}${btn('unlink', 'Unlink', 'Remove the link')}
            ${colour('rt-link-colour', '<span class="rt-a">Link</span>', 'Link colour (click inside the link or select it first)', '#02963c')}
          </div>
          <div class="rt-group">
            ${btn('tablePanel', 'Table', 'Insert a table')}${btn('hr', '&#8212;', 'Divider line')}${btn('image', 'Picture', 'Insert a picture')}
            <input type="file" id="rt-image-file" accept="image/png,image/jpeg,image/gif,image/webp" hidden>
          </div>
          <div class="rt-group">
            ${btn('clear', 'Clear', 'Remove formatting from the selected text')}${btn('source', 'HTML', 'Edit the HTML directly')}
          </div>
        </div>

        <div class="rt-panel" id="rt-table-panel" hidden>
          <strong>Insert a table</strong>
          <label>Rows <input type="number" id="rt-rows" min="1" max="30" value="3"></label>
          <label>Columns <input type="number" id="rt-cols" min="1" max="12" value="3"></label>
          <label class="rt-check"><input type="checkbox" id="rt-header" checked> First row is a heading row</label>
          <button type="button" class="btn small" id="rt-table-insert">Insert table</button>
          <button type="button" class="btn small secondary" id="rt-table-cancel">Cancel</button>
        </div>

        <div class="rt-panel rt-tools" id="rt-table-tools" hidden>
          <strong>Table</strong>
          <button type="button" class="rt-btn" data-table="rowAbove">+ Row above</button>
          <button type="button" class="rt-btn" data-table="rowBelow">+ Row below</button>
          <button type="button" class="rt-btn" data-table="colLeft">+ Column left</button>
          <button type="button" class="rt-btn" data-table="colRight">+ Column right</button>
          <button type="button" class="rt-btn" data-table="delRow">&minus; Row</button>
          <button type="button" class="rt-btn" data-table="delCol">&minus; Column</button>
          <button type="button" class="rt-btn" data-table="delTable">Delete table</button>
        </div>

        <div id="rt-editor" class="rt-editor" contenteditable="true" spellcheck="true"></div>
        <textarea id="rt-source" class="rt-source" rows="20" hidden></textarea>
      </div>`;

    const bar = host.querySelector('#rt-bar');
    const editor = host.querySelector('#rt-editor');
    const source = host.querySelector('#rt-source');
    const tablePanel = host.querySelector('#rt-table-panel');
    const tableTools = host.querySelector('#rt-table-tools');
    const blockSelect = host.querySelector('#rt-block');
    const sizeSelect = host.querySelector('#rt-size');
    editor.innerHTML = toEditor(initialHtml);
    // pressing Enter starts a real paragraph (<p>), which is what the article page styles, not a bare <div>
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) { /* fine */ }
    let sourceMode = false;

    // ----- remembering the selection (clicking a colour box or a menu moves the focus away from the text) -----
    let saved = null;
    const inEditor = (node) => node && editor.contains(node.nodeType === 3 ? node.parentNode : node);
    function saveSelection() {
      const sel = window.getSelection();
      if (sel && sel.rangeCount && inEditor(sel.anchorNode)) saved = sel.getRangeAt(0).cloneRange();
    }
    function restoreSelection() {
      editor.focus();
      if (!saved) return;
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(saved);
    }
    const closest = (selector) => {
      const sel = window.getSelection();
      let node = sel && sel.anchorNode && inEditor(sel.anchorNode) ? sel.anchorNode : (saved && saved.startContainer);
      if (!node || !inEditor(node)) return null;
      if (node.nodeType === 3) node = node.parentNode;
      return node.closest ? node.closest(selector) : null;
    };

    function exec(command, value) {
      restoreSelection();
      document.execCommand('styleWithCSS', false, true); // colours and sizes become style="..." (not <font>)
      document.execCommand(command, false, value);
      saveSelection();
      refreshState();
      changed();
    }

    // keep the menus and table tools in step with where the cursor is
    function refreshState() {
      if (sourceMode) return;
      let block = 'p';
      try { block = String(document.queryCommandValue('formatBlock') || 'p').toLowerCase().replace(/[<>]/g, ''); } catch (e) { /* fine */ }
      blockSelect.value = ['p', 'h2', 'h3', 'h4', 'blockquote'].includes(block) ? block : 'p';
      bar.querySelectorAll('[data-cmd="bold"],[data-cmd="italic"],[data-cmd="underline"],[data-cmd="strikeThrough"],[data-cmd="insertUnorderedList"],[data-cmd="insertOrderedList"]').forEach((b) => {
        let on = false;
        try { on = document.queryCommandState(b.dataset.cmd); } catch (e) { /* fine */ }
        b.classList.toggle('on', on);
      });
      tableTools.hidden = !closest('td,th');
    }
    document.addEventListener('selectionchange', () => { if (inEditor(window.getSelection().anchorNode)) { saveSelection(); refreshState(); } });
    editor.addEventListener('input', changed);

    // ----- toolbar -----
    // mousedown must not take the focus from the text, or the selection is lost
    bar.addEventListener('mousedown', (e) => { if (e.target.closest('.rt-btn') && !e.target.closest('.rt-colour')) e.preventDefault(); });
    tableTools.addEventListener('mousedown', (e) => { if (e.target.closest('.rt-btn')) e.preventDefault(); });

    bar.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-cmd]');
      if (!b) return;
      const cmd = b.dataset.cmd;
      if (cmd === 'source') return toggleSource(b);
      if (sourceMode) return;
      if (cmd === 'link') return addLink();
      if (cmd === 'tablePanel') { tablePanel.hidden = !tablePanel.hidden; return; }
      if (cmd === 'hr') return exec('insertHorizontalRule');
      if (cmd === 'image') return host.querySelector('#rt-image-file').click();
      if (cmd === 'clear') { exec('removeFormat'); return exec('unlink'); }
      if (cmd === 'resetColour') return exec('foreColor', 'inherit');
      exec(cmd);
    });

    blockSelect.addEventListener('change', () => { if (!sourceMode) exec('formatBlock', blockSelect.value); });
    sizeSelect.addEventListener('change', () => { if (!sourceMode && sizeSelect.value) exec('fontSize', sizeSelect.value); sizeSelect.value = ''; });

    // colours: changing the box applies it to the selected text
    host.querySelector('#rt-fore').addEventListener('input', (e) => { if (!sourceMode) exec('foreColor', e.target.value); });
    host.querySelector('#rt-back').addEventListener('input', (e) => { if (!sourceMode) exec('hiliteColor', e.target.value); });
    host.querySelector('#rt-link-colour').addEventListener('input', (e) => {
      if (sourceMode) return;
      // a cursor inside a link (nothing selected) colours the whole link
      const link = closest('a');
      if (link && saved && saved.collapsed) { const r = document.createRange(); r.selectNodeContents(link); saved = r; }
      exec('foreColor', e.target.value);
    });

    function addLink() {
      restoreSelection();
      const text = String(window.getSelection());
      const href = (prompt('Link address (for example https://www.greetsequipment.com/contact):', 'https://') || '').trim();
      if (!href) return;
      if (!/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(href)) { alert('The link must start with https://, /, mailto: or tel:'); return; }
      if (text) exec('createLink', href);
      else exec('insertHTML', `<a href="${esc(href)}">${esc(href)}</a>`);
    }

    // ----- picture -----
    host.querySelector('#rt-image-file').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file || !opts.upload) return;
      try {
        const path = await opts.upload(file);
        const alt = prompt('Describe the picture in a few words (for Google and screen readers):', '') || '';
        exec('insertHTML', `<img src="${esc(previewUrl(path))}" alt="${esc(alt)}">`);
      } catch (err) { alert(err.message || 'The picture could not be uploaded.'); }
    });

    // ----- tables -----
    host.querySelector('#rt-table-cancel').addEventListener('click', () => { tablePanel.hidden = true; });
    host.querySelector('#rt-table-insert').addEventListener('click', () => {
      const rows = Math.min(30, Math.max(1, Number(host.querySelector('#rt-rows').value) || 3));
      const cols = Math.min(12, Math.max(1, Number(host.querySelector('#rt-cols').value) || 3));
      const header = host.querySelector('#rt-header').checked;
      const cell = (tag, text) => `<${tag}>${text}</${tag}>`;
      let html = '<table><tbody>';
      for (let r = 0; r < rows; r++) {
        html += '<tr>';
        for (let c = 0; c < cols; c++) html += r === 0 && header ? cell('th', `Heading ${c + 1}`) : cell('td', '<br>');
        html += '</tr>';
      }
      html += '</tbody></table><p><br></p>';
      tablePanel.hidden = true;
      exec('insertHTML', html);
    });

    tableTools.addEventListener('click', (e) => {
      const b = e.target.closest('[data-table]');
      if (!b) return;
      const cell = closest('td,th');
      if (!cell) return;
      const row = cell.parentElement;
      const table = cell.closest('table');
      const index = cell.cellIndex;
      const blank = (tag) => { const c = document.createElement(tag); c.innerHTML = tag === 'th' ? 'Heading' : '<br>'; return c; };
      switch (b.dataset.table) {
        case 'rowAbove':
        case 'rowBelow': {
          const copy = document.createElement('tr');
          for (let i = 0; i < row.cells.length; i++) copy.appendChild(blank('td'));
          row.parentElement.insertBefore(copy, b.dataset.table === 'rowAbove' ? row : row.nextSibling);
          break;
        }
        case 'colLeft':
        case 'colRight':
          [...table.rows].forEach((r) => {
            const ref = r.cells[index];
            const c = blank(ref && ref.tagName === 'TH' ? 'th' : 'td');
            r.insertBefore(c, b.dataset.table === 'colLeft' ? ref || null : (ref && ref.nextSibling) || null);
          });
          break;
        case 'delRow':
          if (table.rows.length <= 1) table.remove(); else row.remove();
          break;
        case 'delCol':
          if (row.cells.length <= 1) table.remove(); else [...table.rows].forEach((r) => { if (r.cells[index]) r.cells[index].remove(); });
          break;
        case 'delTable':
          table.remove();
          break;
        default:
      }
      saved = null;
      tableTools.hidden = true;
      changed();
    });

    // ----- paste as plain text, so nothing odd comes along from Word or a web page -----
    editor.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
    });
    editor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); addLink(); }
    });

    // ----- HTML view -----
    function toggleSource(button) {
      sourceMode = !sourceMode;
      if (sourceMode) {
        source.value = fromEditor(editor.innerHTML);
        editor.hidden = true; source.hidden = false;
        tablePanel.hidden = true; tableTools.hidden = true;
        button.classList.add('on'); button.textContent = 'Editor';
        bar.classList.add('source');
      } else {
        editor.innerHTML = toEditor(source.value);
        source.hidden = true; editor.hidden = false;
        button.classList.remove('on'); button.textContent = 'HTML';
        bar.classList.remove('source');
      }
    }
    source.addEventListener('input', changed);

    return {
      getHtml: () => (sourceMode ? source.value : fromEditor(editor.innerHTML)),
    };
  }

  window.BlogEditor = { mount };
})();
