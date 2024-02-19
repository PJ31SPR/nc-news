const selectAllTopics = require('../models/model.js');

function getAllTopics(req, res, next){

selectAllTopics().then((topics)=> {
 
res.status(200).send(topics.rows)
}).catch((err) => {
    next(err)
});
}

module.exports = getAllTopics