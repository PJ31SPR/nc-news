const {
  selectAllTopics,
  selectAllEndpoints,
  selectArticle,
} = require("../models/model.js");

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
  selectAllEndpoints()
    .then((response) => {
      res.set("Content-Type", "application/json").status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
}

function getArticle(req, res, next) {
const id = req.params.article_id
  selectArticle(id).then((article) => {
res.status(200).send({article : article})
  })
  .catch((err) =>{
    next(err);
  })
}

module.exports = { getAllTopics, getAllEndpoints, getArticle };
