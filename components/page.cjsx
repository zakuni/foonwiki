debug = require('debug')('page')
inspect = require('object-inspect')
request = require('superagent')
React = require 'react'
ReactDOM = require 'react-dom'
PageTitle = require './pagetitle'
PageContent = require './pagecontent'
PageForm = require './pageform.jsx'

App = React.createClass
  getInitialState: ->
    title = @props.title or page.name
    content = @props.content or page.content
    {
      title: title
      content: content
    }
  submitPage: ->
    path = $("#contents").attr("action")
    debug('submit to %s %s', path, inspect(@state, {colors: true}))
    request
      .put(path)
      .send({name: @state.title, content: @state.content})
      .end((err, res) -> debug('%s %s', err, res))
  handlePageSubmit: ->
    ce = $("<pre />").html(ReactDOM.findDOMNode(@refs.content).innerHTML)
    if($.browser.webkit)
      ce.find("div").replaceWith(()-> return "\n" + this.innerHTML)
    if($.browser.msie)
      ce.find("p").replaceWith(()-> return this.innerHTML + "<br>")
    if($.browser.mozilla || $.browser.opera ||$.browser.msie )
      ce.find("br").replaceWith("\n")

    @setState({content: ce.text()}, ->
      clearTimeout(@timeout)
      @timeout = setTimeout(@submitPage, 500)
    )
  handleTitleChange: (title) ->
    localStorage.setItem "recentPages", JSON.stringify(this)
    @setState({title: title})
  handleTitleSubmit: (title) ->
    @setState({content: ce.text()}, ->
      clearTimeout(@timeout)
      @timeout = setTimeout(@submitPage, 500)
    )
  render: ->
    <div>
      <div className="row">
        <div className="small-12 column">
          <PageTitle onTitleChange={@handleTitleChange} onTitleSubmit={@handleTitleSubmit} title=@state.title />
        </div>
      </div>
      <div className="row">
        <div className="small-12 column">
          <PageContent ref="content" onContentChange={@handlePageSubmit} content=@state.content />
          <PageForm onPageSubmit={@handlePageSubmit} pageId={@props.pageId} />
        </div>
      </div>
    </div>

module.exports = App
