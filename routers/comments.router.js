const commentsRouter = require('express').Router();
const {removeComment, updateComment} = require('../controllers/comments.controllers.js');

commentsRouter.delete('/:comment_id', removeComment);
commentsRouter.patch('/:comment_id',updateComment);

module.exports = commentsRouter;