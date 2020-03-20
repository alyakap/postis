const { checkSchema } = require("express-validator");
const knex = require("../../db");
const validatePostTask = () =>
  checkSchema({
    title: {
      isLength: {
        options: { min: 10, max: undefined },
        errorMessage: "Title should be at least 10 characters"
      }
    },
    campaigns_id: {
      custom: {
        options: value => {
          return knex("campaigns")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("campaigns_id not existing");
              }
            });
        }
      }
    }
  });

module.exports = {
  validatePostTask
};
