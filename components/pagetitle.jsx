var React = require('react');
var ReactDOM = require('react-dom');

var PageTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    onTitleChange: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      focus: false
    };
  },
  toggleFocus: function() {
    this.setState({focus: !this.state.focus}, () => {if (this.state.focus) { ReactDOM.findDOMNode(this.refs.input).focus(); }})
  },
  handleChange: function() {
    this.props.onTitleChange(this.refs.input.value);
  },
  render: function() {
    var pageTitleElem =
      this.state.focus ?
        <form id="pagenameform" className="pagename">
          <input id="pagenameinput" className="border-dotted" type="text" placeholder="no title" value={this.props.title} onChange={this.handleChange} onBlur={this.toggleFocus} ref="input" />
        </form>
      :
        <h3 id="pagename" className="pageTitle border-dotted cursor-text" placeholder="no title" onClick={this.toggleFocus}>
          {this.props.title}
        </h3>

    return (
      <section id="pagetitle" className="pagetitle">
        {pageTitleElem}
      </section>
    );
  }
});

module.exports = PageTitle
