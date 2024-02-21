const db = require("../db/connection");

exports.selectArticle = (id) => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at,    articles.votes, articles.article_img_url
  FROM articles 
  WHERE articles.article_id=$1`,[id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return response.rows[0];
    });
};

exports.selectAllArticles = () => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }

      const articlesWithCommentCount = response.rows.map((article) => ({
        ...article,
        comment_count: parseInt(article.comment_count),
      }));

      return articlesWithCommentCount;

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
    return response.rows[0];
  });
};
