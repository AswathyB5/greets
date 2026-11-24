// Reads the blog articles that already exist on the website (<slug>/index.html) so the admin panel
// can take them over. Used by scripts/importBlog.js and by the "Import existing articles" button.

const fs = require('fs');
const path = require('path');
const { SITE_DIR } = require('../config/site');

const decode = (s) => String(s || '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

const textOf = (html) => decode(String(html || '').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

// "Nov 10, 2026" -> "2026-11-10"
function isoFromLong(text) {
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const m = /([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})/.exec(text || '');
  const i = m ? months.indexOf(m[1].toLowerCase()) : -1;
  return i < 0 ? '' : `${m[3]}-${String(i + 1).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
}

// The cards of the blog page, by article address: { excerpt, image, imageAlt }
function readCards(blogHtml) {
  const cards = {};
  const re = /<article class="blog-card"[\s\S]*?<\/article>/g;
  let m;
  while ((m = re.exec(blogHtml))) {
    const card = m[0];
    const href = (/<h3 class="blog-card__title"[^>]*><a href="([^"]+)"/.exec(card) || [])[1];
    if (!href) continue;
    const slug = href.replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '');
    cards[slug] = {
      excerpt: textOf((/<p class="blog-card__excerpt"[^>]*>([\s\S]*?)<\/p>/.exec(card) || [])[1]),
      image: (/<img[^>]*\ssrc="([^"]+)"/.exec(card) || [])[1] || '',
      imageAlt: decode((/<img[^>]*\salt="([^"]*)"/.exec(card) || [])[1] || ''),
    };
  }
  return cards;
}

// One article page -> the fields of a BlogPost
function parseArticle(html, slug, card = {}) {
  html = html.replace(/\r\n/g, '\n');
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
  const graph = ld ? (JSON.parse(ld[1])['@graph'] || []) : [];
  const post = graph.find((g) => g['@type'] === 'BlogPosting') || {};
  const crumbs = graph.find((g) => g['@type'] === 'BreadcrumbList');
  const faqNode = graph.find((g) => g['@type'] === 'FAQPage');

  const h1 = textOf((/<h1 class="article-title">([\s\S]*?)<\/h1>/.exec(html) || [])[1]);
  const metaSpans = ((/<div class="article-meta">([\s\S]*?)<\/div>/.exec(html) || [])[1] || '').match(/<span>[\s\S]*?<\/span>/g) || [];
  const hero = /<img src="([^"]*)" alt="([^"]*)" class="article-hero-img">/.exec(html) || [];
  let image = (hero[1] || '').replace(/^\.\.\//, '');

  // the article text, without the FAQ list (that is kept as separate questions)
  const bodyMatch = /<div class="article-body">([\s\S]*?)\n      <\/div>\n\n    <\/article>/.exec(html);
  let body = bodyMatch ? bodyMatch[1] : '';
  body = body.replace(/<h2>\s*Frequently Asked Questions\s*<\/h2>\s*<dl[\s\S]*?<\/dl>/, '');
  body = body.split('\n').map((l) => l.replace(/^ {8}/, '')).join('\n').trim();

  const faq = faqNode && faqNode.mainEntity
    ? faqNode.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer && q.acceptedAnswer.text })).filter((f) => f.q && f.a)
    : [];

  const crumbItems = (crumbs && crumbs.itemListElement) || [];
  const crumbTitle = textOf((/<span class="crumb-current"[^>]*>([\s\S]*?)<\/span>/.exec(html) || [])[1]) || (crumbItems[2] && crumbItems[2].name) || '';
  const read = Number((/(\d+)\s*min read/.exec(metaSpans[2] || '') || [])[1]) || 5;
  const author = textOf((metaSpans[0] || '').replace(/<svg[\s\S]*?<\/svg>/, '')) || 'Greets';
  const date = post.datePublished || isoFromLong(textOf(metaSpans[1]));
  const ogImage = (/<meta property="og:image" content="([^"]*)"/.exec(html) || [])[1] || '';

  return {
    slug,
    status: 'published',
    title: post.headline || h1,
    seoTitle: decode((/<title>([^<]*)<\/title>/.exec(html) || [])[1]),
    crumbTitle: crumbTitle && crumbTitle !== (post.headline || h1) ? crumbTitle : '',
    description: decode((/<meta name="description"\s+content="([^"]*)"/.exec(html) || [])[1] || post.description || ''),
    excerpt: card.excerpt || '',
    keywords: post.keywords || [],
    author,
    authorName: (post.author && post.author.name) || 'Pramod Kanse',
    authorTitle: (post.author && post.author.jobTitle) || 'Director',
    date,
    modified: post.dateModified || date,
    readMinutes: read,
    image: image || (card.image || ''),
    imageAlt: decode(hero[2] || card.imageAlt || ''),
    ogImage: ogImage.startsWith('https://www.greetsequipment.com/') ? ogImage.slice('https://www.greetsequipment.com/'.length) : ogImage,
    bodyHtml: body,
    faq,
  };
}

// every existing article of the website: a folder with an index.html that holds an article card
function readExistingArticles() {
  const blogFile = path.join(SITE_DIR, 'blog.html');
  const cards = fs.existsSync(blogFile) ? readCards(fs.readFileSync(blogFile, 'utf8')) : {};
  const found = [];
  for (const slug of Object.keys(cards)) {
    const file = path.join(SITE_DIR, slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    if (!/class="article-card"/.test(html)) continue;
    found.push(parseArticle(html, slug, cards[slug]));
  }
  return found;
}

module.exports = { parseArticle, readCards, readExistingArticles, isoFromLong };
