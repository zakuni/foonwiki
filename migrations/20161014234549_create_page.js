
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('pages', function (table) {
    table.increments('id').primary();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pages');
};
