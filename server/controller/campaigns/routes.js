const campaignsRouter = require("express").Router();

const {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign
} = require("./handlers");

campaignsRouter.get("/", handleGetCampaignsList);
campaignsRouter.post("/", handlePostCampaign);
campaignsRouter.delete("/:id", handleDeleteCampaign);

module.exports = campaignsRouter;

//to do:
