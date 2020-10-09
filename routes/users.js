const routerUsers = require('express').Router(); // создали роутер

module.exports = routerUsers; // экспортировали роутер

const { users } = require('../data/cards.json');

routerUsers.get('/users/:id', (req, res) => {
  const { id } = req.params;
  // const users = JSON.parse(data);
  if (!users[id]) {
    res.send('Нет пользователя с таким id');
    return;
  }
  res.send(users[id]);
});
