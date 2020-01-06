const tasksRouter= require('express').Router();

const {handleGetTasksList, handleGetSpecificTask, handleGetUserTask, handlePostTask, handleDeleteTask, handleUpdateTask}=require('./handlers');

tasksRouter
    .get('/',handleGetTasksList)
    .get('/:id', handleGetSpecificTask)
    .get('/team/:id',handleGetUserTask)
    .post('/', handlePostTask)
    .delete('/:id', handleDeleteTask)
    .put('/:id', handleUpdateTask)

module.exports=tasksRouter;

//to do:
