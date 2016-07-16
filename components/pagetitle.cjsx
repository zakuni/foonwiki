React = require('react')

PageTitle = React.createClass
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
    @setState({focus: !@state.focus}, -> ReactDOM.findDOMNode(@refs.input).focus())
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

    <section id="pagetitle" className="pagetitle">
      {pageTitleElem}
    </section>

module.exports = PageTitle