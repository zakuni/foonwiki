module.exports = function(app) {
  var Page, PageApp, Promise, React, ReactDOMServer, router;
  router = require('express').Router();
  Promise = require('bluebird');
  Page = require('../models/page')(app);
  React = require('react');
  ReactDOMServer = require('react-dom/server');
  PageApp = require('../components/pageapp.jsx');
  
  router.get('/', function(req, res) {
    var id, newPages, updatedPages;
    id = req.query.id;
    if (id != null) {
      new Page({'id': id})
        .fetch()
        .then((page) => {
          if (page != null) {
            res.render('page', {
              page: page,
              pageapp: ReactDOMServer.renderToString(React.createElement(PageApp, {
                title: page.get("name"),
                content: page.get("content"),
                pageId: page.id
              }))
            });
          } else {
            res.redirect('/page/new');
          }
        });
    } else {
      updatedPages = [];
      newPages = [];
      Promise.all([
        Page.query((qb) => { qb.orderBy('updated_at', 'desc').limit(5); })
            .fetchAll()
            .then((pages) => {
              updatedPages = pages;
            }),
        Page.query((qb) => { qb.orderBy('created_at', 'desc').limit(5); })
            .fetchAll()
            .then((pages) => {
                newPages = pages;
            })
      ]).then(() => {
        res.render('index', {
          updatedPages: updatedPages.models,
          newPages: newPages.models
        });
      });
    }
  });

  return router;
};
