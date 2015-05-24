debug = require('debug')('page')
inspect = require('object-inspect')
request = require('superagent')
React = require 'react'

App = React.createClass(
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
    ce = $("<pre />").html(React.findDOMNode(@refs.content).innerHTML)
    if($.browser.webkit)
      ce.find("div").replaceWith(()-> return "\n" + this.innerHTML)
    if($.browser.msie)
      ce.find("p").replaceWith(()-> return this.innerHTML + "<br>")
    if($.browser.mozilla || $.browser.opera ||$.browser.msie )
      ce.find("br").replaceWith("\n")

    @setState({content: ce.text()}, -> @submitPage())
  handleTitleChange: (title) ->
    localStorage.setItem "recentPages", JSON.stringify(this)
    @setState({title: title})
  handleTitleSubmit: (title) ->
    @setState({title: title}, -> @submitPage())
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
          <PageForm onPageSubmit={@handlePageSubmit} pageId=@props.pageId />
        </div>
      </div>
    </div>
)

PageTitle = React.createClass(
  propTypes:
    title: React.PropTypes.string
    onTitleChange: React.PropTypes.func.isRequired
    onTitleSubmit: React.PropTypes.func.isRequired
  getInitialState: ->
    {
      title: @props.title
      focus: false
    }
  toggleFocus: (e) ->
    @setState({focus: !@state.focus}, -> React.findDOMNode(@refs.input).focus())
  changeTitle: (e) ->
    @setState({title: event.target.value}, -> @props.onTitleSubmit(@state.title))
  handleSubmit: (e) ->
    e.preventDefault()
    @props.onTitleSubmit(@state.title)
  render: ->
    pageTitleElem =
      if @state.focus
        <form id="pagenameform" className="pagename" onSubmit={@handleSubmit}>
          <input id="pagenameinput" className="border-dotted" type="text" placeholder="no title" value={@state.title} onChange={@changeTitle} onBlur={@toggleFocus} ref="input" />
        </form>
      else
        <h3 id="pagename" className="pageTitle border-dotted cursor-text" placeholder="no title" onClick={@toggleFocus}>
          {@state.title}
        </h3>
    return (
      <section id="pagetitle" className="pagetitle">
        {pageTitleElem}
      </section>
    )
)

PageContent = React.createClass(
  propTypes:
    content: React.PropTypes.string.isRequired
    onContentChange: React.PropTypes.func.isRequired
  getInitialState: ->
    {content: @props.content}
  componentDidMount: ->
    @focus()
  focus: ->
    React.findDOMNode(@refs.editable).focus()
  changeContent: ->
    @props.onContentChange()
  render: ->
    style = {
      whiteSpace: 'pre'
      marginBottom: '20px'
    }
    return (
      <div className="editable cursor-text" contentEditable="true" style={style} ref="editable" onInput={@changeContent}>{this.state.content}</div>
    )
)

PageForm = React.createClass(
  propTypes:
    pageId: React.PropTypes.string
    onPageSubmit: React.PropTypes.func.isRequired
  handleSubmit: (e) ->
    e.preventDefault()
    @props.onPageSubmit()
  render: ->
    pageId = @props.pageId or page.id
    <form id="contents" action={if pageId then "/pages/#{pageId}" else "/pages/"} method="PUT" onSubmit={@handleSubmit}></form>
)

module.exports = App
