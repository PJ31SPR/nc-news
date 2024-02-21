const express = require("express");
const app = express();

const {
  handleCustomError,
  handleNotNullConstraint,
  handleServerError,
  handleBadRequest,
  handleNotFound,
} = require("../controllers/errors.controllers.js");
const {
  articlesController,
  topicsController,
  commentsController,
  usersController,
} = require("../controllers/index.js");

app.use(express.json());

app.get("/api/topics", topicsController.getAllTopics);
app.get("/api", topicsController.getAllEndpoints);
app.get("/api/articles/:article_id", articlesController.getArticle);
app.get("/api/articles", articlesController.getAllArticles);
app.get('/api/articles/:article_id/comments', commentsController.getComments);

app.post('/api/articles/:article_id/comments', commentsController.addComment);

app.patch(('/api/articles/:article_id'), articlesController.updateArticle);


app.use(handleBadRequest);
app.use(handleNotFound);
app.use(handleNotNullConstraint);
app.use(handleCustomError);
app.use(handleServerError);

module.exports = app;
