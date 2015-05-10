React = require 'react'
Page = require ('./models/page')
`
var PageApp = new Backbone.Marionette.Application();

PageApp.model = new Page();
`

$ ->
  recentPage = localStorage.getItem("recentPages")
  if recentPage?
    $("#seen ul")
      .append $("<li></li>")
      .append $("<a></a>")
      .text(JSON.parse(recentPage).name)

App = React.createClass(
  getInitialState: ->
    {
      title: page.name
      content: page.content
    }
  submitPage: ->
    PageApp.model.set({
      name: @state.title
      content: @state.content
    })
    PageApp.model.url = ()-> return $("#contents").attr("action")
    PageApp.model.save()
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
    @setState({title: title})
  handleTitleSubmit: (title) ->
    @setState({title: title}, -> @submitPage())
  render: ->
    <div>
      <div className="row">
        <div className="small-12 column">
          <PageTitle onTitleChange={@handleTitleChange} onTitleSubmit={@handleTitleSubmit} />
        </div>
      </div>
      <div className="row">
        <div className="small-12 column">
          <PageContent ref="content" />
          <PageForm onPageSubmit={@handlePageSubmit} />
        </div>
      </div>
    </div>
)

PageTitle = React.createClass(
  propTypes:
    onTitleChange: React.PropTypes.func.isRequired
    onTitleSubmit: React.PropTypes.func.isRequired
  getInitialState: ->
    {
      title: page.name
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
  getInitialState: ->
    {content: page.content}
  componentDidMount: ->
    @focus()
  focus: ->
    React.findDOMNode(@refs.editable).focus()
  render: ->
    style = {
      whiteSpace: 'pre'
      marginBottom: '20px'
    }
    return (
      <div className="editable cursor-text" contentEditable="true" style={style} ref="editable">{this.state.content}</div>
    )
)

PageForm = React.createClass(
  propTypes:
    onPageSubmit: React.PropTypes.func.isRequired
  handleSubmit: (e) ->
    e.preventDefault()
    @props.onPageSubmit()
  render: ->
    <form id="contents" action={if page.id then "/pages/#{page.id}" else "/pages/"} method="POST" onSubmit={@handleSubmit}>
      <input type="submit" value="save" />
    </form>
)

module.exports = App
