const articlesRouter = require('express').Router();
const {getArticle, getAllArticles, updateArticle, getComments, addComment} = require('../controllers/articles.controllers.js');

articlesRouter.get("/:article_id", getArticle);
articlesRouter.get("/", getAllArticles); 
articlesRouter.patch('/:article_id', updateArticle);

articlesRouter.get('/:article_id/comments', getComments);
articlesRouter.post('/:article_id/comments', addComment);

module.exports = articlesRouter;