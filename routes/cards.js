const router = require('express').Router();
const { getCards, createCard, deleteCard, addLike, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', removeLike);

module.exports = router;
