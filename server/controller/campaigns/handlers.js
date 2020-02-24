const {
  getCampaigns,
  postCampaign,
  deleteCampaign,
  updateCampaign
} = require("./queries");

const handleGetCampaignsList = async (req, res) => {
  res.send(await getCampaigns());
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
  handleUpdateCampaign
};
