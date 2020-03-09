// Update with your config settings.
//require("dotenv").config();
require("dotenv").config({
  path: ".env." + (process.env.NODE_ENV || "development")
});
module.exports = {
  test: {
    client: "pg",
    connection: {
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/test/seeds"
    },
    port: {}
  },
  development: {
    client: "pg",
    connection: {
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    },
    port: {}
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
