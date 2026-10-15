const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Novatec-machine-photos');
const destDir = path.join(__dirname, 'assets', 'catalog');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let copiedCount = 0;
const files = fs.readdirSync(srcDir);
files.forEach(f => {
  if (f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp')) {
    const src = path.join(srcDir, f);
    const dst = path.join(destDir, f);
    fs.copyFileSync(src, dst);
    copiedCount++;
  }
});
console.log(`Copied ${copiedCount} Novatec machine photos to assets/catalog.`);

// Rebuild static pages
require('./build_pages.js');
