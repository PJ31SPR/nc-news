const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

const apiEndpointsJSON = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => {
  db.end();
});

describe("/api/topics", () => {
  test("should successfully return all topics in an array of objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const topics = response.body;

        topics.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("GET:404 Not Found when resource is not found", () => {
    return request(app)
      .get("/api/nonexistent_path")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({});
        expect(response.status).toBe(404);
      });
  });
});

describe("/api", () => {
  test("should respond with an object describing all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        console.log(response.body, "<-- response body.api ");
        expect(response.body).toEqual(apiEndpointsJSON);
        //    console.log(response, '<--- response')
        //    console.log(response.body.api, '<-- resp.body.api')
        //    expect(response.body.api).toEqual(apiEndpointsJSON)
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET:200 sends a specific article to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body.article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: 1,
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
  test("GET:404 sends an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
        expect(response.status).toBe(404);
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid id type", () => {
    return request(app)
      .get("/api/articles/forklift")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("/api/articles", () => {
  test("should return array of all article objects, with the correct properties  ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const {articles} = response.body;
        articles.forEach((article) => {
        expect(article).toMatchObject({

            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("GET:404 Not Found when resource is not found", () => {
    return request(app)
      .get("/api/badPath")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({});
        expect(response.status).toBe(404);
      });
  });
});
