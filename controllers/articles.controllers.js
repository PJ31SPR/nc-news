const { selectArticle, selectAllArticles, modifyArticle } = require("../models/articles.models.js");

exports.getArticle = (req, res, next) => {
  const id = req.params.article_id;
  selectArticle(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const topic  = req.query.topic
  selectAllArticles(topic)
    .then((response) => {
      res.status(200).send({ articles: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticle = (req, res, next) => {
  const id = req.params.article_id
  const {inc_votes} = req.body
  modifyArticle(id, inc_votes).then((article) =>{
    res.status(200).send({article})
  }).catch((err) => {
    next(err)
  })
}