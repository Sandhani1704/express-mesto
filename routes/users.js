const router = require('express').Router(); // создали роутер
const fsPromises = require('fs').promises;
const path = require('path');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

module.exports = router; // экспортировали роутер

const readFiles = (pathUrl) => fsPromises.readFile(pathUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));

router.get('/users', (req, res) => {
  readFiles(jsonDataPath)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).json({ message: `На сервере произошла ошибка ${err}` }));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readFiles(jsonDataPath)
    .then((data) => {
      const userToFind = data.find((user) => user._id === id);
      return userToFind;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).json({ message: `На сервере произошла ошибка ${err}` }));
});

module.exports = readFiles;
