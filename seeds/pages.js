
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('pages').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('pages').insert({id: 1, name: 'name', content: 'content'}),
        knex('pages').insert({id: 2, name: 'name2', content: 'content2'})
      ]);
    })
  );
};
