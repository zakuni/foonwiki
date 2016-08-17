var React = require('react');
var ReactDOM = require('react-dom');
var PageApp = require('./pageapp');

ReactDOM.render(
  <PageApp title={page.name} content={page.content} pageId={page.id} />,
  document.getElementById('pageapp')
);

$ => {
  var recentPage = localStorage.getItem("recentPages");
  if (recentPage !== undefined) {
    $("#seen ul")
      .append($("<li></li>"))
      .append($("<a></a>"))
      .text(JSON.parse(recentPage).name);
  }
};
