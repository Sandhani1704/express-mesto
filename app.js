const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const routerNonexistent = require('./routes/nonexistent.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    // _id: '5f947b6f7e5bcb276032c34d',
    _id: '5f947b6f7e5bcb276032c34d', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', routerUsers);
app.use('/', routerCards);
app.use('/', routerNonexistent);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
