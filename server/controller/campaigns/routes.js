const campaignsRouter = require("express").Router();
const {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById
} = require("./handlers");

const { validateCampaignById, validatePostCampaign } = require("./validations");

campaignsRouter.get("/", handleGetCampaignsList);
campaignsRouter.get("/:id", validateCampaignById(), handleGetCampaignById);
campaignsRouter.post("/", handlePostCampaign);
campaignsRouter.delete("/:id", handleDeleteCampaign);
campaignsRouter.put("/:id", handleUpdateCampaign);

module.exports = campaignsRouter;

//to do:
