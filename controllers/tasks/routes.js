const tasksRouter= require('express').Router;

const {handleGetTasksList, handleGetFilteredTasks,handleGetSpecificTask}=require('./handlers');

tasksRouter
    .get('/tasks',handleGetTasksList)
    .get('/tasks/:id', handleGetSpecificTask)
    .get('/tasks/ids', handleGetFilteredTasks)

module.exports=tasksRouter;
