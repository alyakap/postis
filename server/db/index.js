// var knex = require("knex")(
//   require("../knexfile")[process.env.NODE_ENV || "development"]
// );
// module.exports = knex;
const config = require("../knexfile.js");
const env = process.env.NODE_ENV || "development";
const knex = require("knex")(config[env]);

module.exports = knex;

if (process.env.NODE_ENV != "test") {
  knex.migrate.latest([config]);
}
