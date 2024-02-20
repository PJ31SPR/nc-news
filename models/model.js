const db = require("../db/connection.js");
const fs = require("fs/promises");

function selectAllTopics() {
  return db.query(`SELECT * FROM topics`).then((topics) => {
    if (topics.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }

    return topics.rows;
  });
}

function selectAllEndpoints() {
  return fs.readFile(`endpoints.json`, "utf8").then((response) =>{
    console.log(response, '<-- model')
    return response
  })
}

function selectArticle(id) {
  return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at,    articles.votes, articles.article_img_url
  FROM articles 
  WHERE articles.article_id=$1`, [id]).then((response) => {
    if (response.rows.length ===0){
        return Promise.reject({status: 404, msg: 'Not Found'})
    }
  return response.rows
  })
}

function selectAllArticles(){
    console.log('hello from model 4')
}

module.exports = { selectAllTopics, selectAllEndpoints, selectArticle, selectAllArticles};
