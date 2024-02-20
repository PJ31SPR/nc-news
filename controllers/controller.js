const {
  selectAllTopics,
  selectArticle,
  selectAllArticles
} = require("../models/model.js");

const apiEndpointsJSON = require("../endpoints.json");

function getAllTopics(req, res, next) {
  selectAllTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
}

function getAllEndpoints(req, res, next) {
  res.status(200).send(apiEndpointsJSON)
    .catch((err) => {
      next(err);
    });
}


function getArticle(req, res, next) {
const id = req.params.article_id
  selectArticle(id).then((article) => {
res.status(200).send({article})
  })
  .catch((err) =>{
    next(err);
  })
}

function getAllArticles(req, res, next){
selectAllArticles().then((response) => {
res.status(200).send({articles: response})
}).catch((err) =>{
    next(err)
})
}

module.exports = { getAllTopics, getAllEndpoints, getArticle, getAllArticles};
