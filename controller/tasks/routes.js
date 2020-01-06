const tasksRouter= require('express').Router();

const {handleGetTasksList, handleGetSpecificTask, handleGetUserTask, handlePostTask, handleDeleteTask}=require('./handlers');

tasksRouter
    .get('/',handleGetTasksList)
    .get('/:id', handleGetSpecificTask)
    .get('/team/:id',handleGetUserTask)
    .post('/', handlePostTask)
    .delete('/:id', handleDeleteTask)

module.exports=tasksRouter;
