const knex = require("../../db");
//const team = require("../../models/team");

const getCampaigns = async () => {
  await knex.select("*").from("tasks");
  return tasks;
};

module.exports = {
  getCampaigns
};
