var React = require('react');

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
    this.setState({ focus: !this.state.focus}, () => {
      if (this.state.focus) {
        this.input.focus();
      }
    });
  },
  handleChange: function() {
    this.props.onTitleChange(this.input.value);
  },
  render: function() {
    var pageTitleElem =
      this.state.focus ?
        <form id="pagenameform" className="pagename">
          <input
            id="pagenameinput"
            className="border-dotted"
            type="text"
            placeholder="no title"
            value={this.props.title}
            onChange={this.handleChange}
            onBlur={this.toggleFocus}
            ref={node => this.input = node}
          />
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
