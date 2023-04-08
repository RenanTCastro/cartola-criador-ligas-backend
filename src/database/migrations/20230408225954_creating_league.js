exports.up = function (knex) {
  return knex.schema.createTable("league", (table) => {
    table.increments("league_id").primary();
    table.integer("user_id");
    table.foreign("user_id").references("user.user_id").onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("description", 1000);
    table.string("teams", 4000);
    table.integer("start_round").notNullable();
    table.integer("end_round").notNullable();
  });
};

exports.down = (knex) => knex.schema.dropTable("league");
