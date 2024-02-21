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

exports.updateArticle = (req, res, next) => {
  // console.log('hello from patch controller')
  const id = req.params.article_id
  const {inc_votes} = req.body
  articlesModel.modifyArticle(id, inc_votes).then((article) =>{
    res.status(200).send({article})
  }).catch((err) => {
    console.log(err, '<--- err in patch controller')
    next(err)
  })

  
}