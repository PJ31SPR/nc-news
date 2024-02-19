const db = require('../db/connection.js');

function selectAllTopics (){

return db.query(`SELECT * FROM topics`).then((topics) => {
    if (topics.rows.length === 0){
        Promise.reject({status: 404, msg: 'Not Found'})
    }
return topics
})

}

module.exports = selectAllTopics