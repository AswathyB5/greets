const fs = require('fs');
const path = require('path');

// 1. Copy photos to assets/catalog
const catalogDir = path.join(__dirname, 'assets', 'catalog');
if (!fs.existsSync(catalogDir)) fs.mkdirSync(catalogDir, { recursive: true });

function copyDir(srcDir) {
  const files = fs.readdirSync(srcDir);
  files.forEach(f => {
    if (f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp')) {
      const src = path.join(srcDir, f);
      const dst = path.join(catalogDir, f);
      fs.copyFileSync(src, dst);
    }
  });
}

copyDir(path.join(__dirname, 'Novatec-machine-photos'));
copyDir(path.join(__dirname, 'Huasheng-machine-photos'));
console.log('Copied all photos from Novatec-machine-photos and Huasheng-machine-photos to assets/catalog.');

// 2. Overwrite legacy fallback images in assets/catalog with exact photos so ANY old references load the right image
const legacyReplacements = {
  // Novatec legacy files
  'nm_implants.jpg': 'MEDICAL-combined-layout-drawing.jpg',
  'nm_urs.jpg': 'MEDICAL-combined-layout-drawing.jpg',
  'nm_ipc.jpg': 'MEDICAL-IPC-2CRD400.jpg',
  'nm_fcps.jpg': 'MEDICAL-FCPS-cleanroom-line-01.jpg',
  'nm_fpi.jpg': 'MEDICAL-FPI-system-drawing.jpg',
  'nm_pluri.jpg': 'PLURITANK-1400-line-overview.jpg',
  'crd_green.jpg': '2CRD400-front.jpg',
  'nov_main.jpg': 'PLURITANK-1400-line-and-loading.jpg',
  'nov_gen.jpg': 'PLURITANK-1400-ultrasonic-generators.jpg',
  'nm_clean.jpg': 'PLURITANK-cleanroom-line-01.jpg',
  'nm_brand.jpg': 'PLURITANK-1400-line-overview.jpg',

  // Huasheng legacy files
  'hs_pvd.jpg': 'GFOUR.jpg',
  'hs_diamond.jpg': 'DA600PRO.jpg',
  'hs_dlc.jpg': 'TC800PLUS.jpg',
  'hs_tc802.jpg': 'TC800PLUS.jpg',
  'hs_mc1000.jpg': 'HUASHENG-OPT-machine.jpg',
  'hs_optical.jpg': 'HUASHENG-OPT-machine.jpg',
  'hs_md.jpg': 'MD500.jpg',
  'hs_md1500.jpg': 'MD1500-drawing.jpg',
  'hs_hipims.jpg': 'WCC800.jpg',
  'hs_ma1500.jpg': 'MD800-PLUS.jpg',
  'ma800.jpg': 'MD800-PLUS.jpg',
  'turnkey.jpg': 'MD800-PLUS.jpg'
};

for (const [legacy, real] of Object.entries(legacyReplacements)) {
  const realPath = path.join(catalogDir, real);
  const legacyPath = path.join(catalogDir, legacy);
  if (fs.existsSync(realPath)) {
    fs.copyFileSync(realPath, legacyPath);
  }
}
console.log('Updated legacy image files in assets/catalog.');

// 3. Update products.js to remove wrong fallbacks (like hs_ma1500 for CVD category)
let productsCode = fs.readFileSync('products.js', 'utf8');

// Ensure Huasheng cvd category does NOT display hs_ma1500 (an arc machine)
productsCode = productsCode.replace(
  /"id":\s*"cvd",\s*"family":\s*"CVD & CVA coating",\s*"photo":\s*"hs_ma1500"/,
  '"id": "cvd",\n        "family": "CVD & CVA coating",\n        "photo": null'
);

// In products.js, ensure ep photo is not PLURITANK-compact-line
productsCode = productsCode.replace(
  /"id":\s*"ep",\s*"family":\s*"EP",\s*"photo":\s*"nov_plt_compact"/,
  '"id": "ep",\n            "family": "EP",\n            "photo": "nov_med_basket2"'
);

fs.writeFileSync('products.js', productsCode, 'utf8');
console.log('Updated products.js.');

// 4. Run build_pages.js to generate fresh static pages
require('./build_pages.js');
console.log('Ran build_pages.js successfully.');

// 5. Update every single HTML file across novatec/ and huasheng/
// Map machine identifiers / slugs to their exact photos
const photoBySlug = {
  // Huasheng
  'gfour': 'Huasheng-machine-photos/GFOUR.jpg',
  'md200': 'Huasheng-machine-photos/MD200.jpg',
  'md500': 'Huasheng-machine-photos/MD500.jpg',
  'md800': 'Huasheng-machine-photos/MD800-PLUS.jpg',
  'md800-plus': 'Huasheng-machine-photos/MD800-PLUS.jpg',
  'md800-turnkey': 'Huasheng-machine-photos/MD800-PLUS.jpg',
  'md1500': 'Huasheng-machine-photos/MD1500-drawing.jpg',
  'hd500': 'Huasheng-machine-photos/HD500.jpg',
  'hd800': 'Huasheng-machine-photos/HD500.jpg',
  'wcc800': 'Huasheng-machine-photos/WCC800.jpg',
  'broach': 'Huasheng-machine-photos/Broach.jpg',
  'aip': 'Huasheng-machine-photos/MD800-PLUS.jpg',
  'arc-coating': 'Huasheng-machine-photos/MD800-PLUS.jpg',
  'hipims': 'Huasheng-machine-photos/WCC800.jpg',
  'hybrid': 'Huasheng-machine-photos/GFOUR.jpg',
  'decorative': 'Huasheng-machine-photos/HUASHENG-DECO-H-machine.jpg',
  'deco-h': 'Huasheng-machine-photos/HUASHENG-DECO-H-machine.jpg',
  'deco-a': 'Huasheng-machine-photos/HUASHENG-DECO-A-machine.jpg',
  'deco-b': 'Huasheng-machine-photos/HUASHENG-DECO-B-machine.jpg',
  'deco-g': 'Huasheng-machine-photos/HUASHENG-DECO-G-machine.jpg',
  'af': 'Huasheng-machine-photos/HUASHENG-AF-machine.jpg',
  'af-series': 'Huasheng-machine-photos/HUASHENG-AF-machine.jpg',
  'anti-fingerprint': 'Huasheng-machine-photos/HUASHENG-AF-machine.jpg',
  'opt-t': 'Huasheng-machine-photos/HUASHENG-OPT-machine.jpg',
  'opt-e': 'Huasheng-machine-photos/HUASHENG-OPT-machine.jpg',
  'evaporation': 'Huasheng-machine-photos/HUASHENG-OPT-machine.jpg',
  'optical': 'Huasheng-machine-photos/HUASHENG-OPT-machine.jpg',
  'sputter-optical': 'Huasheng-machine-photos/HUASHENG-POW-machine.jpg',
  'powder': 'Huasheng-machine-photos/HUASHENG-POW-machine.jpg',
  'tc800plus': 'Huasheng-machine-photos/TC800PLUS.jpg',
  'tc800plus-f': 'Huasheng-machine-photos/TC800PLUS-F.jpg',
  'pecvd-dlc': 'Huasheng-machine-photos/TC800PLUS.jpg',
  'tac': 'Huasheng-machine-photos/TC800PLUS.jpg',
  'da600pro': 'Huasheng-machine-photos/DA600PRO.jpg',
  'hfcvd': 'Huasheng-machine-photos/DA600PRO.jpg',

  // Novatec
  'pluritank-line': 'assets/catalog/PLURITANK-1400-line-overview.jpg',
  'pluritank-ultrasonic': 'assets/catalog/PLURITANK-1400-line-overview.jpg',
  'pluritank-multi-tank': 'assets/catalog/PLURITANK-1400-line-overview.jpg',
  'pre-pvd': 'assets/catalog/PLURITANK-line-studio.jpg',
  'cleanroom': 'assets/catalog/PLURITANK-cleanroom-line-01.jpg',
  '2crd': 'assets/catalog/2CRD400-front.jpg',
  '2crd-system': 'assets/catalog/2CRD400-front.jpg',
  '2crd-vacuum': 'assets/catalog/2CRD400-front.jpg',
  'generators': 'assets/catalog/PLURITANK-1400-ultrasonic-generators.jpg',
  'ultrasonic-generators': 'assets/catalog/PLURITANK-1400-ultrasonic-generators.jpg',
  'plt60v': 'assets/catalog/PLURITANK-compact-line.jpg',
  'plt-60v': 'assets/catalog/PLURITANK-compact-line.jpg',
  'qvs-brc': 'assets/catalog/MEDICAL-combined-layout-drawing.jpg',
  'ep': 'assets/catalog/MEDICAL-implants-in-basket-02.jpg',
  'electropolishing': 'assets/catalog/MEDICAL-implants-in-basket-02.jpg',
  'combined': 'assets/catalog/MEDICAL-combined-layout-drawing.jpg',
  'custom-combined': 'assets/catalog/MEDICAL-combined-layout-drawing.jpg',
  'ipc': 'assets/catalog/MEDICAL-IPC-2CRD400.jpg',
  'fcps': 'assets/catalog/MEDICAL-FCPS-cleanroom-line-01.jpg',
  'fcs-fcps': 'assets/catalog/MEDICAL-FCPS-cleanroom-line-01.jpg',
  'fpi': 'assets/catalog/MEDICAL-FPI-system-drawing.jpg',
  'pfc': 'assets/catalog/MEDICAL-combined-layout-drawing.jpg'
};

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file === 'index.html') {
      results.push(full);
    }
  });
  return results;
}

let updatedCount = 0;
['novatec', 'huasheng'].forEach(brand => {
  const htmls = getHtmlFiles(path.join(__dirname, brand));
  htmls.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const rel = path.relative(__dirname, f).toLowerCase();
    const relParts = rel.split(/[\\\/]/);
    const folderName = relParts[relParts.length - 2] || '';
    
    // Find best matching photo for this page based on folder name and path
    let matchedPhoto = null;
    
    // 1. Direct folderName match
    if (photoBySlug[folderName]) {
      matchedPhoto = photoBySlug[folderName];
    } else {
      // 2. Exact start or segment match
      const sortedKeys = Object.keys(photoBySlug).sort((a, b) => b.length - a.length);
      for (const key of sortedKeys) {
        if (folderName === key || folderName.startsWith(key + '-') || relParts.includes(key)) {
          matchedPhoto = photoBySlug[key];
          break;
        }
      }
    }

    if (matchedPhoto) {
      // Calculate depth
      const depth = rel.split(path.sep).length - 1;
      const rootRel = '../'.repeat(depth);
      const targetImgSrc = rootRel + matchedPhoto;
      const targetOgSrc = 'https://greets.co.in/' + matchedPhoto;

      let changed = false;

      // Replace mshot-main image
      const mshotRegex = /(<img\s+id=["']mshot-main["'][^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/i;
      if (mshotRegex.test(content)) {
        const curSrc = content.match(mshotRegex)[2];
        if (curSrc !== targetImgSrc) {
          content = content.replace(mshotRegex, `$1${targetImgSrc}$3`);
          changed = true;
        }
      }

      // Replace og:image
      const ogRegex = /(<meta\s+property=["']og:image["']\s+content=["'])([^"']+)(["'])/i;
      if (ogRegex.test(content)) {
        const curOg = content.match(ogRegex)[2];
        if (curOg !== targetOgSrc) {
          content = content.replace(ogRegex, `$1${targetOgSrc}$3`);
          changed = true;
        }
      }

      // Replace twitter:image
      const twRegex = /(<meta\s+name=["']twitter:image["']\s+content=["'])([^"']+)(["'])/i;
      if (twRegex.test(content)) {
        content = content.replace(twRegex, `$1${targetOgSrc}$3`);
        changed = true;
      }

      // Replace json-ld image
      const ldRegex = /("image"\s*:\s*")([^"]+)(")/;
      if (ldRegex.test(content)) {
        content = content.replace(ldRegex, `$1${targetOgSrc}$3`);
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(f, content, 'utf8');
        updatedCount++;
      }
    }
  });
});

console.log(`Audited and updated ${updatedCount} static HTML files to ensure 100% strict photo match.`);
