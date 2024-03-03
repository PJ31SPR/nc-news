const {selectAllUsers, selectUser} = require('../models/users.models.js');

exports.getAllUsers = (req, res, ext) => {
    selectAllUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) =>{
        next(err)
    })
}

exports.getUser = (req, res, next) => {
    const username = req.params.username
selectUser(username).then((user) => {
    res.status(200).send({user})
}).catch((err) => {
    next(err)
})
}