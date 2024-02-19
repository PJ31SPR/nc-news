const db = require('../db/connection.js');
const fs = require("fs/promises");

function selectAllTopics (){

return db.query(`SELECT * FROM topics`).then((topics) => {
    if (topics.rows.length === 0){
        return Promise.reject({status: 404, msg: 'Not Found'})
    }
   
return topics.rows
})

}

function selectAllEndpoints(){
 return fs.readFile(`endpoints.json`, "utf8")
 }
 
 
module.exports = {selectAllTopics, selectAllEndpoints}

