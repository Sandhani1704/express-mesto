const router = require('express').Router();
// const fsPromises = require('fs').promises;
const path = require('path');

const jsonDataPathCards = path.join(__dirname, '..', 'data', 'cards.json');
const readFiles = require('./users');

/* const readFiles = (pathUrl) => {
  return fsPromises.readFile(pathUrl, { encoding: 'utf8' })
  .then(file => {
    // console.log(file);
    return JSON.parse(file)
  })
} */

router.get('/cards', (req, res) => {
  readFiles(jsonDataPathCards)
    .then((data) => res.send(data));
});

module.exports = router;
