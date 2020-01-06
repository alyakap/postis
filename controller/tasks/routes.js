const tasksRouter= require('express').Router();

const {handleGetTasksList, handleGetSpecificTask, handleGetUserTask}=require('./handlers');

tasksRouter
    .get('/',handleGetTasksList)
    .get('/:id', handleGetSpecificTask)
    .get('/team/:id',handleGetUserTask)

module.exports=tasksRouter;
