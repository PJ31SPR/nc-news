const {deleteComment} = require('../models/comments.models.js');

exports.removeComment = (req, res, next) => {
    const id = req.params.comment_id
    deleteComment(id).then(() => {
    res.status(204).send({})
    }).catch((err) => {
        next(err)
    })
}