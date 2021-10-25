const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', removeLike);

module.exports = router;
