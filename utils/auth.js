require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const secret = process.env.SECRET;

function issueJWT(id) {
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, secret, { expiresIn: '1d' });

  return signedToken;
}

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

async function passwordIsVerified(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);

  return match;
}

module.exports = {
  issueJWT,
  hashPassword,
  passwordIsVerified,
};
