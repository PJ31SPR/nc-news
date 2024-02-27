const {selectAllTopics} = require('../models/topics.models.js');


exports.getAllTopics = (req, res, next) =>{
      selectAllTopics()
      .then((topics) => {
        res.status(200).send({ topics });
      })
      .catch((err) => {
        next(err);
      });
  }

 


 