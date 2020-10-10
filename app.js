const express = require('express');

const app = express();
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const path = require('path');
const routerCards = require('./routes/cards.js');
const routerNonexistent = require('./routes/nonexistent.js');
const routerUsers = require('./routes/users.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routerCards);
app.use('/', routerNonexistent);
app.use('/', routerUsers);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
