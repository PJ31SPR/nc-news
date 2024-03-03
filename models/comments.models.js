const db = require("../db/connection");

exports.deleteComment = (id) => {
    return db.query(`DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *`, [id]).then((response) =>{
        if (response.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found'})
        }
        
        return response.rows[0]
    })
}

exports.modifyComment = (id, inc_votes) => {
    return db.query(`UPDATE comments 
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *`, [inc_votes, id]).then((response) => {
        if (response.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found'})
          }
          return response.rows[0];
        })
    };