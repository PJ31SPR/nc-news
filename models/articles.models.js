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
      
exports.selectAllArticles = (topic, sort_by = 'created_at', order_by = 'desc') => {

  const validSortBys = ['created_at', 'title', 'author', 'votes', 'comment_count'];
  const validOrders = ['asc', 'desc'];


  if (!validSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort_by parameter' });
  }

  if (!validOrders.includes(order_by.toLowerCase())) {
    return Promise.reject({ status: 400, msg: 'Invalid order parameter' });
  }

  let orderByStr = '';

  if (sort_by) {
    orderByStr = `ORDER BY articles.${sort_by} ${order_by}`;
  } else {
    orderByStr = `ORDER BY articles.created_at ${order_by}`;
  }

  const topicCheckStr = `SELECT * FROM topics WHERE slug = $1`;
  const topicCheckValue = [topic];

  return db.query(topicCheckStr, topicCheckValue)
  .then((topicResponse) => {
    if (topic && topicResponse.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Not Found' });
    }

    let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id`;

    const queryVals = [];

    if (topic) {
      queryStr += ` WHERE articles.topic = $1`;
      queryVals.push(topic);
    }

    queryStr += ` GROUP BY articles.article_id ${orderByStr}`;

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