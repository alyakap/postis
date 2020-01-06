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
        task: data.name,
        by: data.email,
        done: false
    }
    tasks.push(task)
    return tasks
    
 }


module.exports={
    getTasks,
    getTask,
    getUserTask,
    postTask
}