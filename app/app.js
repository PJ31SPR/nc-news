const express = require('express');
const app = express(); 
const {getAllTopics, getAllEndpoints, getArticle, getAllArticles} = require('../controllers/controller.js');
const { handleCustomError, handleInternalError, handleServerError, handleNotFound, handleBadRequest } = require('../controllers/errors.controllers.js');

// app.use(express.json());

app.get('/api/topics', getAllTopics);

app.get('/api', getAllEndpoints);

app.get('/api/articles/:article_id', getArticle);

app.get('/api/articles', getAllArticles);



app.use(handleCustomError);

app.use(handleBadRequest);

app.use(handleServerError);





module.exports = app