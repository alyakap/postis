const { getTasks, getTask, getUserTask, postTask} = require('./queries');

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
    console.log(req.body.json());
    const tasks=postTask(req.body)
    console.log(tasks);
    res.json({
        data:tasks
    })
}

module.exports={
    handleGetTasksList,
    handleGetSpecificTask,
    handleGetUserTask,
    handlePostTask
}