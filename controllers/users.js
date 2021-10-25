const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      const e = new Error(err);
      next(e);
    });
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        const e = new Error('Not Found');
        e.statusCode = 404;
        next(e);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new Error(err);
        e.statusCode = 400;
        next(e);
      } else {
        const e = new Error('Error!');
        next(e);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        const e = new Error('Not Found');
        e.statusCode = 404;
        next(e);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new Error(err);
        e.statusCode(400);
        next(e);
      } else {
        const e = new Error('Error!');
        next(e);
      }
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new Error(err.message);
        e.statusCode = 400;
        next(e);
      } else {
        const e = new Error(err);
        next(e);
      }
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.link },
    { new: true, runValidators: true },
  )
    .then((avatar) => {
      res.status(200).send(avatar);
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

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
