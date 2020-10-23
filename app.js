const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
const path = require('path');
const routerCards = require('./routes/cards.js');
const routerUsers = require('./routes/users.js');
const routerNonexistent = require('./routes/nonexistent.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routerCards);
app.use('/', routerUsers);
app.use('/', routerNonexistent);

app.use((req, res, next) => {
  req.user = {
    _id: '5f93692fc6aa8e1b1c380e1c' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
