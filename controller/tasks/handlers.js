const { getTasks, getTask, getUserTask, postTask, deleteTask} = require('./queries');

const handleGetTasksList= function (req,res){
    res.send(getTasks());
}

const handleGetSpecificTask= function (req, res){
    res.send(getTask(req.params.id));
}



const handleGetUserTask= function (req, res){
    console.log(req.params)
    res.send(getUserTask(req.params.id))
} 

const handlePostTask = function (req, res) {
    console.log(req.body);
    const tasks=postTask(req.body)
    console.log(tasks);
    res.json(tasks)
}

const handleDeleteTask= function (req, res){
    const tasks=deleteTask(req.params.id)
    res.json(tasks);
}

module.exports={
    handleGetTasksList,
    handleGetSpecificTask,
    handleGetUserTask,
    handlePostTask,
    handleDeleteTask
}