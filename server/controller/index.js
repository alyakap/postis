const campaignsRouter = require("./campaigns/routes");
const tasksRouter = require("./tasks/routes");
const usersRouter = require("./users/routes");

const mainRouter = function(app) {
  app.use("/campaigns", campaignsRouter);
  app.use("/tasks", tasksRouter);
  app.use("/users", usersRouter);
};

module.exports = mainRouter;
