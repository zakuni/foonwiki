React = require 'react'
ReactDOM = require 'react-dom'
PageApp = require './page'

ReactDOM.render(
  <PageApp title={page.name}, content={page.content}, pageId={page.id} />,
  document.getElementById('pageapp')
)

$ ->
  recentPage = localStorage.getItem("recentPages")
  if recentPage?
    $("#seen ul")
      .append $("<li></li>")
      .append $("<a></a>")
      .text(JSON.parse(recentPage).name)
