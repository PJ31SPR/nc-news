const express = require('express');
const app = express(); 
const getAllTopics = require('../controllers/controller.js');

// app.use(express.json());

app.get('/api/topics', getAllTopics);



app.use((err, req, res, next) => {
    if(err.status && err.msg)
    res.status(err.status).send({msg:err.msg})
  next(err);
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Internal Server Err'})
});


module.exports = app