const {
  selectAllTopics,
  selectAllEndpoints,
  selectArticle,
  selectAllArticles
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
  selectAllEndpoints().then((api) => {
        console.log(api, '<-- resp in controller')
        // res.status(200).send({api});
        res.set('Content-Type', 'application/json').status(200).send(api);
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

function getAllArticles(req, res, next){
selectAllArticles().then((response) => {
    console.log(response, '<<<<<')
res.status(200).send({articles: response})
}).catch((err) =>{
    next(err)
})
}

module.exports = { getAllTopics, getAllEndpoints, getArticle, getAllArticles};
