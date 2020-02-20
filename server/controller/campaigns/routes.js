const campaignsRouter = require("express").Router();

const { handleGetCampaignsList, handlePostCampaign } = require("./handlers");

campaignsRouter.get("/", handleGetCampaignsList);
campaignsRouter.post("/", handlePostCampaign);

module.exports = campaignsRouter;

//to do:
