const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile.development); // (knexfile["development"])

module.exports = knex;
