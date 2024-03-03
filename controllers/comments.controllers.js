const {deleteComment, modifyComment} = require('../models/comments.models.js');

exports.removeComment = (req, res, next) => {
    const id = req.params.comment_id
    deleteComment(id).then(() => {
    res.status(204).send({})
    }).catch((err) => {
        next(err)
    })
}

exports.updateComment = (req, res, next) => {
    const id = req.params.comment_id
    const {inc_votes} = req.body
    modifyComment(id, inc_votes).then((comment) =>{
      res.status(200).send({comment})
    }).catch((err) => {
        console.log((err), 'err in controller')
      next(err)
    })
  }