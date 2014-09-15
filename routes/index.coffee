module.exports = (app) ->
  express = require('express')
  router = express.Router()
  Page = require('../models/page')(app)

  router.get('/', (req, res) ->
    id = req.query.id
    if id?
      new Page({'id': id})
        .fetch()
        .then (page) ->
          res.render('page', {page: page})
    else
      updatedPages = []
      newPages = []
      res.render('index', { updatedPages: updatedPages, newPages: newPages })
  )
