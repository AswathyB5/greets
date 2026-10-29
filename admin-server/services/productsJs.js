// Reads and rewrites the data blocks (CATALOG, PHOTOS, IND ...) inside the website's products.js.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { SITE_DIR } = require('../config/site');

const FILE = path.join(SITE_DIR, 'products.js');

// Finds `const NAME = <expression>;` and returns the text range of <expression>.
function findConst(code, name) {
  const marker = `const ${name} = `;
  const start = code.indexOf(marker);
  if (start === -1) throw new Error(`products.js has no "${marker.trim()}"`);
  const from = start + marker.length;
  let depth = 0;
  let quote = null;
  for (let i = from; i < code.length; i++) {
    const ch = code[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'" || ch === '`') quote = ch;
    else if (ch === '/' && code[i + 1] === '*') { i = code.indexOf('*/', i + 2) + 1; } // comment
    else if (ch === '/' && code[i + 1] === '/') { i = code.indexOf('\n', i); }
    else if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') depth--;
    else if (ch === ';' && depth === 0) return { from, to: i };
  }
  throw new Error(`Could not find the end of ${name} in products.js`);
}

function readConst(code, name) {
  const { from, to } = findConst(code, name);
  return vm.runInNewContext('(' + code.slice(from, to).trim() + ')');
}

function readSource() {
  return fs.readFileSync(FILE, 'utf8');
}

function replaceConst(code, name, value) {
  const { from, to } = findConst(code, name);
  const json = JSON.stringify(value, null, 2).split('\n').map((line, i) => (i === 0 ? line : '  ' + line)).join('\n');
  return code.slice(0, from) + json + code.slice(to);
}

module.exports = { FILE, findConst, readConst, readSource, replaceConst };
