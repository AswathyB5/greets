const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace #/brand/cat/machine with brand/cat/machine/
indexHtml = indexHtml.replace(/href="#\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)"/g, 'href="$1/$2/$3/"');

// Replace #/brand/cat with brand/cat/
indexHtml = indexHtml.replace(/href="#\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)"/g, 'href="$1/$2/"');

// Replace #/brand with brand/
indexHtml = indexHtml.replace(/href="#\/(bmi|novatec|huasheng)"/g, 'href="$1/"');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html links to static URLs.');

// 2. Update products.js
let productsJs = fs.readFileSync('products.js', 'utf8');

// Update IDX hrefs to clean URLs
productsJs = productsJs.replace(
  'href: "#/" + b.id + "/" + c.id + "/" + m.id,',
  'href: b.id + "/" + c.id + "/" + m.id + "/",'
);

// Update mega menu links in products.js
productsJs = productsJs.replace(
  'href="#/\' + b.id + \'"',
  'href="\' + b.id + \'/"'
);
productsJs = productsJs.replace(
  'href="#/\' + b.id + \'/\' + c.id + \'"',
  'href="\' + b.id + \'/\' + c.id + \'/"'
);

// Update mobile nav links in products.js
productsJs = productsJs.replace(
  'href="#/\' + b.id + \'"',
  'href="\' + b.id + \'/"'
);
productsJs = productsJs.replace(
  'href="#/\' + b.id + \'/\' + c.id + \'"',
  'href="\' + b.id + \'/\' + c.id + \'/"'
);

fs.writeFileSync('products.js', productsJs, 'utf8');
console.log('Updated products.js links to static URLs.');
