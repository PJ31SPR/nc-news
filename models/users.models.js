const db = require('../db/connection.js');

exports.selectAllUsers =() => {
    return db.query(`SELECT * FROM users`).then((response) => {
        return response.rows
    })
}

exports.selectUser = (username) => {
return db.query(`SELECT username, avatar_url, name 
FROM users
WHERE username = $1`, [username]).then((response) => {
        if (response.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return response.rows[0];
      });
}