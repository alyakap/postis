const campaignsRouter = require("express").Router();
const {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById
} = require("./handlers");

const {
  validateCampaignById,
  validatePostCampaign,
  validateDeleteCampaign,
  validateUpdateCampaign
} = require("./validations");

campaignsRouter.get("/", handleGetCampaignsList);
campaignsRouter.get("/:id", validateCampaignById(), handleGetCampaignById);
campaignsRouter.post("/", validatePostCampaign(), handlePostCampaign);
campaignsRouter.delete("/:id", validateDeleteCampaign(), handleDeleteCampaign);
campaignsRouter.put("/:id", validateUpdateCampaign(), handleUpdateCampaign);

module.exports = campaignsRouter;
