module.exports = (app) ->
  router = require('express').Router()
  Promise  = require('bluebird')
  Page = require('../models/page')(app)

  React = require 'react'
  ReactDOMServer = require 'react-dom/server'
  require('coffee-react/register')
  PageApp = require('../components/page.cjsx')

  router.get('/', (req, res) ->
    id = req.query.id
    if id?
      new Page({'id': id})
        .fetch()
        .then (page) ->
          res.render('page', {
            page: page,
            pageapp: ReactDOMServer.renderToString(
              React.createElement(PageApp, {
                title: page.get("name"), content: page.get("content"), pageId: page.id
              })
            )
          })
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
