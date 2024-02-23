const {selectComments, insertComment, deleteComment} = require('../models/comments.models.js');

exports.getComments = (req, res, next) => {
    const id = req.params.article_id 
    selectComments(id).then((comments) =>{
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}

exports.addComment = (req, res, next) => {
    const id = req.params.article_id
    const {username, body} = req.body
    insertComment(id, {username, body}).then((comment) =>{
    res.status(201).send({comment})
    }).catch((err) =>{
       next(err)
    })
}

exports.removeComment = (req, res, next) => {
    const id = req.params.comment_id
    deleteComment(id).then(() => {
    res.status(204).send({})
    }).catch((err) => {
        next(err)
    })
}