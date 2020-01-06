const { getTask, getTasks, getFilteredTasks } = require('./queries');

const handleGetTasksList= function (req,res){
    res.send(getTasks());
}

const handleGetSpecificTask= function (req, res){
    res.send(getTask(req.params.id));
}

const handleGetFilteredTasks= function (req, res){
    console.log(req.params)
    res.send(getFilteredMovies(req.params.ids))
}

module.exports={
    handleGetTasksList,
    handleGetSpecificTask,
    handleGetFilteredTasks
}