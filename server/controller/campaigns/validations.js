const { check, checkSchema, body } = require("express-validator");
const knex = require("../../db");
const validateCampaignById = () => [check("id").isInt()];

const validatePostCampaign = () =>
  checkSchema({
    title: {
      isLength: {
        options: { min: 3, max: undefined },
        errorMessage: "Title should be at least 3 characters"
      },
      custom: {
        options: value => {
          return knex("campaigns")
            .where({ title: value })
            .then(arr => {
              if (arr.length === 1) {
                return Promise.reject("campaign is already in use");
              }
            });
        }
      }
    },
    color: {
      isHexColor: true,
      errorMessage: "Color should be selected",
      custom: {
        options: value => {
          return value.indexOf("#") === 0;
        },
        errorMessage: "Color should be selected"
      }
    },
    icon: {
      isLength: {
        options: { min: 1, max: undefined },
        errorMessage: "Icons should be selected"
      }
    }
  });
const validateDeleteCampaign = () =>
  checkSchema({
    id: {
      custom: {
        options: value => {
          return knex("campaigns")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("campaign is not existing");
              }
            });
        }
      }
    }
  });
const validateUpdateCampaign = () =>
  checkSchema({
    title: {
      isLength: {
        options: { min: 3, max: undefined },
        errorMessage: "Title should be at least 3 characters"
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
    }
  });

module.exports = {
  validateCampaignById,
  validatePostCampaign,
  validateDeleteCampaign,
  validateUpdateCampaign
};
