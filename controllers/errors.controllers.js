
exports.handleCustomError = ((err, req, res, next) => {
    if(err.status && err.msg)
    res.status(err.status).send({msg:err.msg})
  next(err);
})

exports.handleBadRequest = ((err, req, res, next) =>{
    if(err.code === '22P02')
    res.status(400).send({msg: 'Bad Request'})
})

exports.handleServerError = ((err, req, res, next) => {
    res.status(500).send({msg: 'Internal Server Err'})
});
