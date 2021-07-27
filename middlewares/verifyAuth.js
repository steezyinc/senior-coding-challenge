require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

// eslint-disable-next-line consistent-return
function verifyAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: 'not authed to access this resource' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, secret);
    res.locals.user = { id: decoded.sub };
  } catch (err) {
    return res.status(403).json({ message: 'not authed to access this resource' });
  }

  next();
}

module.exports = {
  verifyAuth,
};
