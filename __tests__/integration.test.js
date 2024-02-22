const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const jestSorted = require("jest-sorted");

const apiEndpointsJSON = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => {
  db.end();
});

describe("GET/api/topics", () => {
  test("GET 200: should successfully return all topics in an array of objects", () => {
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

describe("GET /api", () => {
  test("GET 200: should respond with an object describing all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(apiEndpointsJSON);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("GET:200 sends a specific article to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body.article).toMatchObject({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: expect.any(String),
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("GET:404 sends an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .get("/api/articles/99")
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

describe("GET /api/articles", () => {
  test("GET 200: should return array of all article objects, with the correct properties  ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) => {
          expect(article.body).toBeUndefined();

          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
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

describe("GET /api/articles/:article_id/comments", () => {
  test("GET 200: should return all comments from a specified article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;
        expect(commentsArr).toBeSortedBy("created_at", { descending: true });

        commentsArr.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          });
        });
      });
  });
  test("GET 200: should return an empty array when article has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;

        expect(response.body).toEqual({ comments: [] });
        expect(commentsArr).toHaveLength(0);
      });
  });
  test("GET 400: sends an appropriate status and error message when given an invalid id type", () => {
    return request(app)
      .get("/api/articles/invalid_article_id/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("POST 201: successfully inserts a new comment to the db, and returns article to client", () => {
    const newComment = {
      username: "butter_bridge",
      body: "wow look, a new comment!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.comment.author).toBe("butter_bridge"),
          expect(response.body.comment.body).toBe("wow look, a new comment!");
      });
  });
  test("POST 404: article_id does not exist", () => {
    const newComment = {
      username: "butter_bridge",
      body: "wow look, a new comment!",
    };
    return request(app)
      .post("/api/articles/99/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
        expect(response.status).toBe(404);
      });
  });
  test("POST 400: article_id is invalid type ", () => {
    const newComment = {
      username: "butter_bridge",
      body: "wow look, a new comment!",
    };
    return request(app)
      .post("/api/articles/invalid_article_id/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
        expect(response.status).toBe(400);
      });
  });
  test("POST 400: body key missing", () => {
    const invalidComment = {
      username: "butter_bridge",
      // "body" key is missing
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(invalidComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
        expect(response.status).toBe(400);
      });
  });
  test("POST 404: username not valid ", () => {
    const newComment = {
      username: "Dave123",
      body: "wow look, a new comment!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
        expect(response.status).toBe(404);
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH 200: successfully updates the article votes", () => {
    const updatedVotes = {
      inc_votes: 10,
    };

    return request(app)
      .patch("/api/articles/1")
      .send(updatedVotes)
      .expect(200)
      .then((response) => {
        expect(response.body.article).toHaveProperty("article_id", 1);
        expect(response.body.article).toHaveProperty(
          "title",
          "Living in the shadow of a great man"
        );
        expect(response.body.article).toHaveProperty("topic", "mitch");
        expect(response.body.article).toHaveProperty("author", "butter_bridge");
        expect(response.body.article).toHaveProperty(
          "body",
          "I find this existence challenging"
        );
        expect(response.body.article).toHaveProperty("created_at");
        expect(response.body.article).toHaveProperty("votes", 110);
        expect(response.body.article).toHaveProperty(
          "article_img_url",
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("PATCH 400: sends an appropriate status and error message when given an invalid id type", () => {
    const updatedVotes = {
      inc_votes: 10,
    };

    return request(app)
      .patch("/api/articles/forklift")
      .send(updatedVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
        expect(response.status).toBe(400);
      });
  });
  test("PATCH 400: sends an appropriate status and error message when invalid request body format given", () => {
    const updatedVotes = {
      inc_votes: "ten",
    };

    return request(app)
      .patch("/api/articles/1")
      .send(updatedVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
        expect(response.status).toBe(400);
      });
  });
  test("PATCH 404: sends an appropriate status and error message when non-existent article", () => {
    const updatedVotes = {
      inc_votes: 10,
    };

    return request(app)
      .patch("/api/articles/99")
      .send(updatedVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
        expect(response.status).toBe(404);
      });
  });
  test("PATCH 400: sends an appropriate status and error message when missing request body", () => {
    const updatedVotes = null || undefined;
    return request(app)
      .patch("/api/articles/1")
      .send(updatedVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
        expect(response.status).toBe(400);
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("DELETE 204: should delete given comment and return correct status code", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
        expect(response.status).toBe(204);
      });
  });
  test("DELETE 400: sends an appropriate status and error message when :comment_id invalid type", () => {
    return request(app)
      .delete("/api/comments/forklift")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
        expect(response.status).toBe(400);
      });
  });
  test("DELETE 404: sends an appropriate status and error message when :comment_id does not exist", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/users", () => {
  test("GET 200: should return array of all users (with correct properties if exist)", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.users)).toBe(true);
        
        const usersArr = response.body.users;
        usersArr.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test('GET 404: sends an appropriate status and error message when invalid path', () => {
    return request(app)
    .get('/api/not-users')
    .expect(404)
    .then((response) => {
      expect(response.body).toEqual({});
      expect(response.status).toBe(404);
    })
  });
});
