exports.handleBadRequest = ((err, req, res, next) =>{
    if(err.code === '22P02'){
    res.status(400).send({msg: 'Bad Request'})
    }
next(err)
})

exports.handleNotFound = ((err, req, res, next) =>{
    if(err.code === '23503'){
    res.status(404).send({msg: 'Not Found'})
    }
next(err)
})

exports.handleNotNullConstraint = ((err, req, res, next) => {
    if(err.code === '23502'){
        res.status(400).send({msg: 'Bad Request'})
    }
    next(err)
})

exports.handleCustomError = ((err, req, res, next) => {
    if(err.status && err.msg){
    res.status(err.status).send({msg:err.msg})
    }
  next(err);
})

exports.handleServerError = ((err, req, res, next) => {
    res.status(500).send({msg: 'Internal Server Err'})
});
