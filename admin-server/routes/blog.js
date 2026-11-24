const express = require('express');
const BlogPost = require('../models/BlogPost');
const { requireAuthApi } = require('../middleware/auth');
const { autoPublish } = require('../config/features');
const { requestPublish, isPublishing, validate, slugify, sanitizeBody, todayIso } = require('../services/blogPublish');
const { readExistingArticles } = require('../services/blogImport');

// Blog articles: list, read, create, edit, delete, and "publish to website".
const router = express.Router();
router.use(requireAuthApi);

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const fail = (res, status, message, errors) => res.status(status).json({ message, errors: errors || {} });

const text = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

// Only these fields can be set from the admin panel, cleaned the same way every time.
function clean(input) {
  const d = input || {};
  const out = {};
  if ('title' in d) out.title = text(d.title, 200);
  if ('seoTitle' in d) out.seoTitle = text(d.seoTitle, 200);
  if ('crumbTitle' in d) out.crumbTitle = text(d.crumbTitle, 120);
  if ('description' in d) out.description = text(d.description, 400);
  if ('excerpt' in d) out.excerpt = text(d.excerpt, 400);
  if ('keywords' in d) {
    const list = Array.isArray(d.keywords) ? d.keywords : String(d.keywords || '').split(',');
    out.keywords = list.map((k) => text(k, 80)).filter(Boolean).slice(0, 30);
  }
  if ('author' in d) out.author = text(d.author, 80) || 'Greets';
  if ('authorName' in d) out.authorName = text(d.authorName, 80);
  if ('authorTitle' in d) out.authorTitle = text(d.authorTitle, 80);
  if ('date' in d) out.date = text(d.date, 10);
  if ('readMinutes' in d) out.readMinutes = Number(d.readMinutes);
  if ('image' in d) out.image = text(d.image, 500);
  if ('imageAlt' in d) out.imageAlt = text(d.imageAlt, 250);
  if ('ogImage' in d) out.ogImage = text(d.ogImage, 500);
  if ('bodyHtml' in d) out.bodyHtml = sanitizeBody(String(d.bodyHtml || '').slice(0, 300000));
  if ('faq' in d) {
    out.faq = (Array.isArray(d.faq) ? d.faq : [])
      .map((f) => ({ q: text(f && f.q, 300), a: text(f && f.a, 3000) }))
      .filter((f) => f.q || f.a)
      .slice(0, 30);
    const half = out.faq.find((f) => !f.q || !f.a);
    if (half) out.faqError = 'Every question needs an answer, and every answer a question.';
  }
  if ('status' in d) out.status = d.status === 'published' ? 'published' : 'draft';
  return out;
}

// After a change the website is updated by itself (unless AUTO_PUBLISH=false). The result is sent back with the saved article.
async function publishNow() {
  if (!autoPublish) return { published: false, pending: true };
  try {
    return { published: true, summary: await requestPublish() };
  } catch (err) {
    return { published: false, error: err.message };
  }
}

router.get('/', wrap(async (req, res) => {
  const posts = await BlogPost.find().sort({ date: -1, createdAt: -1 }).select('slug title status date modified updatedAt image').lean();
  res.json({ posts, autoPublish, publishing: isPublishing() });
}));

router.get('/:slug', wrap(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
  if (!post) return fail(res, 404, 'Article not found.');
  res.json({ post });
}));

router.post('/', wrap(async (req, res) => {
  const data = clean(req.body);
  data.slug = text(req.body && req.body.slug, 80) || slugify(data.title);
  const errors = validate({ ...data });
  if (data.faqError) errors.faq = data.faqError;
  if (Object.keys(errors).length) return fail(res, 400, 'Please fix the highlighted fields.', errors);
  if (await BlogPost.exists({ slug: data.slug })) return fail(res, 409, 'Another article already uses this page address.', { slug: 'This address is already used by another article.' });
  delete data.faqError;
  data.date = data.date || todayIso();
  data.modified = todayIso();
  const post = await BlogPost.create({ status: 'draft', ...data });
  const result = await publishNow();
  res.status(201).json({ post, ...result });
}));

router.put('/:slug', wrap(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug });
  if (!post) return fail(res, 404, 'Article not found.');
  const data = clean(req.body); // the page address is not changed here: a changed address would break links that already exist
  const errors = validate({ ...post.toObject(), ...data, slug: post.slug });
  if (data.faqError) errors.faq = data.faqError;
  if (Object.keys(errors).length) return fail(res, 400, 'Please fix the highlighted fields.', errors);
  delete data.faqError;
  if (data.status === 'published' && !(data.date || post.date)) data.date = todayIso();
  data.modified = todayIso();
  post.set(data);
  await post.save();
  const result = await publishNow();
  res.json({ post, ...result });
}));

router.delete('/:slug', wrap(async (req, res) => {
  const post = await BlogPost.findOneAndDelete({ slug: req.params.slug });
  if (!post) return fail(res, 404, 'Article not found.');
  const result = await publishNow();
  res.json({ deleted: true, ...result });
}));

// Takes over the articles that are already on the website (only the ones the admin does not have yet).
router.post('/import', wrap(async (req, res) => {
  const found = readExistingArticles();
  let added = 0;
  for (const post of found) {
    if (await BlogPost.exists({ slug: post.slug })) continue;
    await BlogPost.create(post);
    added += 1;
  }
  res.json({ found: found.length, added });
}));

router.post('/publish', wrap(async (req, res) => {
  try {
    res.json({ published: true, summary: await requestPublish() });
  } catch (err) {
    fail(res, err.status || 500, err.message);
  }
}));

module.exports = router;
