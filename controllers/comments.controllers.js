const {commentsModel} = require('../models/index.js');

exports.getComments = (req, res, next) => {
    const id = req.params.article_id 
    commentsModel.selectComments(id).then((comments) =>{
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}