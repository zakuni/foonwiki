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

  router.post('/', (req, res) ->
    page = new Page(req.body)
    page.save()
  )

  router.get('/new', (req, res) ->
    page = new Page()
    res.render('page', {page: page})
  )

  router.post('/:id', (req, res) ->
    page = new Page(req.body)
    page.id = req.params.id
    page.save()
  )

  router.put('/:id', (req, res) ->
    page = new Page(req.body)
    page.id = req.params.id
    page.save()
  )
