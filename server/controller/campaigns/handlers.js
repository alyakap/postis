const { getCampaigns } = require("./queries");

const handleGetCampaignsList = async (req, res) => {
  res.send(await getCampaigns());
};

module.exports = {
  handleGetCampaignsList
};
