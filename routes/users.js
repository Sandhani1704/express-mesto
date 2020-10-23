const router = require('express').Router(); // создали роутер

const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

module.exports = router; // экспортировали роутер
