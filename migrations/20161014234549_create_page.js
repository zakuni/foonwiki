
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('pages', function () {});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pages');
};
