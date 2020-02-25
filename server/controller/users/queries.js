const knex = require("../../db");
const getUsers = async () =>
  await knex
    .select("*")
    .from("users")
    .orderBy("created", "desc");

module.exports = {
  getUsers
};
