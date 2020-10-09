const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const path = require('path');
const router = require('./routes/cards.js');
const routerUsers = require('./routes/users.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
app.use('/', routerUsers);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
