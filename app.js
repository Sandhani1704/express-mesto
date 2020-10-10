const express = require('express');

const app = express();
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const path = require('path');
const routerCards = require('./routes/cards.js');
const routerUsers = require('./routes/users.js');
const routerNonexistent = require('./routes/nonexistent.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routerCards);
app.use('/', routerUsers);
app.use('/', routerNonexistent);

app.use((req, res, next) => {
  console.log(+new Date());
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
