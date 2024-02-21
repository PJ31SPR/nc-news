const db = require("../db/connection");

exports.selectComments = (id) => {
// console.log('hello from comments model')
return db.query(`SELECT comment_id, votes, created_at, author, body, article_id
FROM comments
WHERE article_id = $1
ORDER BY created_at DESC;
`, [id]).then((response) => {
// console.log(response.rows, '<-- resp.rows model')
if(response.rows.length === 0){
    return Promise.reject({status:404, msg: 'Not Found'})
}

return response.rows
})
}