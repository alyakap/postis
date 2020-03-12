const { validationResult } = require('express-validator');

const {
  getCampaigns,
  postCampaign,
  deleteCampaign,
  updateCampaign,
  getCampaignById
} = require("./queries");

const errorCheck = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
}

const handleGetCampaignsList = async (req, res) => {
  res.send(await getCampaigns());
};
const handleGetCampaignById = async (req, res) => {
  //check if id was send
  //check if campaignid is an existing one
  errorCheck(req, res)
  return res.send(await getCampaignById(parseInt(req.params.id)));
};
const handlePostCampaign = async (req, res) => {
  //req.body has all the mandatory fields
  errorCheck(req, res)
  return res.send(await postCampaign(req.body));
};
const handleDeleteCampaign = async (req, res) => {
  const campaigns = await deleteCampaign(parseInt(req.params.id));
  res.json(campaigns);
};
const handleUpdateCampaign = async (req, res) => {
  const campaigns = await updateCampaign(parseInt(req.params.id), req.body);
  res.json(campaigns);
};

module.exports = {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById
};
