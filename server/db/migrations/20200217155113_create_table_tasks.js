exports.up = function(knex) {
  return knex.schema.createTable("tasks", tbl => {
    tbl.increments("id").primary();
    tbl.integer("campaigns_id");
    tbl
      .foreign("campaigns_id")
      .references("id")
      .inTable("campaigns");
    tbl.string("title", 200);
    tbl.text("description");
    tbl.timestamp("notification").nullable();
    tbl.boolean("complete").defaultTo(0);
    tbl.timestamp("created").defaultTo(knex.fn.now());
    tbl.integer("created_user");
    tbl
      .foreign("created_user")
      .references("id")
      .inTable("users");
    tbl.timestamp("assigned").nullable();
    tbl.integer("assigned_user").nullable();
    tbl
      .foreign("assigned_user")
      .references("id")
      .inTable("users");
    tbl.timestamp("updated").nullable();
    tbl.integer("updated_user").nullable();
    tbl
      .foreign("updated_user")
      .references("id")
      .inTable("users");
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks");
};
