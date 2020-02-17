const campaignsRouter = require("express").Router();

const { handleGetCampaignsList } = require("./handlers");

campaignsRouter.get("/", handleGetCampaignsList);

module.exports = campaignsRouter;

//to do:
