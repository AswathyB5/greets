// pm2 keeps the admin server running, restarts it if it crashes and starts it again after a reboot.
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup
module.exports = {
  apps: [
    {
      name: 'greets-admin',
      script: 'server.js',
      cwd: __dirname,
      instances: 1, // one copy only: Publish rewrites files and must never run twice at once
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '400M',
      env: { NODE_ENV: 'production' }, // everything else comes from .env
    },
  ],
};
