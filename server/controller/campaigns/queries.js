const knex = require("../../db");
//const team = require("../../models/team");

const getCampaigns = async () => await knex.select("*").from("campaigns");

module.exports = {
  getCampaigns
};
