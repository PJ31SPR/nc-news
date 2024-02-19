const {selectAllTopics, selectAllEndpoints} = require('../models/model.js');

function getAllTopics(req, res, next){

selectAllTopics().then((topics)=> {
    // console.log (topics, '<--- toopics controller')
 
res.status(200).send({topics: topics})
}).catch((err) => {
    next(err)
});
}

function getAllEndpoints(req, res, next){
    selectAllEndpoints().then((response)=>{
        res.set('Content-Type', 'application/json').status(200).send(response)
    }).catch((err) => {
        next(err)
    });
}

module.exports = {getAllTopics, getAllEndpoints}