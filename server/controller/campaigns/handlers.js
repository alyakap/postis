const { validationResult } = require("express-validator");

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
    res.send({ errors: errors.array() });
    return true;
  } else {
    return false;
  }
};

const handleGetCampaignsList = async (req, res) => {
  res.send(await getCampaigns());
};
const handleGetCampaignById = async (req, res) => {
  //check if id was send
  //check if campaignid is an existing one
  if (!errorCheck(req, res)) {
    res.send(await getCampaignById(parseInt(req.params.id)));
  }
};
const handlePostCampaign = async (req, res) => {
  //req.body has all the mandatory fields
  if (!errorCheck(req, res)) {
    res.send(await postCampaign(req.body));
  }
};
const handleDeleteCampaign = async (req, res) => {
  if (!errorCheck(req, res)) {
    const campaigns = await deleteCampaign(parseInt(req.params.id));
    res.json(campaigns);
  }
};
const handleUpdateCampaign = async (req, res) => {
  if (!errorCheck(req, res)) {
    const campaigns = await updateCampaign(parseInt(req.params.id), req.body);
    res.json(campaigns);
  }
};

module.exports = {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById
};
