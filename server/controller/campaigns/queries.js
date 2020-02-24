const knex = require("../../db");

const getCampaigns = async () =>
  await knex
    .select("*")
    .from("campaigns")
    .orderBy("created", "desc");
const getCampaignById = async id =>
  await knex
    .select("*")
    .from("campaigns")
    .where({ id });

const postCampaign = async data => await knex("campaigns").insert(data);
const deleteCampaign = async id =>
  await knex("campaigns")
    .where({ id })
    .delete();
const updateCampaign = async (id, data) =>
  await knex("campaigns")
    .where({ id })
    .update(data);
module.exports = {
  getCampaignById,
  getCampaigns,
  postCampaign,
  deleteCampaign,
  updateCampaign
};
