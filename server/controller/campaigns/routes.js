const campaignsRouter = require("express").Router();

const {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById
} = require("./handlers");

campaignsRouter.get("/", handleGetCampaignsList);
campaignsRouter.get("/:id", handleGetCampaignById);
campaignsRouter.post("/", handlePostCampaign);
campaignsRouter.delete("/:id", handleDeleteCampaign);
campaignsRouter.put("/:id", handleUpdateCampaign);

module.exports = campaignsRouter;

//to do:
