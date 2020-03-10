process.env.NODE_ENV = "test";
var app = require("../app");
var supertest = require("supertest");
var knex = require("../db");

beforeEach(() => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run());
});

afterEach(() => {
  return knex.migrate.rollback();
});

describe("/campaigns", () => {
  test("GET /campaigns returns correct fields", async () => {
    const result = await supertest(app).get("/campaigns");
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("Aws");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("created");
    expect(result.body[0]).toHaveProperty("color");
    expect(result.body[0]).toHaveProperty("icon");
    expect(result.body.length).toBe(3);
  });
  test("POST /campaigns adds campaign correctly", async () => {
    const result = await supertest(app)
      .post("/campaigns")
      .send({
        title: "some title",
        icon: "icon",
        color: "#ff0000"
      });
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body.length).toBe(1);
  });
  // test("DELETE /campaigns removes specific campaign correctly", async done => {
  //   const result = await supertest(app).delete("/campaigns/6");
  //   expect(result.statusCode).toBe(200);
  //   done();
  // });
  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await knex.destroy();
    done();
  });
});
