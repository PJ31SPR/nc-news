const {usersModel} = require('../models/index.js');

exports.getAllUsers = (req, res, ext) =>{
    usersModel.selectAllUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) =>{
        console.log(err, '<-- err in users controller')
        next(err)
    })
}