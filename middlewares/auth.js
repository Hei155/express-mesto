const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const err = new Error('Необходима авторизация');
  err.statusCode = 401;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(err);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-mega-strong-secret');
  } catch (e) {
    next(err);
  }

  req.user = payload;
  next();
};
