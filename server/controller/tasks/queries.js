const knex = require("../../db");

const getTasks = async () =>
  await knex("tasks")
    .leftJoin("users", "users.id", "tasks.assigned_user")
    .leftJoin("campaigns", "campaigns.id", "tasks.campaigns_id")
    .select("tasks.*", "users.firstname", "campaigns.title as campaigntitle")
    .orderBy("created", "desc");
const getTasksByCampaignId = async campaigns_id =>
  await knex
    .select("*")
    .from("tasks")
    .where({ campaigns_id });
const getTaskById = async id =>
  await knex("tasks")
    .leftJoin("users as AU", "AU.id", "tasks.assigned_user")
    .leftJoin("users as CU", "CU.id", "tasks.created_user")
    .leftJoin("users as UU", "UU.id", "tasks.updated_user")
    .leftJoin("campaigns", "campaigns.id", "tasks.campaigns_id")
    .select(
      "tasks.*",
      "AU.firstname as assigned_firstname",
      "CU.firstname as created_firstname",
      "UU.firstname as updated_firstname",
      "campaigns.title as campaigntitle"
    )
    .where({ "tasks.id": id });

const postTask = async data =>
  await knex("tasks")
    .insert(data)
    .returning("*");
const deleteTask = async id =>
  await knex("tasks")
    .where({ id })
    .delete();
const editTask = async (id, data) =>
  await knex("tasks")
    .where({ id })
    .update(data)
    .returning("*");
const assignTask = async (id, data) =>
  await knex("tasks")
    .where({ id })
    .update({ assigned_user: data })
    .returning("*");

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
  deleteTask,
  getTaskById,
  editTask,
  assignTask,
  getTasksByCampaignId
};
