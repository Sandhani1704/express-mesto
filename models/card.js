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
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

        return regex.test(v);
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
