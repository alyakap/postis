const usersRouter = require("express").Router();
const { handleGetUserList } = require("./handlers");
usersRouter.get("/", handleGetUserList);
module.exports = usersRouter;
