const tasksRouter= require('express').Router();

const {handleGetTasksList, handleGetSpecificTask, handleGetUserTask, handlePostTask}=require('./handlers');

tasksRouter
    .get('/',handleGetTasksList)
    .get('/:id', handleGetSpecificTask)
    .get('/team/:id',handleGetUserTask)
    .post('/tasks', handlePostTask)

module.exports=tasksRouter;
