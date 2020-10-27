const router = require('express').Router();

const {
  getCards, createCard, getCardById, deleteCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.get('/cards/:cardId', getCardById);

module.exports = router;
