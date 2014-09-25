module.exports = (app) ->
  router = require('express').Router()
  Promise  = require('bluebird')
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
      Promise.all([
        Page.query (qb) =>
          qb.orderBy('updated_at', 'desc').limit(5)
        .fetchAll()
        .then (updatedPages) =>
          @updatedPages = updatedPages
        Page.query (qb) =>
          qb.orderBy('created_at', 'desc').limit(5)
        .fetchAll()
        .then (newPages) =>
          @newPages = newPages
      ])
      .then =>
        res.render('index', { updatedPages: @updatedPages.models, newPages: @newPages.models })
  )
