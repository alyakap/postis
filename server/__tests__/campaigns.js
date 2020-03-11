process.env.NODE_ENV = "test";
var app = require("../app");
var supertest = require("supertest");
var knex = require("../db");

// beforeEach(done => {
//   knex.migrate.rollback().then(() => {
//     knex.migrate.latest().then(() => {
//       return knex.seed.run().then(() => {
//         done();
//       });
//     });
//   });
// });
// // afterEach(() => {
// //   return knex.migrate.rollback();
// // });
// afterEach(done => {
//   knex.migrate.rollback().then(() => {
//     done();
//   });
// });

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
  test("GET /campaigns/id returns correct element", async () => {
    const result = await supertest(app).get("/campaigns/2");
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0].id).toBe(2);
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("Angular");
    expect(result.body[0]).toHaveProperty("created");
    expect(result.body[0]).toHaveProperty("color");
    expect(result.body[0]).toHaveProperty("icon");
    expect(result.body.length).toBe(1);
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
  test("PUT /campaigns updates campaign correctly", async () => {
    const result = await supertest(app)
      .put("/campaigns/3")
      .send({
        title: "updated title",
        icon: "updated icon",
        color: "#ff0010"
      });
    expect(result.body[0].id).toBe(3);
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("updated title");
    expect(result.body[0]).toHaveProperty("created");
    expect(result.body[0]).toHaveProperty("color");
    expect(result.body[0].color).toBe("#ff0010");
    expect(result.body[0]).toHaveProperty("icon");
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body.length).toBe(1);
  });
  test("DELETE /campaigns removes specific campaign correctly", async () => {
    const result = await supertest(app).delete("/campaigns/6");
    expect(result.statusCode).toBe(200);
  });
  afterAll(function() {
    return knex.destroy();
  });
});
