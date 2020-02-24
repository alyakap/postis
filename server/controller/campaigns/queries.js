const knex = require("../../db");

const getCampaigns = async () => await knex.select("*").from("campaigns");
const postCampaign = async data => await knex("campaigns").insert(data);
const deleteCampaign = async id =>
  await knex("campaigns")
    .where({ id })
    .delete();
const updateCampaign = async data =>
  await knex("campaigns")
    .where({ id })
    .update(data);
module.exports = {
  getCampaigns,
  postCampaign,
  deleteCampaign,
  updateCampaign
};
