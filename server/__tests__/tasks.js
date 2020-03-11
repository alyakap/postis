process.env.NODE_ENV = "test";
var app = require("../app");
var supertest = require("supertest");
var knex = require("../db");
knex.migrate.forceFreeMigrationsLock();
describe("/tasks", () => {
  //knex.migrate.forceFreeMigrationsLock();
  beforeEach(done => {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        return knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  afterEach(done => {
    knex.migrate.rollback().then(() => {
      done();
    });
  });
  test("GET /users returns correct fields", async () => {
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
    const result = await supertest(app).get("/tasks/2");
    console.log(result.body);
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("campaigns_id");
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("Tweet about React Workshop");
    expect(result.body[0]).toHaveProperty("campaigns_id");
    expect(result.body[0].campaigns_id).toBe(2);
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
    expect(result.body[0]).toHaveProperty("assigned_firstname");
    expect(result.body[0].assigned_firstname).toBe("Jane");
    expect(result.body[0]).toHaveProperty("created_firstname");
    expect(result.body[0].created_firstname).toBe("John");
    expect(result.body[0]).toHaveProperty("updated_firstname");
    expect(result.body[0]).toHaveProperty("campaigntitle");
    expect(result.body.length).toBe(1);
  });
  test("GET /tasks/fromcampaign/:id returns correct fields", async () => {
    const result = await supertest(app).get("/tasks/fromcampaign/3");
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("LinkedIn post about React Workshop");
    expect(result.body[0]).toHaveProperty("campaigns_id");
    expect(result.body[0].campaigns_id).toBe(3);
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
    expect(result.body.length).toBe(1);
  });
  test("POST /tasks adds a task correctly", async () => {
    const result = await supertest(app)
      .post("/tasks")
      .send({
        title: "new task",
        description: "new description",
        created_user: 1,
        assigned_user: 2,
        campaigns_id: 3,
        complete: false
      });
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body.length).toBe(1);
  });
  test("PUT /tasks/:id/assign updates task's assigned user correctly", async () => {
    const result = await supertest(app)
      .put("/tasks/2/assign")
      .send({ id: 1 });
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0]).toHaveProperty("campaigns_id");
    expect(result.body[0].campaigns_id).toBe(2);
    expect(result.body[0]).toHaveProperty("description");
    expect(result.body[0]).toHaveProperty("notification");
    expect(result.body[0]).toHaveProperty("complete");
    expect(result.body[0].complete).toBe(false);
    expect(result.body[0]).toHaveProperty("created");
    expect(result.body[0]).toHaveProperty("created_user");
    expect(result.body[0]).toHaveProperty("assigned");
    expect(result.body[0]).toHaveProperty("assigned_user");
    expect(result.body[0].assigned_user).toBe(1);
    expect(result.body[0]).toHaveProperty("updated");
    expect(result.body[0]).toHaveProperty("updated_user");
  });

  test("DELETE /tasks removes specific task correctly", async () => {
    const result = await supertest(app).delete("/campaigns/2");
    expect(result.statusCode).toBe(200);
  });
  test(" PUT /tasks updates a task correctly", async () => {
    const result = await supertest(app)
      .put("/tasks/2")
      .send({
        title: "updated task",
        description: "updated description",
        created_user: 2,
        assigned_user: 1,
        campaigns_id: 3,
        complete: false
      });
    expect(result.statusCode).toBe(200);
    expect(result.type).toBe("application/json");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0].title).toBe("updated task");
    expect(result.body[0]).toHaveProperty("campaigns_id");
    expect(result.body[0].campaigns_id).toBe(3);
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
  });
  afterAll(function() {
    return knex.destroy();
  });
});
