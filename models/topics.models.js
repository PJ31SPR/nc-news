const db = require('../db/connection.js');

exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then((topics) => {
      if (topics.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
  
      return topics.rows;
    });
  }

  