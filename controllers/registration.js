const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create(
      {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      },
    )
      .then((user) => {
        res.status(201).send({
          _id: user.id,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const e = new Error(err);
          e.statusCode = 400;
          next(e);
        } else if (err.name === 'MongoServerError' && err.code === 11000) {
          const e = new Error('Данный email уже зарегистрирован');
          e.statusCode = 409;
          next(e);
        } else {
          const e = new Error('Error!');
          next(e);
        }
      }));
};

module.exports = createUser;
