/* Greets CMS loader.
   Every editable piece of the page carries a marker attribute (data-cms,
   data-cms-src, data-cms-href, ...). This script asks the admin server which
   markers have been edited and swaps in the new text / images / links.
   If the server is unreachable the page simply shows what is written in the HTML.

   When the site is hosted somewhere other than localhost, set the address of the
   admin server BEFORE this script, e.g.
     <script>window.GREETS_CMS_API = "https://admin.example.com";</script> */
(function () {
  'use strict';

  // main.js (loaded first) sets window.GREETS_CMS_API; this is the same rule in case it is not on the page.
  var local = /^(localhost|127\.0\.0\.1|)$/.test(location.hostname); // empty = the page was opened as a file
  var API = (window.GREETS_CMS_API || (local ? 'http://localhost:5000' : location.origin)).replace(/\/$/, '');
  var page = document.body ? document.body.getAttribute('data-cms-page') : null;
  var CACHE_KEY = 'greets-cms:' + (page || location.pathname);

  var INLINE_OK = { A: 1, STRONG: 1, EM: 1, B: 1, I: 1, BR: 1, SPAN: 1, U: 1, SMALL: 1, SUP: 1, SUB: 1, MARK: 1, ABBR: 1, CODE: 1, WBR: 1 };

  function safeUrl(url) {
    return /^\s*(javascript|data|vbscript):/i.test(url) ? '#' : url;
  }

  // Uploaded pictures live on the admin server; site pictures are relative paths.
  function imageUrl(value) {
    return /^uploads\//.test(value) ? API + '/' + value : safeUrl(value);
  }

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

  // Keeps only simple formatting tags from edited rich text.
  function cleanHtml(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) return;
        if (child.nodeType !== 1 || !INLINE_OK[child.tagName]) {
          child.parentNode.replaceChild(document.createTextNode(child.textContent || ''), child);
          return;
        }
        Array.prototype.slice.call(child.attributes).forEach(function (attr) {
          var name = attr.name.toLowerCase();
          var ok = name === 'class' || name === 'target' || name === 'rel' || (name === 'href' && safeUrl(attr.value) !== '#');
          if (name === 'style') { // only colour, bold, underline / none, italic
            var clean = cleanStyle(attr.value);
            if (clean) child.setAttribute('style', clean); else child.removeAttribute('style');
            return;
          }
          if (!ok) child.removeAttribute(attr.name);
        });
        walk(child);
      });
    })(tpl.content);
    return tpl.innerHTML;
  }

  function each(root, attr, fn) {
    var nodes = Array.prototype.slice.call(root.querySelectorAll('[' + attr + ']'));
    if (root.nodeType === 1 && root.hasAttribute(attr)) nodes.unshift(root);
    nodes.forEach(fn);
  }

  // Puts the values v (key -> text) into every marked element inside root.
  function applyValues(root, v, t) {
    function has(key) { return Object.prototype.hasOwnProperty.call(v, key); }

    each(root, 'data-cms', function (el) {
      var key = el.getAttribute('data-cms');
      if (!has(key)) return;
      var oldText = el.textContent.trim();
      if (t[key] === 'html') el.innerHTML = cleanHtml(v[key]);
      else el.textContent = v[key];
      if (el.tagName === 'OPTION' && el.getAttribute('value') === oldText) el.setAttribute('value', v[key]); // dropdown: submitted value follows the text
      if (el.hasAttribute('data-count')) el.setAttribute('data-count', v[key]); // keeps the number animation in step
    });
    each(root, 'data-cms-src', function (el) {
      var key = el.getAttribute('data-cms-src');
      if (!has(key)) return;
      el.removeAttribute('srcset');
      if (el.parentNode && el.parentNode.tagName === 'PICTURE') {
        Array.prototype.forEach.call(el.parentNode.querySelectorAll('source'), function (s) { s.remove(); });
      }
      el.setAttribute('src', imageUrl(v[key]));
    });
    each(root, 'data-cms-alt', function (el) {
      var key = el.getAttribute('data-cms-alt');
      if (has(key)) el.setAttribute('alt', v[key]);
    });
    each(root, 'data-cms-ph', function (el) {
      var key = el.getAttribute('data-cms-ph');
      if (has(key)) el.setAttribute('placeholder', v[key]);
    });
    each(root, 'data-cms-href', function (el) {
      var key = el.getAttribute('data-cms-href');
      if (has(key)) el.setAttribute('href', safeUrl(v[key]));
    });
    each(root, 'data-cms-bg', function (el) {
      var key = el.getAttribute('data-cms-bg');
      if (has(key)) el.style.backgroundImage = 'url("' + imageUrl(v[key]).replace(/"/g, '%22') + '")';
    });
  }

  // Every marked spot inside root (text, image, link...), in page order.
  var MARKERS = ['data-cms-bg', 'data-cms-src', 'data-cms-alt', 'data-cms-href', 'data-cms-ph', 'data-cms'];
  function markerEntries(root) {
    var out = [];
    [root].concat(Array.prototype.slice.call(root.querySelectorAll('*'))).forEach(function (el) {
      MARKERS.forEach(function (attr) {
        if (el.hasAttribute(attr)) out.push({ el: el, attr: attr, key: el.getAttribute(attr) });
      });
    });
    return out;
  }

  // Delete = hide the original card. Add = copy the model card and fill it with the new values.
  // Remembers each card (and where it sits) the first time we see it. A deleted dropdown choice
  // is taken out of the page completely, and this copy is still there to build new cards from.
  var cardModels = {};
  function rememberCards() {
    each(document, 'data-cms-card', function (el) {
      var id = el.getAttribute('data-cms-card');
      if (!cardModels[id]) cardModels[id] = { el: el.cloneNode(true), parent: el.parentNode };
    });
  }

  function applyCards(data) {
    var v = data.values || {};
    var t = data.types || {};
    rememberCards();

    each(document, 'data-cms-added', function (el) { el.remove(); }); // start clean (this runs twice per visit)

    var keys = Object.keys(v).sort();
    keys.forEach(function (key) {
      if (t[key] !== 'block') return;
      var block;
      try { block = JSON.parse(v[key]); } catch (e) { return; }
      var remembered = cardModels[block.template];
      var live = document.querySelector('[data-cms-card="' + block.template + '"]');
      var model = live || (remembered && remembered.el);
      var parent = live ? live.parentNode : remembered && remembered.parent;
      if (!model || !parent) return;

      var copy = model.cloneNode(true);
      copy.style.removeProperty('display');
      var fields = block.fields || {};
      var types = t;
      // Shared cards (header/footer) can have slightly different text on another page, so their
      // keys differ. When the card has the same shape, fill the unknown spots by position.
      var entries = markerEntries(copy);
      var blockKeys = Object.keys(fields);
      if (entries.length === blockKeys.length) {
        fields = Object.assign({}, fields);
        types = Object.assign({}, t);
        entries.forEach(function (en, i) {
          if (!Object.prototype.hasOwnProperty.call(block.fields, en.key)) {
            fields[en.key] = block.fields[blockKeys[i]];
            types[en.key] = t[blockKeys[i]];
          }
        });
      }
      applyValues(copy, fields, types);
      [copy].concat(Array.prototype.slice.call(copy.querySelectorAll('*'))).forEach(function (el) {
        Array.prototype.slice.call(el.attributes).forEach(function (a) {
          if (/^data-cms/.test(a.name) || a.name === 'data-anim' || a.name === 'data-anim-delay' || a.name === 'id') el.removeAttribute(a.name);
        });
      });
      copy.setAttribute('data-cms-added', key);
      copy.classList.add('visible', 'anim-in'); // skip the scroll-in animation so it is never stuck invisible
      copy.style.opacity = '1';
      copy.style.transform = 'none';

      var siblings = parent.children;
      var last = null;
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].hasAttribute('data-cms-card') || siblings[i].hasAttribute('data-cms-added')) last = siblings[i];
      }
      parent.insertBefore(copy, last ? last.nextSibling : null);
    });

    keys.forEach(function (key) {
      if (t[key] !== 'deleted') return;
      var card = document.querySelector('[data-cms-card="' + key.slice(0, -'.deleted'.length) + '"]');
      if (!card) return;
      // Some browsers ignore "display: none" on a dropdown choice, so those are removed.
      if (card.tagName === 'OPTION') card.remove();
      else card.style.setProperty('display', 'none', 'important');
    });
  }

  var SOCIAL = {
    og_title: ['property', 'og:title'], og_description: ['property', 'og:description'], og_image: ['property', 'og:image'],
    twitter_title: ['name', 'twitter:title'], twitter_description: ['name', 'twitter:description'], twitter_image: ['name', 'twitter:image']
  };

  var lastData = null;
  window.greetsCmsApply = function () { if (lastData) apply(lastData); };

  function apply(data) {
    lastData = data;
    var v = data.values || {};
    function has(key) { return Object.prototype.hasOwnProperty.call(v, key); }
    applyValues(document, v, data.types || {});
    applyCards(data);

    // Messages used by main.js (popup after sending the enquiry form, button texts...).
    var msg = {};
    Object.keys(v).forEach(function (k) {
      if (k.indexOf('global.messages.') === 0) msg[k.slice('global.messages.'.length)] = v[k];
    });
    window.GREETS_MSG = msg;

    // Social sharing tags in <head>.
    if (page) {
      Object.keys(SOCIAL).forEach(function (name) {
        var key = page + '.meta.' + name;
        if (!has(key)) return;
        var tag = document.querySelector('meta[' + SOCIAL[name][0] + '="' + SOCIAL[name][1] + '"]');
        if (tag) tag.setAttribute('content', /_image$/.test(name) ? imageUrl(v[key]) : v[key]);
      });
    }

    // Page title and search-engine description.
    if (page) {
      if (has(page + '.meta.title')) document.title = v[page + '.meta.title'];
      if (has(page + '.meta.description')) {
        var meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', v[page + '.meta.description']);
      }
    }
  }

  function readCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { return null; }
  }
  function writeCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch (e) { /* storage blocked: fine */ }
  }

  function run() {
    if (!page) return;
    var cached = readCache();
    if (cached) apply(cached); // show the last known edits instantly, no flicker

    fetch(API + '/api/public/content/' + encodeURIComponent(page))
      .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
      .then(function (fresh) {
        var removed = cached && Object.keys(cached.values || {}).some(function (k) { return !(k in fresh.values); });
        writeCache(fresh);
        if (removed) { location.reload(); return; } // an edit was reset: reload to show the original again
        apply(fresh);
      })
      .catch(function () { /* server offline: keep what is on the page */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
