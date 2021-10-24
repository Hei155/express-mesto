const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      const e = new Error('Error!');
      e.statusCode = 500;
      next(e);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name == 'ValidationError') {
        const e = new Error('Проверьте введенные данные');
        e.statusCode = 400;
        next(e);
      } else {
        const e = new Error('Error!');
        next(e);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (req.user._id === card.owner) {
        if (card) {
          res.status(200).send(card);
        } else {
          const e = new Error('Not Found');
          e.statusCode = 404;
          next(e);
        }
      }
      else {
        const e = new Error('Вы не можете удалить картинку другого пользователя');
        e.statusCode = 403;
        next(e);
      }
    })
    .catch((err) => {
      if (err.name == 'CastError') {
        const e = new Error(err);
        e.statusCode = 400;
        next(e);
      } else {
        const e = new Error('Error!');
        next(e);
      }
    });
};

const addLike = (req, res, next) => {
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
        const e = new Error('Not Found');
        e.statusCode = 404;
        next(e);
      }
    })
    .catch((err) => {
      if (err.name == 'CastError') {
        const e = new Error(err);
        e.statusCode = 400;
        next(e);
      } else {
        const e = new Error('Error!');
        next(e);
      }
    });
};

const removeLike = (req, res, next) => {
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
      const e = new Error('Not Found');
      e.statusCode = 404;
      next(e);
    }
  })
  .catch((err) => {
    if (err.name == 'CastError') {
      const e = new Error(err);
      e.statusCode = 400;
      next(e);
    } else {
      const e = new Error('Error!');
      next(e);
    }
  });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
};
