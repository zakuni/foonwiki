import assert from 'power-assert';
import express from 'express'

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var bookshelf = require('bookshelf')(knex);

var app = express();
app.set('bookshelf', bookshelf);

var Page = require('../../models/page')(app);

describe('Page', () => {
  describe('#hasTimestamps()', () => {
    it('return true', () => {
      var page = new Page();
      var hasTimestamps = page.hasTimestamps;
      assert.equal(hasTimestamps, true);
    });
  });
});
