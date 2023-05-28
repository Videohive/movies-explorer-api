const jwt = require('jsonwebtoken');
const { AUTHORIZATION_REQUIRED, UnauthorizedError } = require('../utils/customErrors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-dev-secret-key');
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
    return;
  }
  req.user = payload;
  next();
};
