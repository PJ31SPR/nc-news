const {selectAllTopics} = require('../models/topics.models.js');
const apiEndpointsJSON = require("../endpoints.json");

exports.getAllTopics = (req, res, next) =>{
      selectAllTopics()
      .then((topics) => {
        res.status(200).send({ topics });
      })
      .catch((err) => {
        next(err);
      });
  }

  exports.getAllEndpoints = (req, res, next) => {
  res.status(200).send(apiEndpointsJSON)
    .catch((err) => {
      next(err);
    });
}


 