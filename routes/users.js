const router = require('express').Router(); // создали роутер

const path = require('path');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

const readFiles = require('./utils');

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

module.exports = router; // экспортировали роутер
