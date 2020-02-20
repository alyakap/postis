const knex = require("../../db");

const getCampaigns = async () => await knex.select("*").from("campaigns");
const postCampaign = async data => await knex("campaigns").insert(data);

module.exports = {
  getCampaigns,
  postCampaign
};
