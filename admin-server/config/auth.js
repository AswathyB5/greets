const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set in .env and be at least 32 characters long.');
}

const COOKIE_NAME = 'admin_token';
const TOKEN_LIFETIME_HOURS = 8;

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

module.exports = {
  JWT_SECRET,
  COOKIE_NAME,
  TOKEN_EXPIRES_IN: `${TOKEN_LIFETIME_HOURS}h`,
  cookieOptions,
  cookieMaxAge: TOKEN_LIFETIME_HOURS * 60 * 60 * 1000,
};
