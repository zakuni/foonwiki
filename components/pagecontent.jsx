var React = require('react');
var ReactDOM = require('react-dom');

var PageContent = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    onContentChange: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    this.focus();
  },
  focus: function() {
    ReactDOM.findDOMNode(this.refs.editable).focus();
  },
  changeContent: function() {
    this.props.onContentChange(
      this.refs.editable.innerHTML
    );
  },
  render: function() {
    var style = {
      whiteSpace: 'pre',
      marginBottom: '20px'
    };
    return (
      <div className="editable cursor-text" contentEditable="true" style={style} ref="editable" onInput={this.changeContent}>{this.props.content}</div>
    );
  }
});

module.exports = PageContent
