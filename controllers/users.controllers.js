const {selectAllUsers} = require('../models/users.models.js');

exports.getAllUsers = (req, res, ext) =>{
    selectAllUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) =>{
        next(err)
    })
}