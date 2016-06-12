var React = require('react');

var PageForm = React.createClass({
  propTypes: {
    pageId: React.PropTypes.string,
    onPageSubmit: React.PropTypes.func.isRequired
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onPageSubmit();
  },
  render: function() {
    var action = "";
    if (this.props.pageId) {
      action = `/pages/${this.props.pageId}`;
    } else {
      action = "/pages/";
    }
    return (
      <form id="contents" action={action} method="PUT" onSubmit={this.handleSubmit}></form>
    );
  }
});

module.exports = PageForm;
