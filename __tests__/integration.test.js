const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

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

        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });

  test("should return 404 Not Found when resource is not found", () => {
    return request(app)
      .get("/api/nonexistent_path")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({});
        expect(response.status).toBe(404);
      });
  });
});

