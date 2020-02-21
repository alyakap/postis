const knex = require("../../db");

const getTasks = async () => await knex.select("*").from("tasks");
const postTask = async data => await knex("tasks").insert(data);
const deleteTask = async id =>
  await knex("tasks")
    .where({ id })
    .delete();

// const deleteTask = async id => await knex("tasks").where(222).delete();
// is not the same as

// const deleteTask = async id => await knex("tasks").where({id: 222}).delete();

// const getTask=id=>{
//     const findTask=tasks.find(task =>{
//         return task.id==id
//     });
//     return findTask;
// }

// const getUserTask = id => {

//     const findMember=team.find(x=>{
//         return x.id===id
//     });
//     return findMember;
// }
//  const postTask= (data) => {

//     const task={
//         id: data.id,
//         task: data.task,
//         by: data.by,
//         done: false
//     }
//     tasks.push(task)
//     return tasks

//  }
//  const deleteTask= (id) => {
//     const index = tasks.findIndex(n => n.id === id)
//     tasks.splice(index)
//     return users
//  }
//  const updateTask=(id, data)=>{

//     const index = tasks.findIndex(x => x.id === id)

//     tasks[index].task = data.task;
//     tasks[index].by = data.by;
//     return tasks;

//  }

module.exports = {
  getTasks,
  postTask,
  deleteTask
  // getTask,
  // getUserTask,
  // updateTask
};
