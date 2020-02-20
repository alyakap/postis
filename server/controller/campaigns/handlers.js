const { getCampaigns, postCampaign } = require("./queries");

const handleGetCampaignsList = async (req, res) => {
  res.send(await getCampaigns());
};
const handlePostCampaign = async (req, res) => {
  res.send(await postCampaign(req.body));
};

module.exports = {
  handleGetCampaignsList,
  handlePostCampaign
};
