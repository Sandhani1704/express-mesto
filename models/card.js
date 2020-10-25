const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(v);
      },
      message: 'Ошибка в ссылке',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
