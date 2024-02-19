const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

const apiEndpointsJSON = require('../endpoints.json');

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

    describe('/api', () => {
        test('should respond with an object describing all endpoints', () => {
          return request(app)
            .get('/api')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .then((response) => {
                console.log(apiEndpointsJSON)
              expect(response.body).toEqual(expect.any(Object));
              expect(response.body).toEqual(apiEndpointsJSON)
            });
        });
      });
