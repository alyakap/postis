const tasks = require('../../models/tasks');
const team = require('../../models/team');

const getTasks=()=>{
    return tasks;
}

const getTask=id=>{
    const findTask=tasks.find(task =>{
        return task.id==id
    });
    return findTask;
}


const getUserTask = id => {
    
    const findMember=team.find(x=>{
        return x.id===id
    });
    return findMember;
}
 const postTask= (data) => {
    
    const task={
        id: data.id,
        task: data.task,
        by: data.by,
        done: false
    }
    tasks.push(task)
    return tasks
    
 }
 const deleteTask= (id) => {
    
    const index = tasks.findIndex(n => n.id === id)
    tasks.splice(index)
    return users
    
 }

module.exports={
    getTasks,
    getTask,
    getUserTask,
    postTask,
    deleteTask
}