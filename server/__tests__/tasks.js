process.env.NODE_ENV = "test";
var app = require("../app");
var supertest = require("supertest");
var knex = require("../db");

// beforeEach(() => {
//   return knex.migrate
//     .rollback()
//     .then(() => knex.migrate.latest())
//     .then(() => knex.seed.run());
// });

// afterEach(() => {
//   return knex.migrate.rollback();
// });

describe("/tasks", () => {
  test("GET /tasks returns correct fields", async () => {
    const result = await supertest(app).get("/tasks");
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("Organize a React Workshop locally");
    expect(result.body[0]).toHaveProperty("campaigns_id");
    expect(result.body[0].campaigns_id).toBe(1);
    expect(result.body[0]).toHaveProperty("description");
    expect(result.body[0]).toHaveProperty("notification");
    expect(result.body[0]).toHaveProperty("complete");
    expect(result.body[0].complete).toBe(false);
    expect(result.body[0]).toHaveProperty("created");
    expect(result.body[0]).toHaveProperty("created_user");
    expect(result.body[0]).toHaveProperty("assigned");
    expect(result.body[0]).toHaveProperty("assigned_user");
    expect(result.body[0]).toHaveProperty("updated");
    expect(result.body[0]).toHaveProperty("updated_user");
    expect(result.body[0]).toHaveProperty("firstname");
    expect(result.body[0]).toHaveProperty("campaigntitle");
    expect(result.body.length).toBe(3);
  });
  test("GET /tasks/id returns correct element", async () => {
    const result = await supertest(app).get("/tasks/1");
    //console.log(result.body);
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    //expect(result.body[0]).toHaveProperty("id");
    // expect(result.body[0]).toHaveProperty("campaigns_id");
    // expect(result.body[0]).toHaveProperty("title");
    // expect(result.body[0].title).toBe("Tweet about React Workshop");
    // expect(result.body[0]).toHaveProperty("campaigns_id");
    // expect(result.body[0].campaigns_id).toBe(2);
    // expect(result.body[0]).toHaveProperty("description");
    // expect(result.body[0]).toHaveProperty("notification");
    // expect(result.body[0]).toHaveProperty("complete");
    // expect(result.body[0].complete).toBe(false);
    // expect(result.body[0]).toHaveProperty("created");
    // expect(result.body[0]).toHaveProperty("created_user");
    // expect(result.body[0]).toHaveProperty("assigned");
    // expect(result.body[0]).toHaveProperty("assigned_user");
    // expect(result.body[0]).toHaveProperty("updated");
    // expect(result.body[0]).toHaveProperty("updated_user");
    // expect(result.body[0]).toHaveProperty("assigned_firstname");
    // //expect(result.body[0].assigned_firstname).toBe("Jane");
    // expect(result.body[0]).toHaveProperty("created_firstname");
    // //expect(result.body[0].created_firstname).toBe("John");
    // expect(result.body[0]).toHaveProperty("updated_firstname");
    // expect(result.body[0]).toHaveProperty("campaigntitle");
    // expect(result.body.length).toBe(1);
  });
  //   test("POST /campaigns adds campaign correctly", async () => {
  //     const result = await supertest(app)
  //       .post("/campaigns")
  //       .send({
  //         title: "some title",
  //         icon: "icon",
  //         color: "#ff0000"
  //       });
  //     expect(result.statusCode).toBe(200);
  //     expect(result.type).toBe("application/json");
  //     expect(result.body.length).toBe(1);
  //   });
  //   test("PUT /campaigns updates campaign correctly", async () => {
  //     const result = await supertest(app)
  //       .put("/campaigns/3")
  //       .send({
  //         title: "updated title",
  //         icon: "updated icon",
  //         color: "#ff0010"
  //       });
  //     console.log(result.body);
  //     expect(result.body[0].id).toBe(3);
  //     expect(result.body[0]).toHaveProperty("title");
  //     expect(result.body[0].title).toBe("updated title");
  //     expect(result.body[0]).toHaveProperty("created");
  //     expect(result.body[0]).toHaveProperty("color");
  //     expect(result.body[0].color).toBe("#ff0010");
  //     expect(result.body[0]).toHaveProperty("icon");
  //     expect(result.statusCode).toBe(200);
  //     expect(result.type).toBe("application/json");
  //     expect(result.body.length).toBe(1);
  //   });
  //   test("DELETE /campaigns removes specific campaign correctly", async () => {
  //     const result = await supertest(app).delete("/campaigns/6");
  //     expect(result.statusCode).toBe(200);
  //   });
  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await knex.destroy();
    done();
  });
});
