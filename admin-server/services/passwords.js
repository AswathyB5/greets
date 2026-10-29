// One rule for passwords everywhere (create-admin, change password, add / reset an admin).
const MIN = 8;

// Returns a sentence describing the problem, or '' when the password is acceptable.
function checkPassword(password, username) {
  if (typeof password !== 'string') return 'Enter a password.';
  if (password.length < MIN) return `The password must be at least ${MIN} characters.`;
  if (password.length > 100) return 'The password must be 100 characters or fewer.';
  if (username && password.toLowerCase() === String(username).toLowerCase()) return 'The password must not be the same as the username.';
  if (/^(.)\1+$/.test(password) || /^(password|12345678|qwertyui)/i.test(password)) return 'That password is too easy to guess.';
  return '';
}

module.exports = { checkPassword, MIN_PASSWORD: MIN };
