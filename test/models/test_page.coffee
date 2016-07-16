assert  = require 'power-assert'
express = require 'express'

knex = require('knex')(
  client: 'pg'
  connection: process.env.DATABASE_URL
)
bookshelf = require('bookshelf')(knex)

app = express()
app.set('bookshelf', bookshelf)

Page = require('../../models/page')(app)

module.exports =
  'Page':
    '#hasTimestamps()':
      'return true': ->
        page = new Page()
        hasTimestamps = page.hasTimestamps
        assert hasTimestamps
