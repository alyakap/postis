const tasks = require('../../modals/tasks');

const getTasks=()=>{
    return tasks;
}

const getTask=id=>{
    const findTask=tasks.find(task =>{
        return task.id=id
    });
    return findTask;
}

const getFilteredTasks = ids => {
    // !!! DO NOT MUTATE THE ORIGINAL ARRAY
    const filteredTasks = [...tasks];
    const idsArr = ids.split(',');
    Array.from(Array(filteredTasks.length).keys()).reverse().forEach(index =>
        !idsArr.some(id => id === filteredTasks[index].id) && filteredTasks.splice(index, 1)
    );
    return filteredTasks;
}

module.exports={
    getTasks,
    getTask,
    getFilteredTasks
}