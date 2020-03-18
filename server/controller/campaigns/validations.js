const { check, checkSchema } = require("express-validator");

const validateCampaignById = () => [check("id").isInt()];

const validatePostCampaign = () =>
  checkSchema({
    title: {
      isLength: {
        options: { min: 10, max: undefined },
        errorMessage: "Title should be at least 10 characters"
      }
    },
    color: {
      isHexColor: true,
      errorMessage: "Invalid hexcolor",
      custom: {
        options: value => {
          return value.indexOf("#") === 0;
        },
        errorMessage: "# not included"
      }
    },
    icon: {
      isAlphanumeric: true
    }
  });

module.exports = {
  validateCampaignById,
  validatePostCampaign
};
