exports.up = function(knex) {
  return knex.schema.createTable("campaigns", tbl => {
    tbl.increments("id").primary();
    tbl.string("title", 200);
    tbl.string("color", 8);
    tbl.string("icon", 30);
    tbl.timestamp("created").defaultTo(knex.fn.now());
    tbl.timestamp("updated").nullable();
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("campaigns");
};
