const db = require("../db/connection");

exports.selectComments = (id) => {
return db.query(`SELECT comment_id, votes, created_at, author, body, article_id
FROM comments
WHERE article_id = $1
ORDER BY created_at DESC;`, 
[id])
.then((response) => {
return response.rows
})
}

exports.insertComment = (id, {username, body}) => {
if (!id || !username || !body){
    return Promise.reject({status: 400, msg: 'Bad Request'})
};
return db.query(`INSERT INTO comments (article_id, author, body)
VALUES ($1,$2,$3)
RETURNING *`,
[id, username, body]).then((response) => {
    return response.rows[0]
})
}

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