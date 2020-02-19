const knex = require("../../db");

const getCampaigns = async () => await knex.select("*").from("campaigns");

module.exports = {
  getCampaigns
};
