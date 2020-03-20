const { checkSchema } = require("express-validator");
const knex = require("../../db");
const validateTaskByCampaignId = () =>
  checkSchema({
    id: {
      in: ["params", "query"],
      errorMessage: "ID is wrong",
      isInt: true,
      custom: {
        options: value => {
          return knex("campaigns")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("campaigns is not existing");
              }
            });
        }
      }
    }
  });
const validateTaskById = () =>
  checkSchema({
    id: {
      in: ["params", "query"],
      errorMessage: "ID is wrong",
      isInt: true,
      custom: {
        options: value => {
          return knex("tasks")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("task is not existing");
              }
            });
        }
      }
    }
  });

const validatePostTask = () =>
  checkSchema({
    title: {
      isLength: {
        options: { min: 3, max: undefined },
        errorMessage: "Title should be at least 3 characters"
      }
    },
    description: {
      isLength: {
        options: { min: 10, max: undefined },
        errorMessage: "Description should be at least 10 characters"
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
const validateDeleteTask = () =>
  checkSchema({
    id: {
      custom: {
        options: value => {
          return knex("tasks")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("task is not existing");
              }
            });
        }
      }
    }
  });
const validateEditTask = () =>
  checkSchema({
    title: {
      isLength: {
        options: { min: 3, max: undefined },
        errorMessage: "Title should be at least 3 characters"
      }
    },
    description: {
      isLength: {
        options: { min: 10, max: undefined },
        errorMessage: "Description should be at least 10 characters"
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
const validateAssignTask = () =>
  checkSchema({
    id: {
      in: ["body"],
      isInt: true,
      custom: {
        options: value => {
          return knex("users")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("user is not existing");
              }
            });
        }
      }
    },
    id: {
      in: ["params"],
      isInt: true,
      custom: {
        options: value => {
          return knex("tasks")
            .where({ id: value })
            .then(arr => {
              if (arr.length !== 1) {
                return Promise.reject("tasks is not existing");
              }
            });
        }
      }
    }
  });

module.exports = {
  validateTaskByCampaignId,
  validatePostTask,
  validateTaskById,
  validateDeleteTask,
  validateEditTask,
  validateAssignTask
};
