const path = require('path');

const jsonDataPathCards = path.join(__dirname, '..', 'data', 'cards.json');

const readFiles = require('../utils/read-file');

const getCards = (req, res) => {
  readFiles(jsonDataPathCards)
    .then((data) => res.send(data));
};

module.exports = getCards;
