const express = require("express");
const app = express();

const {
  handleCustomError,
  handleServerError,
  handleNotFound,
  handleBadRequest,
} = require("../controllers/errors.controllers.js");
const {
  articlesController,
  topicsController,
  commentsController,
  usersController,
} = require("../controllers/index.js");

// app.use(express.json());

app.get("/api/topics", topicsController.getAllTopics);

app.get("/api", topicsController.getAllEndpoints);

app.get("/api/articles/:article_id", articlesController.getArticle);

app.get("/api/articles", articlesController.getAllArticles);

app.use(handleCustomError);

app.use(handleBadRequest);

app.use(handleServerError);

module.exports = app;
