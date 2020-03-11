process.env.NODE_ENV = "test";
var app = require("../app");
var supertest = require("supertest");
var knex = require("../db");
// knex.migrate.forceFreeMigrationsLock();
describe("/users", () => {
  // beforeEach(done => {
  //   knex.migrate
  //     .rollback()
  //     .then(() => knex.migrate.latest())
  //     .then(() => knex.seed.run());
  // });

  // afterEach(done => {
  //   knex.migrate.rollback().then(() => {
  //     done();
  //   });
  // });
  test("GET /users returns correct fields", async () => {
    const result = await supertest(app).get("/users");
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("firstname");
    expect(result.body[0]).toHaveProperty("lastname");
    expect(result.body[0]).toHaveProperty("email");
    expect(result.body[0]).toHaveProperty("created");
    expect(result.body[0]).toHaveProperty("updated");
    expect(result.body.length).toBe(3);
  });
  afterAll(function() {
    return knex.destroy();
  });
});
