const {
  getTasks,
  postTask,
  deleteTask,
  getTaskById,
  editTask,
  assignTask
} = require("./queries");

const handleGetTasksList = async (req, res) => {
  res.send(await getTasks());
};
const handlePostTask = async (req, res) => {
  res.send(await postTask(req.body));
};
const handleDeleteTask = async (req, res) => {
  const tasks = await deleteTask(parseInt(req.params.id));
  res.json(tasks);
};
const handleGetTaskById = async (req, res) => {
  res.send(await getTaskById(parseInt(req.params.id)));
};
const handleEditTask = async (req, res) => {
  const tasks = await editTask(parseInt(req.params.id), req.body);
  res.json(tasks);
};

const handleAssignTask = async (req, res) => {
  const tasks = await assignTask(parseInt(req.params.id), req.body.id);
  res.json(tasks);
};

// const handleGetSpecificTask= function (req, res){
//     res.send(getTask(req.params.id));
// }

// const handleGetUserTask= function (req, res){
//     console.log(req.params)
//     res.send(getUserTask(req.params.id))
// }

// const handlePostTask = function (req, res) {
//     console.log(req.body);
//     const tasks=postTask(req.body)
//     console.log(tasks);
//     res.json(tasks)
// }

// const handleDeleteTask= function (req, res){
//     const tasks=deleteTask(req.params.id)
//     res.json(tasks);
// }

// const handleUpdateTask=function(req, res){
//     const tasks=updateTask(req.params.id, req.body);
//     res.json(tasks);
// }

module.exports = {
  handleGetTasksList,
  handlePostTask,
  handleDeleteTask,
  handleGetTaskById,
  handleEditTask,
  handleAssignTask
  // handleGetSpecificTask,
  // handleGetUserTask,
  // handleUpdateTask
};
