const campaignsRouter = require("express").Router();

const {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign
} = require("./handlers");

campaignsRouter.get("/", handleGetCampaignsList);
campaignsRouter.post("/", handlePostCampaign);
campaignsRouter.delete("/:id", handleDeleteCampaign);
campaignsRouter.put("/:id", handleUpdateCampaign);

module.exports = campaignsRouter;

//to do:
