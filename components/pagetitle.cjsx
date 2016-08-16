React = require('react')
ReactDOM = require('react-dom')

PageTitle = React.createClass
  propTypes:
    title: React.PropTypes.string
    onTitleChange: React.PropTypes.func.isRequired
    onTitleSubmit: React.PropTypes.func.isRequired
  getInitialState: ->
    {
      focus: false
    }
  toggleFocus: (e) ->
    @setState({focus: !@state.focus}, -> ReactDOM.findDOMNode(@refs.input).focus())
  changeTitle: (e) ->
    @props.onTitleSubmit(@refs.input.value)
  handleSubmit: (e) ->
    e.preventDefault()
    @props.onTitleSubmit(@refs.input.value)
  render: ->
    pageTitleElem =
      if @state.focus
        <form id="pagenameform" className="pagename" onSubmit={@handleSubmit}>
          <input id="pagenameinput" className="border-dotted" type="text" placeholder="no title" value={@props.title} onChange={@changeTitle} onBlur={@toggleFocus} ref="input" />
        </form>
      else
        <h3 id="pagename" className="pageTitle border-dotted cursor-text" placeholder="no title" onClick={@toggleFocus}>
          {@props.title}
        </h3>

    <section id="pagetitle" className="pagetitle">
      {pageTitleElem}
    </section>

module.exports = PageTitle
