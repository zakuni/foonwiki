React = require('react')
ReactDOM = require('react-dom')

PageContent = React.createClass
  propTypes:
    content: React.PropTypes.string.isRequired
    onContentChange: React.PropTypes.func.isRequired
  getInitialState: ->
    {content: @props.content}
  componentDidMount: ->
    @focus()
  focus: ->
    ReactDOM.findDOMNode(@refs.editable).focus()
  changeContent: ->
    @props.onContentChange(
      this.refs.editable.innerHTML
    );
  render: ->
    style =
      whiteSpace: 'pre'
      marginBottom: '20px'
    <div className="editable cursor-text" contentEditable="true" style={style} ref="editable" onInput={@changeContent}>{this.state.content}</div>

module.exports = PageContent
