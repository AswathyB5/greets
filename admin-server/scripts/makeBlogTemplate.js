// One-off helper: turns a finished blog article of the website into templates/blog-article.html,
// the page shell that the admin panel's blog manager fills in for every article it publishes.
//
//   node scripts/makeBlogTemplate.js [slug]       (default slug: pvd-coating-plant-india)
//
// The shell keeps the article page exactly as it is today (header, menus, styles, footer, scripts)
// and replaces the parts that change from one article to the next with {{TOKENS}}.
// Re-run it after changing the footer / header of an article page, so new articles get the same one.

const fs = require('fs');
const path = require('path');
const { SITE_DIR } = require('../config/site');

const slug = process.argv[2] || 'pvd-coating-plant-india';
const source = path.join(SITE_DIR, slug, 'index.html');
const target = path.join(__dirname, '..', 'templates', 'blog-article.html');

let html = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
const problems = [];

// The company block of the page's structured data (name, address, phones) is kept apart so it is
// written the same on every article; it is read back by services/blogPublish.js.
const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const organization = ld && JSON.parse(ld[1])['@graph'].find((g) => g['@type'] === 'Organization');
if (!organization) { console.error('No Organization block found in ' + source); process.exit(1); }
fs.mkdirSync(path.join(__dirname, '..', 'templates'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '..', 'templates', 'organization.json'), JSON.stringify(organization, null, 2) + '\n', 'utf8');

function swap(label, regex, replacement) {
  if (!regex.test(html)) { problems.push(label); return; }
  html = html.replace(regex, replacement);
}

swap('title', /<title>[^<]*<\/title>/, '<title>{{TITLE_TAG}}</title>');
swap('description', /(<meta name="description"\s+content=")[^"]*(")/, '$1{{DESC}}$2');
swap('canonical', /(<link rel="canonical" href=")[^"]*(")/, '$1{{URL}}$2');
swap('og:title', /(<meta property="og:title" content=")[^"]*(")/, '$1{{TITLE_TAG}}$2');
swap('og:description', /(<meta property="og:description"\s+content=")[^"]*(")/, '$1{{DESC}}$2');
swap('og:url', /(<meta property="og:url" content=")[^"]*(")/, '$1{{URL}}$2');
swap('og:image', /(<meta property="og:image" content=")[^"]*(")/, '$1{{OG_IMAGE}}$2');
swap('twitter:title', /(<meta name="twitter:title" content=")[^"]*(")/, '$1{{TITLE_TAG}}$2');
swap('twitter:description', /(<meta name="twitter:description"\s+content=")[^"]*(")/, '$1{{DESC}}$2');
swap('twitter:image', /(<meta name="twitter:image" content=")[^"]*(")/, '$1{{OG_IMAGE}}$2');
swap('json-ld', /(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/, '$1\n{{JSONLD}}\n  $2');
swap('breadcrumb', /(<span class="crumb-current" aria-current="page">)[^<]*(<\/span>)/, '$1{{CRUMB}}$2');
swap('h1', /(<h1 class="article-title">)[^<]*(<\/h1>)/, '$1{{H1}}$2');
swap('hero', /<img src="[^"]*" alt="[^"]*" class="article-hero-img">/, '{{HERO}}');
swap('body', /(<div class="article-body">)[\s\S]*?(\n      <\/div>\n\n    <\/article>)/, '$1\n{{BODY}}$2');

// the three little facts under the title: author, date, reading time
const meta = html.match(/<div class="article-meta">([\s\S]*?)<\/div>/);
if (!meta) problems.push('article-meta');
else {
  const spans = meta[1].match(/<span>[\s\S]*?<\/span>/g) || [];
  if (spans.length !== 3) problems.push('article-meta spans');
  else {
    const fill = (span, token) => span.replace(/(<\/svg>)[^<]*(<\/span>)/, `$1${token}$2`);
    const rebuilt = '\n        ' + [fill(spans[0], '{{AUTHOR}}'), fill(spans[1], '{{DATE_LONG}}'), fill(spans[2], '{{READ}} min read')].join('\n        ') + '\n      ';
    html = html.replace(meta[0], `<div class="article-meta">${rebuilt}</div>`);
  }
}

// The three existing articles differ by a couple of style rules (links inside a sub-heading are only styled
// on one of them). Every new article gets all of them, so no article loses a style it needs.
const EXTRA_CSS = `
    .article-body h2.sub-stage a {
      color: #02963C;
      text-decoration: underline;
      text-decoration-color: #02963C;
      text-underline-offset: 3px;
    }

    .article-body h2.sub-stage a:hover {
      color: #016A2A;
      text-decoration-color: #016A2A;
    }
`;
if (!html.includes('.article-body h2.sub-stage a {')) {
  const anchor = /(\.article-body h3\.sub-coating \{[^}]*\}\n)/;
  if (anchor.test(html)) html = html.replace(anchor, (m) => m + EXTRA_CSS);
  else problems.push('style anchor (h3.sub-coating)');
}

// Styles for what the admin editor can add: smaller headings, quotes, tables, pictures, highlights, dividers.
const RICH_CSS = `
    .article-body h4 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--ink);
      margin: 1.4rem 0 0.6rem;
      text-align: left;
    }

    .article-body blockquote {
      margin: 1.5rem 0;
      padding: 0.75rem 1.25rem;
      border-left: 4px solid #02963C;
      background: #F4F7F2;
      color: var(--ink);
      text-align: left;
    }

    .article-body blockquote p:last-child {
      margin-bottom: 0;
    }

    .article-body hr {
      border: 0;
      border-top: 1px solid var(--line);
      margin: 2rem 0;
    }

    .article-body img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
    }

    .article-body mark {
      background: #FFF59D;
      padding: 0 0.15em;
    }

    .article-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.95rem;
    }

    .article-body th,
    .article-body td {
      border: 1px solid #E1E7DE;
      padding: 0.6rem 0.8rem;
      text-align: left;
      vertical-align: top;
    }

    .article-body th {
      background: #F4F7F2;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .article-body table {
        display: block;
        overflow-x: auto;
      }
    }
`;
if (!html.includes('.article-body blockquote {')) {
  const anchor = /(\.article-body h2\.sub-stage a:hover \{[^}]*\}\n)/;
  if (anchor.test(html)) html = html.replace(anchor, (m) => m + RICH_CSS);
  else problems.push('style anchor (h2.sub-stage a:hover)');
}

if (problems.length) {
  console.error('Could not find: ' + problems.join(', ') + '. The article page changed shape; update this script.');
  process.exit(1);
}
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, html, 'utf8');
console.log('Wrote ' + path.relative(process.cwd(), target));
