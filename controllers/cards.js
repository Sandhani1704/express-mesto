// const path = require('path');

const Card = require('../models/card');

// const jsonDataPathCards = path.join(__dirname, '..', 'data', 'cards.json');

// const readFiles = require('../utils/read-file');

const getCards = (req, res) => {
  Card.find({})
    // readFiles(jsonDataPathCards)
    .then((data) => res.send(data));
};

const createCard = (req, res) => {
  // console.log(req.user._id);
  const { _id } = req.user;
  const { name, link } = req.body;
  console.log(req.body);
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    // .catch((err) => res.status(500).send({ message: `На сервере произошла ошибка ${err}` }));
    .catch((err) => console.log(err));
};

const deleteCard = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndRemove(req.params._id)
    .then((card) => res.send(card))
    .catch((err) => console.log(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
