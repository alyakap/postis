const tasksRouter= require('./tasks/routes');
const teamRouter= require('./team/routes');

const mainRouter=function (app) {
    app.use('/tasks', tasksRouter);
    app.use('/team', teamRouter);
}

module.exports=mainRouter;