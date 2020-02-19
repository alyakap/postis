const campaignsRouter = require("./campaigns/routes");
const tasksRouter = require("./tasks/routes");
//const teamRouter= require('./team/routes');

const mainRouter = function(app) {
  app.use("/campaigns", campaignsRouter);
  app.use("/tasks", tasksRouter);
};

module.exports = mainRouter;
