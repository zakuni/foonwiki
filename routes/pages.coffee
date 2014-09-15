module.exports = (app) ->
  express = require('express')
  router = express.Router()
  Page = require('../models/page')(app)

  # GET pages listing.
  router.get('/', (req, res) ->
    pages = [{}]
    res.render('pages', {pages: pages})
  )

  router.get('/new', (req, res) ->
    page = new Page()
    res.render('page', {page: page})
  )
