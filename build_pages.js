const fs = require('fs');
const path = require('path');

// Extract CATALOG and helper data from products.js
const code = fs.readFileSync('products.js', 'utf8');

function extractConst(varName) {
  const marker = 'const ' + varName + ' = ';
  const start = code.indexOf(marker);
  if (start === -1) return null;
  const exprStart = start + marker.length;
  let depth = 0;
  let inString = false;
  let strChar = '';
  let end = exprStart;

  for (let i = exprStart; i < code.length; i++) {
    const ch = code[i];
    const prev = code[i - 1];

    if (inString) {
      if (ch === strChar && prev !== '\\') inString = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        strChar = ch;
      } else if (ch === '{' || ch === '[') {
        depth++;
      } else if (ch === '}' || ch === ']') {
        depth--;
      } else if (ch === ';' && depth === 0) {
        end = i;
        break;
      }
    }
  }
  const raw = code.slice(exprStart, end).trim();
  return eval('(' + raw + ')');
}

const LOGO_PATHS = extractConst('LOGO_PATHS');
const PHOTOS = extractConst('PHOTOS');
const IND = extractConst('IND');
const CATALOG = extractConst('CATALOG');

const SITE_URL = 'https://greets.co.in';

const SVG_CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const SVG_ARROW = '<svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const SVG_EXT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
const SVG_BACK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getHeaderHtml(depth = 0) {
  const root = depth === 0 ? './' : '../'.repeat(depth);
  return `
  <!-- Header -->
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="${root}index.html" class="header__logo">
        <img src="${root}assets/logo-greets.png" alt="Greets Equipment">
      </a>
      <div class="navgroup" id="navgroup"><span class="nav-ind" id="nav-ind" aria-hidden="true"></span>
        <a class="navlink navhome" href="${root}index.html#hero" data-spy="home">Home</a>
        <a class="navlink mega-btn" id="mega-btn" href="${root}index.html#finder" data-spy="products" aria-expanded="false"
          aria-controls="mega">Products</a>
        <nav class="header__nav main" aria-label="Main">
          <a class="navlink" href="${root}index.html#industries" data-spy="industries">Industries</a>
          <a class="navlink" href="${root}index.html#why" data-spy="why">Why buy through Greets</a>
          <a class="navlink" href="${root}contact.html" data-spy="contact">Contact</a>
        </nav>
      </div>
      <a class="btn btn--primary hdr-cta" href="${root}contact.html">
        <span>Talk to Greets</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
      <button class="header__hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mega" id="mega" hidden>
      <div class="mega-grid">
        ${CATALOG.map(b => `
          <div>
            <a class="mega-brand" href="${root}${b.id}/">
              <img src="${root}${LOGO_PATHS[b.id] || ''}" alt="${esc(b.name)}">
            </a>
            <ul>
              ${b.cats.map(c => `<li><a href="${root}${b.id}/${c.id}/">${esc(c.name)}</a></li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  </header>

  <!-- Mobile Nav -->
  <nav class="mobile-nav" id="mobile-nav">
    <a href="${root}index.html#hero">Home</a>
    <div class="mobile-nav-group">
      <button type="button" class="mobile-nav-toggle" id="mobile-products-toggle" aria-expanded="false">
        <span>Products</span>
        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="mobile-products-panel" id="mobile-products-panel">
        <a href="${root}index.html#finder" class="mobile-all-products-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>Find a system &mdash; All products</span>
        </a>
        ${CATALOG.map(b => `
          <div class="mobile-brand-group">
            <a class="mobile-brand-title" href="${root}${b.id}/">
              <img src="${root}${LOGO_PATHS[b.id] || ''}" alt="${esc(b.name)}">
              <span>${esc(b.name)}</span>
            </a>
            <ul class="mobile-cat-list">
              ${b.cats.map(c => `<li><a href="${root}${b.id}/${c.id}/">${esc(c.name)}</a></li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
    <a href="${root}index.html#industries">Industries</a>
    <a href="${root}index.html#why">Why buy through Greets</a>
    <a href="${root}contact.html">Contact</a>
    <a href="${root}contact.html" class="btn btn--primary">Talk to Greets</a>
  </nav>
`;
}

function getFooterHtml(depth = 0) {
  const root = depth === 0 ? './' : '../'.repeat(depth);
  return `
  <!-- Footer -->
  <footer class="footer" style="background:#1B2328; color:#E9EDE8; padding:3.5rem 0 2rem; margin-top:3rem;">
    <div class="container">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:2.5rem; margin-bottom:2.5rem;">
        <div>
          <img src="${root}assets/logo-greets.png" alt="Greets Equipment" style="max-height:40px; margin-bottom:1rem; filter:brightness(0) invert(1);">
          <p style="color:#A9B4B0; font-size:0.92rem; line-height:1.6;">
            Authorised partner in India for BMI vacuum furnaces, Novatec ultrasonic cleaning systems and Huasheng PVD/DLC/diamond coating equipment.
          </p>
        </div>
        <div>
          <h4 style="color:#FFFFFF; font-size:1rem; margin-bottom:1rem; font-weight:700;">Equipment &amp; Brands</h4>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.6rem; font-size:0.92rem;">
            <li><a href="${root}bmi/" style="color:#A9B4B0; text-decoration:none;">BMI Vacuum Furnaces (France)</a></li>
            <li><a href="${root}novatec/" style="color:#A9B4B0; text-decoration:none;">Novatec Ultrasonic Cleaning (Italy)</a></li>
            <li><a href="${root}huasheng/" style="color:#A9B4B0; text-decoration:none;">Huasheng PVD &amp; DLC Coating (China)</a></li>
            <li><a href="${root}index.html#finder" style="color:#02963C; text-decoration:none; font-weight:600;">Find a system (Search all) &rarr;</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#FFFFFF; font-size:1rem; margin-bottom:1rem; font-weight:700;">Bangalore Office</h4>
          <p style="color:#A9B4B0; font-size:0.9rem; line-height:1.6; margin-bottom:0.75rem;">
            #384, Second Floor, 9th Main Road, Sector 7, HSR Layout, Bangalore 560102, India
          </p>
          <p style="color:#A9B4B0; font-size:0.9rem;">
            Email: <a href="mailto:enquiry-equipment@greets.co.in" style="color:#02963C;">enquiry-equipment@greets.co.in</a><br>
            Phone: <a href="tel:+919823386558" style="color:#E9EDE8;">+91 98233 86558</a>
          </p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; font-size:0.85rem; color:#88958F;">
        <div>&copy; ${new Date().getFullYear()} Greets Equipment Pvt. Ltd. All rights reserved.</div>
        <div><a href="${root}privacy.html" style="color:#A9B4B0; text-decoration:underline;">Privacy Notice (DPDP Act)</a></div>
      </div>
    </div>
  </footer>
`;
}

function getCrumbsHtml(parts, root) {
  return `
    <div class="crumbrow">
      <a href="${root}index.html#finder" class="backbtn">${SVG_BACK}<span>All products</span></a>
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="${root}index.html#finder" class="crumb-home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg> Products
        </a>
        ${parts.map(p => p.href
          ? ` <span class="crumb-sep" aria-hidden="true">/</span> <a href="${p.href}">${esc(p.t)}</a>`
          : ` <span class="crumb-sep" aria-hidden="true">/</span> <span class="crumb-current" aria-current="page">${esc(p.t)}</span>`
        ).join('')}
      </nav>
    </div>
  `;
}

const sitemapUrls = [
  { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_URL}/contact.html`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${SITE_URL}/privacy.html`, priority: '0.5', changefreq: 'yearly' }
];

// 1. Generate Brand Pages
CATALOG.forEach(b => {
  const brandDir = path.join(__dirname, b.id);
  if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

  const pageUrl = `${SITE_URL}/${b.id}/`;
  sitemapUrls.push({ loc: pageUrl, priority: '0.9', changefreq: 'weekly' });

  const root = '../';
  const pageTitle = `${b.name} Equipment in India | Authorised Partner – Greets Equipment`;
  const metaDesc = `${esc(b.full)} in India. ${esc(b.intro)} Supplied, installed and serviced by Greets Equipment Pvt. Ltd., Bangalore.`;
  const logoSrc = root + (LOGO_PATHS[b.id] || '');
  const brandPhoto = root + (PHOTOS[b.photo] || '');

  const breadcrumbsJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": b.name, "item": pageUrl }
    ]
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": b.full || b.name,
    "url": b.site,
    "logo": `${SITE_URL}/${LOGO_PATHS[b.id]}`,
    "description": b.intro
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(metaDesc)}">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" type="image/png" href="${root}assets/greetsfavicon.png">
  <link rel="apple-touch-icon" href="${root}assets/greetsfavicon.png">
  <link rel="stylesheet" href="${root}styles.css">
  
  <meta property="og:title" content="${esc(pageTitle)}">
  <meta property="og:description" content="${esc(metaDesc)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Greets Equipment">
  
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbsJson)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(schemaJson)}
  </script>
</head>
<body class="page-enter">
  ${getHeaderHtml(1)}

  <main class="page-main-wrap" style="padding-top:84px; min-height:80vh;">
    <div class="wrap">
      ${getCrumbsHtml([{ t: b.name }], root)}

      <header class="phead brandhead has-photo">
        <div class="phead-content">
          <div class="brand-badge-row">
            <span class="flag-chip">${esc(b.country)}</span>
            <span class="oem-chip">Authorised Dealer in India</span>
          </div>
          <div class="brand-title-group">
            <span class="plate big"><img src="${logoSrc}" alt="${esc(b.name)}"></span>
            <div>
              <h1 style="font-size:clamp(1.8rem, 3.5vw, 2.6rem);">${esc(b.name)} equipment range</h1>
              <p class="brand-sub-full">${esc(b.full)}</p>
            </div>
          </div>
          <p class="lede">${esc(b.intro)}</p>
          <div class="cta-row">
            <a href="${root}contact.html" class="btn btn--primary btn--lg">
              <span>Enquire for ${esc(b.name)} in India</span>${SVG_ARROW}
            </a>
            <a href="${b.site}" target="_blank" rel="noopener" class="btn btn--ghost">
              <span>Visit official website</span>${SVG_EXT}
            </a>
          </div>
        </div>
        <div class="phead-media">
          ${brandPhoto ? `<figure class="mphoto"><img src="${brandPhoto}" alt="${esc(b.name)} installation"></figure>` : ''}
        </div>
      </header>

      <section style="margin:2.5rem 0 1.5rem;">
        <h2 style="font-size:1.4rem; font-weight:750; color:var(--ink); margin-bottom:1.25rem;">Product categories</h2>
        <div class="cards">
          ${b.cats.map(c => `
            <a class="card" href="${root}${b.id}/${c.id}/">
              <b>${esc(c.name)}</b>
              <span>${esc(c.sub)}</span>
              <div class="card-badge-line"><span class="cat-pill-count">${c.machines.length} ${c.machines.length === 1 ? 'product range' : 'product ranges'}</span></div>
            </a>
          `).join('')}
        </div>
      </section>

      <div class="brand-ext-bar">
        <a href="${b.site}" target="_blank" rel="noopener"><span>Visit official ${esc(b.name)} website</span> ${SVG_EXT}</a>
      </div>
    </div>
  </main>

  ${getFooterHtml(1)}
  <script src="${root}main.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(brandDir, 'index.html'), html, 'utf8');

  // 2. Generate Category Pages
  b.cats.forEach(c => {
    const catDir = path.join(__dirname, b.id, c.id);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

    const catUrl = `${SITE_URL}/${b.id}/${c.id}/`;
    sitemapUrls.push({ loc: catUrl, priority: '0.8', changefreq: 'weekly' });

    const root2 = '../../';
    const catTitle = `${c.name} – ${b.name} | Greets Equipment India`;
    const catDesc = `${esc(c.desc)} Supplied with Indian installation, commissioning and local technical support by Greets Equipment.`;
    const catPhoto = PHOTOS[c.photo] ? root2 + PHOTOS[c.photo] : (PHOTOS[b.photo] ? root2 + PHOTOS[b.photo] : '');

    const catBreadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": b.name, "item": `${SITE_URL}/${b.id}/` },
        { "@type": "ListItem", "position": 3, "name": c.name, "item": catUrl }
      ]
    };

    const catHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(catTitle)}</title>
  <meta name="description" content="${esc(catDesc)}">
  <link rel="canonical" href="${catUrl}">
  <link rel="icon" type="image/png" href="${root2}assets/greetsfavicon.png">
  <link rel="apple-touch-icon" href="${root2}assets/greetsfavicon.png">
  <link rel="stylesheet" href="${root2}styles.css">
  
  <meta property="og:title" content="${esc(catTitle)}">
  <meta property="og:description" content="${esc(catDesc)}">
  <meta property="og:url" content="${catUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Greets Equipment">
  
  <script type="application/ld+json">
  ${JSON.stringify(catBreadcrumbs)}
  </script>
</head>
<body class="page-enter">
  ${getHeaderHtml(2)}

  <main class="page-main-wrap" style="padding-top:84px; min-height:80vh;">
    <div class="wrap">
      ${getCrumbsHtml([{ t: b.name, href: `${root2}${b.id}/` }, { t: c.name }], root2)}

      <header class="phead has-photo">
        <div class="phead-content">
          <div class="brand-badge-row">
            <span class="flag-chip">${esc(b.country)}</span>
            <span class="oem-chip">${esc(b.name)}</span>
          </div>
          <h1 style="font-size:clamp(1.8rem, 3.5vw, 2.5rem);">${esc(c.name)}</h1>
          <p class="lede">${esc(c.desc)}</p>
          <div class="cta-row">
            <a href="${root2}contact.html" class="btn btn--primary btn--lg">
              <span>Enquire about ${esc(c.name)}</span>${SVG_ARROW}
            </a>
            <a class="btn btn--ghost" href="${c.url}" target="_blank" rel="noopener">
              <span>See range on ${esc(b.name)} website</span>${SVG_EXT}
            </a>
          </div>
        </div>
        <div class="phead-media">
          ${catPhoto ? `<figure class="mphoto"><img src="${catPhoto}" alt="${esc(c.photoAlt || c.name)}"></figure>` : ''}
        </div>
      </header>

      <section style="margin:2.5rem 0 1.5rem;">
        <h2 style="font-size:1.35rem; font-weight:750; color:var(--ink); margin-bottom:1.25rem;">Available systems &amp; configurations</h2>
        <div class="cards">
          ${c.machines.map(m => `
            <a class="card machine-item-card" href="${root2}${b.id}/${slugify(m.name)}/">
              <b>${esc(m.name)}</b>
              <span>${esc(m.short || m.desc)}</span>
              <em>View technical specifications &rarr;</em>
            </a>
          `).join('')}
        </div>
      </section>
    </div>
  </main>

  ${getFooterHtml(2)}
  <script src="${root2}main.js" defer></script>
</body>
</html>`;

    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf8');

    // 3. Generate Machine Pages
    c.machines.forEach(m => {
      const richSlug = slugify(m.name);
      const machineUrl = `${SITE_URL}/${b.id}/${richSlug}/`;
      sitemapUrls.push({ loc: machineUrl, priority: '0.8', changefreq: 'weekly' });

      // Create rich slug directory: e.g. /bmi/b8t-vacuum-gas-quenching-furnace/
      const richDir = path.join(__dirname, b.id, richSlug);
      if (!fs.existsSync(richDir)) fs.mkdirSync(richDir, { recursive: true });

      // Also create hierarchical directory: e.g. /bmi/gas-quenching/b8t/
      const hierDir = path.join(__dirname, b.id, c.id, m.id);
      if (!fs.existsSync(hierDir)) fs.mkdirSync(hierDir, { recursive: true });

      // And direct model directory: e.g. /bmi/b8t/
      const shortDir = path.join(__dirname, b.id, m.id);
      if (!fs.existsSync(shortDir)) fs.mkdirSync(shortDir, { recursive: true });

      const rootRich = '../../';
      const mTitle = `${m.name} – ${b.name} | Greets Equipment India`;
      const mDesc = `${esc(m.short || m.desc)} Authorised dealer in India: technical proposal, supply, installation and maintenance support.`;

      const mSrc = [m, c, b].find(x => x && x.photo && PHOTOS[x.photo]);
      const mPhotoUrl = mSrc && PHOTOS[mSrc.photo] ? `${SITE_URL}/${PHOTOS[mSrc.photo]}` : '';

      const mBreadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": b.name, "item": `${SITE_URL}/${b.id}/` },
          { "@type": "ListItem", "position": 3, "name": c.name, "item": `${SITE_URL}/${b.id}/${c.id}/` },
          { "@type": "ListItem", "position": 4, "name": m.name, "item": machineUrl }
        ]
      };

      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${b.name} ${m.name}`,
        "description": m.desc || m.short,
        "image": mPhotoUrl || undefined,
        "brand": {
          "@type": "Brand",
          "name": b.full || b.name
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Greets Equipment Pvt. Ltd."
          }
        }
      };

      const generateMachineHtml = (rootRel) => {
        const shots = [];
        if (mSrc) shots.push([mSrc.photo, mSrc.photoAlt || m.name]);
        (m.gallery || []).forEach(g => {
          if (PHOTOS[g[0]] && !shots.some(x => x[0] === g[0])) shots.push(g);
        });

        let photoHtml = '';
        if (shots.length) {
          photoHtml = `
            <figure class="mshot">
              <div class="mshot-stage">
                <img id="mshot-main" src="${rootRel}${PHOTOS[shots[0][0]]}" alt="${esc(shots[0][1])}">
              </div>
              <figcaption id="mshot-cap">${shots.length > 1 ? esc(shots[0][1]) : esc(m.name)}</figcaption>
              ${shots.length > 1 ? `
                <div class="mthumbs">
                  ${shots.map((g, k) => `
                    <button type="button" class="mthumb" data-src="${rootRel}${PHOTOS[g[0]]}" data-cap="${esc(g[1])}" aria-label="${esc(g[1])}" ${k === 0 ? 'aria-current="true"' : ''}>
                      <img src="${rootRel}${PHOTOS[g[0]]}" alt="">
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </figure>
          `;
        } else {
          photoHtml = `<div class="mshot empty"><span>Machine photo from ${esc(b.name)} dealer kit</span></div>`;
        }

        let specsHtml = '';
        if (m.specs && m.specs.length) {
          specsHtml = `
            <table class="spec">
              <tbody>
                ${m.specs.map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}
              </tbody>
            </table>
            <p class="note">* Manufacturer figures; exact values depend on configuration.</p>
          `;
        } else {
          specsHtml = `
            <div class="ondemand">
              <b>Datasheet on request</b>
              <p>This machine is configured to your part specs and throughput. Contact Greets Equipment for technical proposal.</p>
              <a href="${rootRel}contact.html" class="btn btn--primary btn--lg"><span>Enquire about this</span>${SVG_ARROW}</a>
            </div>
          `;
        }

        const rel = c.machines.filter(x => x !== m);
        const relnav = rel.length ? `
          <nav class="mrel" aria-label="More in ${esc(c.name)}">
            <span class="mrel-head">More in ${esc(c.name)}:</span>
            <div class="mrel-links">
              ${rel.map(x => `<a href="${rootRel}${b.id}/${slugify(x.name)}/">${esc(x.name)}</a>`).join('')}
            </div>
          </nav>
        ` : '';

        const targetInds = (m.i && m.i.length) ? `
          <p class="ind-para"><strong>Target industries:</strong> ${m.i.map(x => {
            const indObj = IND.find(z => z.id === x);
            return indObj ? esc(indObj.n) : '';
          }).filter(Boolean).join(', ')}.</p>
        ` : '';

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(mTitle)}</title>
  <meta name="description" content="${esc(mDesc)}">
  <link rel="canonical" href="${machineUrl}">
  <link rel="icon" type="image/png" href="${rootRel}assets/greetsfavicon.png">
  <link rel="apple-touch-icon" href="${rootRel}assets/greetsfavicon.png">
  <link rel="stylesheet" href="${rootRel}styles.css">
  
  <meta property="og:title" content="${esc(mTitle)}">
  <meta property="og:description" content="${esc(mDesc)}">
  <meta property="og:url" content="${machineUrl}">
  <meta property="og:type" content="product">
  <meta property="og:image" content="${mPhotoUrl}">
  <meta property="og:site_name" content="Greets Equipment">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(mTitle)}">
  <meta name="twitter:description" content="${esc(mDesc)}">
  <meta name="twitter:image" content="${mPhotoUrl}">
  
  <script type="application/ld+json">
  ${JSON.stringify(mBreadcrumbs)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(productSchema)}
  </script>
</head>
<body class="page-enter">
  ${getHeaderHtml(rootRel === '../../' ? 2 : 3)}

  <main class="page-main-wrap" style="padding-top:84px; min-height:80vh;">
    <div class="wrap">
      <div class="mpage">
        ${getCrumbsHtml([{ t: b.name, href: `${rootRel}${b.id}/` }, { t: c.name, href: `${rootRel}${b.id}/${c.id}/` }, { t: m.name }], rootRel)}

        <div class="mlayout ${m.specs && m.specs.length > 6 ? 'many' : ''}">
          <div class="mleft">
            <div class="brand-badge-row">
              <span class="flag-chip">${esc(b.country)}</span>
              <span class="oem-chip">${esc(b.name)}</span>
              ${m.tag ? `<span class="tag-chip">${esc(m.tag)}</span>` : ''}
            </div>
            <h1>${esc(m.name)}</h1>
            <p class="lede">${esc(m.desc)}</p>
            <div class="cta-row">
              <a href="${rootRel}contact.html" class="btn btn--primary btn--lg">
                <span>Enquire about this</span>${SVG_ARROW}
              </a>
              <a class="btn btn--ghost" href="${m.url || c.url}" target="_blank" rel="noopener">
                <span>View on ${esc(b.name)} website</span>${SVG_EXT}
              </a>
            </div>

            <div class="mcols">
              <section class="mcol-card">
                <h2>Key features</h2>
                <ul class="feat">
                  ${m.features.map(f => `<li><span class="check-ic-wrap">${SVG_CHECK}</span><span>${esc(f)}</span></li>`).join('')}
                </ul>
              </section>
            </div>

            ${targetInds}
            ${relnav}
          </div>

          <div class="mright">
            ${photoHtml}
            <section class="mspec">
              <div class="mspec-head">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <h2>Technical specifications</h2>
              </div>
              ${specsHtml}
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>

  ${getFooterHtml(rootRel === '../../' ? 2 : 3)}
  <script src="${rootRel}main.js" defer></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.mthumb').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var main = document.getElementById('mshot-main');
          var cap = document.getElementById('mshot-cap');
          if (main) main.src = btn.dataset.src;
          if (cap) cap.textContent = btn.dataset.cap;
          document.querySelectorAll('.mthumb').forEach(function (b) { b.removeAttribute('aria-current'); });
          btn.setAttribute('aria-current', 'true');
        });
      });
    });
  </script>
</body>
</html>`;
      };

      // Write rich slug file: /bmi/b8t-vacuum-gas-quenching-furnace/index.html
      fs.writeFileSync(path.join(richDir, 'index.html'), generateMachineHtml('../../'), 'utf8');

      // Write hierarchical file: /bmi/gas-quenching/b8t/index.html
      fs.writeFileSync(path.join(hierDir, 'index.html'), generateMachineHtml('../../../'), 'utf8');

      // Write direct model file: /bmi/b8t/index.html
      fs.writeFileSync(path.join(shortDir, 'index.html'), generateMachineHtml('../../'), 'utf8');
    });
  });
});

// Generate sitemap.xml
const now = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
console.log(`Generated sitemap.xml with ${sitemapUrls.length} total URLs.`);
