const router = require('express').Router();
const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const checkLink = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(checkLink),
  }),
}), createCard);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required(),
  }),
}), deleteCard);
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required(),
  }),
}), addLike);
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required(),
  }),
}), removeLike);

module.exports = router;
