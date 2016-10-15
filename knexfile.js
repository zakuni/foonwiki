// Update with your config settings.

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/foonwiki?sslmode=disable',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
