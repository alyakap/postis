const tasksRouter= require('express').Router();

const {handleGetTasksList, handleGetFilteredTasks,handleGetSpecificTask}=require('./handlers');

tasksRouter
    .get('/',handleGetTasksList)
    .get('/:id', handleGetSpecificTask)
    .get('/filtered/:ids', handleGetFilteredTasks)

module.exports=tasksRouter;
