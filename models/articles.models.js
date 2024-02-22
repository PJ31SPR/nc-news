const db = require("../db/connection");

exports.selectArticle = (id) => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
  FROM articles 
  LEFT JOIN comments ON articles.article_id = comments.article_id
  WHERE articles.article_id=$1
  GROUP BY articles.article_id;`,[id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return response.rows[0];
    });
};
      
exports.selectAllArticles = (topic) => {

  const topicCheckStr = `SELECT * FROM topics WHERE slug = $1`;
  const topicCheckValue = [topic];

  return db.query(topicCheckStr, topicCheckValue)
    .then((topicResponse) => {
      if (topic && topicResponse.rows.length === 0) {
   
        return Promise.reject({ status: 404, msg: "Not Found" });
      }

      let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id`;

      const queryVals = [];

      if (topic) {
        queryStr += ` WHERE articles.topic = $1`;
        queryVals.push(topic);
      }

      queryStr += ` GROUP BY articles.article_id ORDER BY articles.created_at DESC`;

      return db.query(queryStr, queryVals)
        .then((response) => {
          return response.rows;
        });
    });
};

exports.modifyArticle = (id, inc_votes) =>{
  return db.query(
    `UPDATE articles 
     SET votes = votes + $1
     WHERE article_id = $2
     RETURNING *`,
    [inc_votes, id]
  )
  .then((response) => {
    if (response.rows.length === 0){
      return Promise.reject({status: 404, msg: 'Not Found'})
    }
    return response.rows[0];
  })
};
