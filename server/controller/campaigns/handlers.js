const { getCampaigns, postCampaign, deleteCampaign } = require("./queries");

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

module.exports = {
  handleGetCampaignsList,
  handlePostCampaign,
  handleDeleteCampaign
};
