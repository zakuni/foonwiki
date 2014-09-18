var assert = require('assert');
var express = require('express');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var bookshelf = require('bookshelf')(knex);

app = express();
app.set('bookshelf', bookshelf);

var Page = require('../models/page')(app);
describe('Page', function(){
  it('should have timestamps', function(){
    page = new Page();
    assert.equal(true, page.hasTimestamps);
  });
})
