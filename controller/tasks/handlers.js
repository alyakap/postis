const { getTasks, getTask, getUserTask} = require('./queries');

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

module.exports={
    handleGetTasksList,
    handleGetSpecificTask,
    handleGetUserTask
}