const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: `На сервере произошла ошибка ${err}` }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      // console.log(err);
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'невалидный id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'переданы некорректные данные в метод' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  // User.findByIdAndUpdate({ _id: req.user._id }, { name, about, avatar })
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    // .then((user) => res.status(200).send(user))
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'переданы некорректные данные в метод' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  // User.findByIdAndUpdate({ _id: req.user._id }, { name, about, avatar })
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    // .then((user) => res.status(200).send(user))
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'переданы некорректные данные в метод' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
