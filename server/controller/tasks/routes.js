const tasksRouter = require("express").Router();

const {
  handleGetTasksList,
  handlePostTask,
  handleDeleteTask,
  //handleGetTaskById,
  handleEditTask,
  handleAssignTask,
  handleGetTasksByCampaignId,
  handleGetTaskByIdExtraFields
  //  handleGetSpecificTask, handleGetUserTask, handlePostTask, handleDeleteTask, handleUpdateTask
} = require("./handlers");

tasksRouter.get("/", handleGetTasksList);
tasksRouter.get("/fromcampaign/:id", handleGetTasksByCampaignId);
//tasksRouter.get("/:id", handleGetTaskById);
tasksRouter.get("/:id", handleGetTaskByIdExtraFields);
tasksRouter.post("/", handlePostTask);
tasksRouter.delete("/:id", handleDeleteTask);
tasksRouter.put("/:id", handleEditTask);
tasksRouter.put("/:id/assign", handleAssignTask);

module.exports = tasksRouter;

//to do:
