exports.up = function(knex) {
  // this is the function that creates the table
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id").primary();
    tbl.string("firstname", 100);
    tbl.string("lastname", 100);
    tbl.string("email", 100);
    tbl.timestamp("created").defaultTo(knex.fn.now());
    tbl.timestamp("updated").nullable();
  });
};
exports.down = function(knex) {
  // this is the function to rollback
  return knex.schema.dropTableIfExists("users");
};
