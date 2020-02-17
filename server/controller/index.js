const campaignsRouter = require("./campaigns/routes");
//const teamRouter= require('./team/routes');

const mainRouter = function(app) {
  app.use("/campaigns", campaignsRouter);
  //app.use("/team", teamRouter);
};

module.exports = mainRouter;
