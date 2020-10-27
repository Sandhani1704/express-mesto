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
      // console.log(err);
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'переданы некорректные данные в метод' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
