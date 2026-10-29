# Putting the admin panel and website live

This guide uses one small Linux server (a VPS, Ubuntu 22.04 or newer). The website files and the admin run on it
together, so **Publish** (which rewrites the product pages) works exactly as it does on your computer.

You need: a server, your domain's DNS, a MongoDB Atlas database, a Cloudinary account (pictures), and optionally an
email service (enquiry alerts). All of these are free to start except the server.

---

## 1. Layout on the server

Keep the admin **outside** the folder the web server shows to visitors, or its files (and `.env`) would be downloadable.

```
/srv/greets/site/           <- the website (index.html, products.js, bmi/, build_pages.js ...)  = SITE_DIR
/srv/greets/admin-server/   <- the admin (this folder)
```

## 2. Install the tools (once)

```bash
sudo apt update && sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm install -g pm2
sudo apt install -y certbot python3-certbot-nginx
```

## 3. Copy the files

Upload (git, scp or SFTP) the website to `/srv/greets/site` **without** the `admin-server` folder, and the
`admin-server` folder to `/srv/greets/admin-server`. Then:

```bash
cd /srv/greets/admin-server
npm install --omit=dev
```

## 4. Settings (`/srv/greets/admin-server/.env`)

Copy `.env.example` to `.env` and fill in:

| Setting | What to put |
|---|---|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | The Atlas address, `mongodb+srv://USER:PASSWORD@greets.ycdncgc.mongodb.net/greets_admin` |
| `JWT_SECRET` | A random string: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `SITE_DIR` | `/srv/greets/site` |
| `ALLOWED_ORIGINS` | `https://www.greetsequipment.com,https://greetsequipment.com` |
| `TRUST_PROXY` | `1` |
| `SITE_PUBLIC_URL` | `https://www.greetsequipment.com` |
| `CLOUDINARY_*` | Cloud name, API key, API secret from the Cloudinary dashboard |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | **Set both before the first start.** The first admin is created from these. If they are not set, a default password written in `config/defaultAdmin.js` is used, and anyone who can read the code knows it. Use a long password of your own |
| `AUTO_PUBLISH` | Optional. Products go live by themselves after every save. `false` brings back a "Publish to website" button |
| `SHOW_ACTIVITY` | Optional. `true` shows the Activity page (who changed what) |
| `SMTP_*`, `MAIL_FROM`, `NOTIFY_EMAIL` | Optional: see below |

Protect the file: `chmod 600 .env`.

**MongoDB Atlas:** in *Security > Network Access* add this server's public IP. Create a database user with the role
*Read and write to a specific database* (`greets_admin`) for the live server instead of using an Atlas admin user.

**Email alerts (optional):** any SMTP service works. For Brevo: create an account, open *SMTP & API*, copy the SMTP
server, port (587), login and SMTP key into `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`; set `MAIL_FROM` to an
address you have verified there and `NOTIFY_EMAIL` to who should receive the alerts. In the admin, *Enquiries* then
shows "Email alerts are on" and a *Send a test email* link.

## 5. Make your admin login

If you set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in step 4, the first admin is created for you when the server starts and you can skip the command below. If you use a database that already has admins (for example the one used while building the site), their old passwords still work: run `npm run reset-password` for each so only people you trust can sign in. The *My account* and *Admins* screens are hidden unless `ALLOW_ACCOUNT_MANAGEMENT=true`, so passwords are changed from the server with this command.

```bash
cd /srv/greets/admin-server
npm run create-admin
```

It asks for a username and password (8+ characters). More admins can be added later in the panel under *Admins*.

## 6. Start it and keep it running

```bash
cd /srv/greets/admin-server
pm2 start ecosystem.config.js
pm2 save
pm2 startup          # run the command it prints, once
```

Check: `curl http://127.0.0.1:5000/api/health` answers `{"status":"ok"}`. The first start also copies the product
catalogue from `products.js` into the database. Keep it at **one** copy (`instances: 1`).

## 7. Web server and HTTPS

1. In your DNS, point `www`, the bare domain and `admin` at the server's IP.
2. Copy `nginx.conf.example` to `/etc/nginx/sites-available/greets`, edit the domain names and `root`, then enable it:
   ```bash
   sudo ln -s /etc/nginx/sites-available/greets /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d www.greetsequipment.com -d greetsequipment.com -d admin.greetsequipment.com
   ```
3. Open `https://admin.greetsequipment.com` and sign in.

## 8. Tell the website where the admin is

In `/srv/greets/site/main.js`, near the top, set one line:

```js
var ADMIN_URL = 'https://admin.greetsequipment.com';
```

(Leave it empty only if you set up nginx to pass `/api/` on the website's own address.) The same file serves every
page, so nothing else needs editing. Then visit the website, edit a heading in the admin, and refresh the site.

## 9. First checks

- Admin > *Pages*: change a heading, save, see it on the website.
- Send the website's contact form: it appears in *Enquiries* (and in your inbox if email alerts are on).
- Upload a picture: it should open from a `res.cloudinary.com` address.
- Admin > *Products*: change a product's one-line summary and save. The bar at the top should say *Putting your change on the website...* and then *Live on the website*. Open that product's page to see it.

## 10. Updating later

**Do not overwrite the live website folder with an older copy.** Publishing rewrites `products.js`, `index.html`, `contact.html`, `privacy.html`, `sitemap.xml` and the product folders (`bmi/`, `novatec/`, `huasheng/`). Treat the folder on the server as the master. If you must replace files, run **Publish** (or save any product) afterwards. The admin user that runs pm2 must be allowed to write to `SITE_DIR`.

Change the code or website files, then `pm2 restart greets-admin`. Page text, pictures and products are edited in the
panel and need no restart. **Publish** keeps the ten latest backups of `products.js`, `index.html` and `sitemap.xml` in
`admin-server/backups/`.

## 11. Backups

- **Database:** Atlas free clusters do not include scheduled backups. Run `mongodump --uri "<your MONGODB_URI>"` now and
  then (or upgrade the cluster), and keep the copy somewhere else.
- **Website folder** (`/srv/greets/site`): copy it regularly. Publish changes the product pages there.
- **`admin-server/uploads/`:** only used if Cloudinary is not set up.

## 12. If something goes wrong

| Problem | Do this |
|---|---|
| Forgot the admin password | On the server: `npm run reset-password` |
| Site shows no edits / contact form fails | Check `ADMIN_URL` in `main.js`, and that `ALLOWED_ORIGINS` lists the website address exactly (`https://`, no slash at the end) |
| "Too many login attempts" | Wait 15 minutes. Check `TRUST_PROXY=1`, or every visitor looks like one address |
| Publish fails | The message says why; the website is left as it was. Backups are in `admin-server/backups/` |
| Can't connect to the database | Atlas *Network Access* must include the server's IP; check the password in `MONGODB_URI` |
| See the logs | `pm2 logs greets-admin` |

## 13. Security checklist before announcing it

- [ ] `NODE_ENV=production` and the site is on HTTPS (login cookie is HTTPS-only).
- [ ] `JWT_SECRET` is long and random, and `.env` is `chmod 600`.
- [ ] Any password or key ever pasted into a chat or email has been replaced (Atlas user, Cloudinary API key).
- [ ] The database user used by the server can only read and write `greets_admin`.
- [ ] `ALLOWED_ORIGINS` lists only your own website addresses.
- [ ] `admin-server` is not inside the website folder, and the nginx rules hiding `build_pages.js`, `notes` and dot-files are on.

## 13. Checklist for the person deploying

Before going live:
- [ ] `NODE_ENV=production`, a `JWT_SECRET` of 32+ random characters, and a `.env` readable only by the server user (`chmod 600`).
- [ ] `ADMIN_USERNAME` / `ADMIN_PASSWORD` set, and old passwords reset if an existing database is reused.
- [ ] Any key or password that was ever pasted in a chat or email has been replaced (Cloudinary secret, Atlas password).
- [ ] `SITE_DIR` points at the website folder, and it is writable by the user running pm2. The admin folder is not inside the folder nginx serves.
- [ ] `ALLOWED_ORIGINS`, `TRUST_PROXY=1`, `SITE_PUBLIC_URL` set; HTTPS working on both the website and the admin address.
- [ ] `ADMIN_URL` set in `main.js`.
- [ ] Atlas Network Access allows the server; Cloudinary variables set.
- [ ] pm2 runs **one** instance only.

After going live (about 10 minutes):
- [ ] Sign in at the admin address, and a wrong password is refused.
- [ ] Pages: change a heading, save, refresh the website.
- [ ] Upload a picture on a page: it loads from `res.cloudinary.com`.
- [ ] Send the contact form from the website: it shows in *Enquiries* (and by email if SMTP is set).
- [ ] Products: edit a summary, save. The bar says *Live on the website*; open that product page.
- [ ] Edit the Header menu once and check it changed on Home, Contact and Privacy.
- [ ] Open the admin on a phone: the menu button opens the sidebar.
- [ ] `curl https://admin.<domain>/api/health` answers `{"status":"ok"}`.

## 14. Alternative: shared hosting with cPanel (for example GoDaddy)

Use this **only** if the hosting plan has **Setup Node.js App** in cPanel (many shared plans do not; ask the host, or use the VPS route above).
This route has **not been tested** by the people who wrote the admin, so follow the check-list in section 13 carefully.

1. **Subdomain:** cPanel > Domains: create `admin.greetsequipment.com` and turn on its free SSL (AutoSSL). Its document root can stay empty.
2. **Upload the admin** to a folder **outside** `public_html`, for example `/home/<cpanel-user>/admin-server` (File Manager or SFTP). Do not upload `node_modules`.
3. **Setup Node.js App > Create application:**
   - Node.js version: the newest offered (22 if available; at least 18).
   - Application mode: Production.
   - Application root: `admin-server` (the folder from step 2).
   - Application URL: `admin.greetsequipment.com`.
   - Application startup file: `server.js`.
4. **Environment variables** (on the same screen): the settings of step 4 above: `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ALLOWED_ORIGINS=https://greetsequipment.com,https://www.greetsequipment.com`, `TRUST_PROXY=1`, `SITE_PUBLIC_URL`, `CLOUDINARY_*`. **Also `SITE_DIR`**: the folder that holds the website's `index.html`, normally `/home/<cpanel-user>/public_html`. Do not set `PORT`: cPanel provides it.
5. Click **Run NPM Install**, then **Start App** (or Restart). Open `https://admin.greetsequipment.com/api/health`: it must answer `{"status":"ok"}`.
6. **Website:** upload the website files to `public_html` (without `admin-server`), and in its `main.js` set `var ADMIN_URL = 'https://admin.greetsequipment.com';`.
7. **MongoDB Atlas > Network Access:** the shared server's address can change, so allow `0.0.0.0/0` and rely on a strong database password.
8. Sign in at the admin address and go through the check-list in section 13.

Things to watch on shared hosting:
- Publishing runs a page generator (about 70 pages). If the host stops it for using too much memory or time, the admin shows the reason and the website stays as it was. Ask the host to raise the limit, or use the VPS route.
- If the app does not start, open the log shown on the Node.js App screen. The usual causes are a wrong Node version, a missing environment variable, or the Atlas address not being allowed.
- Copying website files over `public_html` again overwrites published product pages (see section 10).
