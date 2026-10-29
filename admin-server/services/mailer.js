// Emails an alert when a visitor sends the contact form. Entirely optional: with no SMTP settings in .env
// nothing is sent and everything else works. A failed email is logged and never stops the enquiry being saved.
//   SMTP_HOST, SMTP_PORT (587 or 465), SMTP_USER, SMTP_PASS, SMTP_SECURE (true for port 465)
//   MAIL_FROM     e.g. "Greets Website <alerts@greetsequipment.com>" (defaults to SMTP_USER)
//   NOTIFY_EMAIL  who receives the alerts, comma separated
const nodemailer = require('nodemailer');

let transport = null;
let override = null; // tests can put their own transport here

const env = (k) => (process.env[k] || '').trim();
const recipients = () => env('NOTIFY_EMAIL').split(',').map((s) => s.trim()).filter(Boolean);

function status() {
  const ready = !!(override || env('SMTP_HOST'));
  return { enabled: ready && recipients().length > 0, to: recipients(), host: env('SMTP_HOST') };
}

function getTransport() {
  if (override) return override;
  if (!transport) {
    transport = nodemailer.createTransport({
      host: env('SMTP_HOST'),
      port: Number(env('SMTP_PORT')) || 587,
      secure: env('SMTP_SECURE') === 'true' || Number(env('SMTP_PORT')) === 465,
      auth: env('SMTP_USER') ? { user: env('SMTP_USER'), pass: env('SMTP_PASS') } : undefined,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });
  }
  return transport;
}

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const oneLine = (s) => String(s || '').replace(/[\r\n]+/g, ' ').trim(); // no line breaks in headers

function enquiryMail(e) {
  const rows = [
    ['Name', e.name], ['Company', e.company], ['Email', e.email], ['Phone', e.phone], ['City', e.city],
    ['Interested in', e.process], ['From page', e.sourcePage || e.product], ['Brand', e.brand], ['Category', e.category], ['Message', e.message],
  ].filter(([, v]) => v);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#555;vertical-align:top"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table>`;
  return { subject: `New enquiry from ${oneLine(e.name)}${e.process ? ' - ' + oneLine(e.process) : ''}`.slice(0, 200), text, html };
}

async function sendEnquiryAlert(enquiry) {
  const s = status();
  if (!s.enabled) return { sent: false, reason: 'not configured' };
  try {
    const mail = enquiryMail(enquiry);
    await getTransport().sendMail({
      from: env('MAIL_FROM') || env('SMTP_USER'),
      to: s.to,
      replyTo: oneLine(enquiry.email), // pressing Reply answers the visitor
      ...mail,
    });
    return { sent: true };
  } catch (err) {
    console.error('Could not send the enquiry email:', err.message);
    return { sent: false, reason: err.message };
  }
}

async function sendTest(to) {
  const s = status();
  if (!s.enabled) throw Object.assign(new Error('Email alerts are not set up. Add the SMTP settings and NOTIFY_EMAIL to .env.'), { status: 400 });
  try {
    await getTransport().sendMail({
      from: env('MAIL_FROM') || env('SMTP_USER'),
      to: to || s.to,
      subject: 'Test email from the Greets admin panel',
      text: 'If you can read this, enquiry alerts will reach you.',
    });
  } catch (err) {
    throw Object.assign(new Error(`The email could not be sent: ${err.message}`), { status: 502 });
  }
}

module.exports = { status, sendEnquiryAlert, sendTest, enquiryMail, setTransport: (t) => { override = t; } };
