const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Not Found' });
      }
    })
    .catch((err) => {
      if (err.name == 'CastError') {
        res.status(400).send({ message: `${err}` });
      } else {
        console.log(err);
        res.status(500).send({ message: 'Error!' });
      }
    });
};

const createUser = (req, res) => {
  User.create({ ...req.body }, { runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name == 'ValidationError') {
        res.status(400).send({ message: `${err}` });
      } else {
        console.log(err);
        res.status(500).send({ message: 'Error!' });
      }
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id,{ name: req.body.name, about: req.body.about }, { new: true }, { runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name == 'ValidationError') {
        res.status(400).send({ message: `${err}` });
      } else {
        console.log(err);
        res.status(500).send({ message: 'Error!' });
      }
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.link }, { runValidators: true })
  .then((avatar) => {
    res.status(200).send(avatar);
  })
  .catch((err) => {
    if (err.name == 'ValidationError') {
      res.status(400).send({ message: `${err}` });
    } else {
      console.log(err);
      res.status(500).send({ message: 'Error!' });
    }
  });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
};
