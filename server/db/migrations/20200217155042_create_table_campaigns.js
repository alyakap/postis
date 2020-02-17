exports.up = function(knex) {
  return knex.schema.createTable("campaigns", tbl => {
    tbl.increments("id").primary();
    tbl.string("color", 6);
    tbl.string("icon", 20);
    tbl.timestamp("created").defaultTo(knex.fn.now());
    tbl.timestamp("updated").nullable();
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("campaigns");
};
