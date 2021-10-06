const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error' });
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Not Found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error!' });
    });
};

const addLike = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    )
    .then((like) => {
      if (like) {
        res.status(200).send(like);
      } else {
        res.status(404).send({ message: 'Not Found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error!' });
    });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((like) => {
    if (like) {
      res.status(200).send(like);
    } else {
      res.status(404).send({ message: 'Not Found' });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Error!' });
  });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
};
