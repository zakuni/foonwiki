module.exports = (app) ->
  bookshelf = app.get('bookshelf')

  Page = bookshelf.Model.extend({
    tableName: 'pages'
    hasTimestamps: true
  })
