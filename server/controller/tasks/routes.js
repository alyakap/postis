const tasksRouter = require("express").Router();

const {
  handleGetTasksList,
  handlePostTask,
  handleDeleteTask
  //  handleGetSpecificTask, handleGetUserTask, handlePostTask, handleDeleteTask, handleUpdateTask
} = require("./handlers");

tasksRouter.post("/", handlePostTask);

tasksRouter.get("/", handleGetTasksList);
tasksRouter.delete("/:id", handleDeleteTask);
// .get('/:id', handleGetSpecificTask)
// .get('/team/:id',handleGetUserTask)
// .post('/', handlePostTask)
// .delete('/:id', handleDeleteTask)
// .put('/:id', handleUpdateTask)

module.exports = tasksRouter;

//to do:
