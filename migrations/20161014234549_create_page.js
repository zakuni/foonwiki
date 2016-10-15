
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('pages', function (table) {
    table.increments('id').primary();
    table.timestamps();
    table.text('name');
    table.text('content');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pages');
};
