// const path = require('path');

const User = require('../models/user');

// const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

// const readFiles = require('../utils/read-file');

const getUsers = (req, res) => {
  // readFiles(jsonDataPath)
  //   .then((data) => res.send(data))
  //   .catch((err) => res.status(500).json({ message: `На сервере произошла ошибка ${err}` }));
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).json({ message: `На сервере произошла ошибка ${err}` }));
};

const getUser = (req, res) => {
  // const { id } = req.params;
  // readFiles(jsonDataPath)
  User.findOne({ _id: req.params.id })
    // .then((data) => {
    //   const userToFind = data.find((user) => user._id === id);
    //   return userToFind;
    // })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: `На сервере произошла ошибка ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: `На сервере произошла ошибка ${err}` }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
