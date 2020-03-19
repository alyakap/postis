const knex = require("./db");
const exec = async () => {
  const check = await knex("campaigns").where({ id: 33 });
  return check.length === 1;
};
exec();
