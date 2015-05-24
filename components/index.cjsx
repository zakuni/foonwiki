React = require 'react'
PageApp = require './page'

React.render(
  <PageApp />,
  document.getElementById('pageapp')
)

$ ->
  recentPage = localStorage.getItem("recentPages")
  if recentPage?
    $("#seen ul")
      .append $("<li></li>")
      .append $("<a></a>")
      .text(JSON.parse(recentPage).name)
