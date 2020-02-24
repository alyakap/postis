const {
  getCampaigns,
  postCampaign,
  deleteCampaign,
  updateCampaign,
  getCampaignById
} = require("./queries");

const handleGetCampaignsList = async (req, res) => {
  res.send(await getCampaigns());
};
const handleGetCampaignById = async (req, res) => {
  res.send(await getCampaignById(parseInt(req.params.id)));
};
const handlePostCampaign = async (req, res) => {
  res.send(await postCampaign(req.body));
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
