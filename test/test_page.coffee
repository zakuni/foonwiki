assert  = require 'assert'
express = require 'express'

knex = require('knex')(
  client: 'pg'
  connection: process.env.DATABASE_URL
)
bookshelf = require('bookshelf')(knex)

app = express()
app.set('bookshelf', bookshelf)

Page = require('../models/page')(app)
describe 'Page', ()->
  it 'should have timestamps', ()->
    page = new Page()
    assert.equal(true, page.hasTimestamps)
