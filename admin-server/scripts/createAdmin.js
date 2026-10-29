// Creates the first admin user.
// Usage:  npm run create-admin          make a new admin
//         npm run reset-password        set a new password for an admin who forgot it (run on the server)
require('dotenv').config();

const readline = require('readline');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const { checkPassword } = require('../services/passwords');
const RESET = process.argv.includes('--reset');

// One readline interface for the whole script, so no typed lines get lost
// between questions.
const lines = [];
const waiting = [];
let closed = false;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: process.stdin.isTTY });
let muted = false;
const originalWrite = rl._writeToOutput.bind(rl);
rl._writeToOutput = (text) => {
  // While muted (password prompts) don't echo the typed characters.
  if (!muted) originalWrite(text);
};

rl.on('line', (line) => {
  const next = waiting.shift();
  if (next) next(line);
  else lines.push(line);
});
rl.on('close', () => {
  closed = true;
  while (waiting.length) waiting.shift()('');
});

function ask(question, { hidden = false } = {}) {
  process.stdout.write(question);
  muted = hidden;
  return new Promise((resolve) => {
    const done = (answer) => {
      muted = false;
      if (hidden) process.stdout.write('\n');
      resolve(answer);
    };
    if (lines.length) done(lines.shift());
    else if (closed) done('');
    else waiting.push(done);
  });
}

async function main() {
  await connectDB();

  const username = (await ask('Admin username: ')).trim().toLowerCase();
  if (!/^[a-z0-9._-]{3,30}$/.test(username)) throw new Error('Username must be 3-30 characters: letters, numbers, . _ -');

  const existing = await Admin.findOne({ username });
  if (RESET && !existing) throw new Error(`There is no admin called ${username}.`);
  if (!RESET && existing) throw new Error(`An admin with username ${username} already exists.`);

  const password = await ask(RESET ? 'New password (min 8 characters): ' : 'Password (min 8 characters): ', { hidden: true });
  const problem = checkPassword(password, username);
  if (problem) throw new Error(problem);

  const confirm = await ask('Confirm password: ', { hidden: true });
  if (password !== confirm) throw new Error('Passwords do not match.');

  if (RESET) {
    existing.passwordHash = await Admin.hashPassword(password);
    existing.passwordChangedAt = new Date(); // signs that admin out everywhere
    await existing.save();
    console.log(`Password changed for: ${username}`);
  } else {
    await Admin.create({ username, passwordHash: await Admin.hashPassword(password) });
    console.log(`Admin created: ${username}`);
  }
}

main()
  .catch((err) => {
    console.error('Error:', err.message);
    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
    return mongoose.disconnect();
  });
