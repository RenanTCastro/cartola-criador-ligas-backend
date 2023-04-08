exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("user_code").notNullable();
    table.integer("credits");
  });
};

exports.down = (knex) => knex.schema.dropTable("user");
