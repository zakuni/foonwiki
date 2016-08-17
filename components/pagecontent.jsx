var React = require('react');

var PageContent = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    onContentChange: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    this.editable.focus();
  },
  render: function() {
    var style = {
      whiteSpace: 'pre',
      marginBottom: '20px'
    };
    return (
      <div
        className="editable cursor-text"
        contentEditable="true"
        style={style}
        ref={node => this.editable = node}
        onInput={() => this.props.onContentChange(this.editable.innerHTML)}
      >
        {this.props.content}
      </div>
    );
  }
});

module.exports = PageContent;
