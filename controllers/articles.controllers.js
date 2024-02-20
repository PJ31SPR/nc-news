const { articlesModel } = require("../models/index.js");

exports.getArticle = (req, res, next) => {
  const id = req.params.article_id;
  articlesModel
    .selectArticle(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  articlesModel
    .selectAllArticles()
    .then((response) => {
      res.status(200).send({ articles: response });
    })
    .catch((err) => {
      next(err);
    });
};
