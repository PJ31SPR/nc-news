const usersRouter = require('express').Router();

const {getAllUsers, getUser} = require('../controllers/users.controllers.js');


usersRouter.get('/', getAllUsers);
usersRouter.get('/:username', getUser);

module.exports = usersRouter; 