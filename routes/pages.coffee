module.exports = (app) ->
  express = require('express')
  router = express.Router()
  Page = require('../models/page')(app)

  # GET pages listing.
  router.get('/', (req, res) ->
    sortedby = req.query.sortedby

    if sortedby is "created"
      Page.query('orderBy', 'created_at', 'desc')
        .fetchAll()
          .then (pages) ->
            res.render('pages', {pages: pages.models})
    else if sortedby is "updated"
      Page.query('orderBy', 'updated_at', 'desc')
        .fetchAll()
          .then (pages) ->
            res.render('pages', {pages: pages.models})
  )

  router.get('/new', (req, res) ->
    page = new Page()
    res.render('page', {page: page})
  )
