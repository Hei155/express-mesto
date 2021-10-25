const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const e = new Error('Что-то не так с почтой или паролем');
        e.statusCode = 401;
        next(e);
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const e = new Error('Что-то не так с почтой или паролем');
            e.statusCode = 401;
            next(e);
          }
          const token = jwt.sign({ _id: user._id }, 'super-mega-strong-secret', { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          });
          return res.status(201).send({ token });
        })
        .catch(() => {
          const e = new Error('Error!');
          e.statusCode = 500;
          return next(e);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new Error(err);
        e.statusCode = 400;
        next(e);
      } else {
        const e = new Error('Error!');
        next(e);
      }
    });
};

module.exports = login;
