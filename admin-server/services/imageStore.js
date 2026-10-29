// Where uploaded pictures are kept.
//   - Cloudinary (free, no card) when CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
//     are set in .env. The picture's full https address is what gets saved in the database.
//   - Otherwise the local admin-server/uploads folder (works on a PC or a server that keeps its disk).
// Cloudinary is called over plain HTTPS (no extra package): a signed upload.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const UploadedImage = require('../models/UploadedImage');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const FOLDER = 'greets';

const env = () => ({
  cloud: (process.env.CLOUDINARY_CLOUD_NAME || '').trim(),
  key: (process.env.CLOUDINARY_API_KEY || '').trim(),
  secret: (process.env.CLOUDINARY_API_SECRET || '').trim(),
  base: (process.env.CLOUDINARY_API_BASE || 'https://api.cloudinary.com').replace(/\/$/, ''), // overridable for tests
});

let warned = false;
function enabled() {
  const e = env();
  if (e.cloud && e.key && e.secret) return true;
  if ((e.key || e.secret) && !e.cloud && !warned) {
    warned = true;
    console.warn('Cloudinary: API key/secret are set but CLOUDINARY_CLOUD_NAME is missing, so pictures are saved on this server instead.');
  }
  return false;
}

// Cloudinary's signature: sha1 of the sorted "name=value" pairs joined with & , followed by the API secret.
function sign(params, secret) {
  const text = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&');
  return crypto.createHash('sha1').update(text + secret).digest('hex');
}

// Only pictures from our own Cloudinary account are accepted as addresses.
function isOurUrl(value) {
  const { cloud } = env();
  return !!cloud && value.startsWith(`https://res.cloudinary.com/${cloud}/`);
}

async function saveToCloudinary(buffer, ext) {
  const e = env();
  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const toSign = { folder: FOLDER, public_id: publicId, timestamp };
  const mime = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

  const form = new FormData();
  form.append('file', `data:${mime};base64,${buffer.toString('base64')}`);
  form.append('api_key', e.key);
  form.append('timestamp', String(timestamp));
  form.append('folder', FOLDER);
  form.append('public_id', publicId);
  form.append('signature', sign(toSign, e.secret));

  let res;
  try {
    res = await fetch(`${e.base}/v1_1/${encodeURIComponent(e.cloud)}/image/upload`, { method: 'POST', body: form, signal: AbortSignal.timeout(60000) });
  } catch (err) {
    throw Object.assign(new Error('Could not reach the image storage (Cloudinary). Check the internet connection and try again.'), { status: 502 });
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.secure_url) {
    const why = (body.error && body.error.message) || `status ${res.status}`;
    console.error('Cloudinary upload failed:', why);
    throw Object.assign(new Error(`The image storage refused the picture (${why}).`), { status: 502 });
  }
  return body.secure_url;
}

// Saves a checked picture and returns the value to store: "https://res.cloudinary.com/..." or "uploads/<file>".
async function save(buffer, ext) {
  let value;
  if (enabled()) {
    value = await saveToCloudinary(buffer, ext);
  } else {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    await fs.promises.writeFile(path.join(UPLOAD_DIR, name), buffer);
    value = `uploads/${name}`;
  }
  // remembered so it shows in the picture library
  await UploadedImage.create({ value, name: value.split('/').pop() }).catch(() => {});
  return value;
}

module.exports = { enabled, save, isOurUrl, sign, UPLOAD_DIR };
