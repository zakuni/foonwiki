var debug = require('debug')('page');
var inspect = require('object-inspect');
var request = require('superagent');
var React = require('react');
var PageTitle = require('./pagetitle.jsx');
var PageContent = require('./pagecontent.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.title,
      content: this.props.content
    }
  },
  submitPage: function() {
    var path = this.props.pageId !== undefined && this.props.pageId !== null ? `/pages/${this.props.pageId}` : "/pages/";

    debug('submit to %s %s', path, inspect(this.state, {colors: true}));
    request
      .put(path)
      .send({name: this.state.title, content: this.state.content})
      .end((err, res) => { debug('%s %s', err, res) });
  },
  handleContentChange: function (html) {
    var ce = $("<pre />").html(html);
    if($.browser.webkit !== undefined)
      ce.find("div").replaceWith(function() { return "\n" + this.innerHTML})
    if($.browser.msie !== undefined)
      ce.find("p").replaceWith(function() { return this.innerHTML + "<br>" });
    if($.browser.mozilla || $.browser.opera || $.browser.msie)
      ce.find("br").replaceWith("\n")

    this.setState({content: ce.text()}, function() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.submitPage, 500);
    });
  },
  handleTitleChange: function(title) {
    this.setState({title: title}, function() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.submitPage, 500);
    });
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="small-12 column">
            <PageTitle onTitleChange={this.handleTitleChange} title={this.state.title} />
          </div>
        </div>
        <div className="row">
          <div className="small-12 column">
            <PageContent ref="content" onContentChange={this.handleContentChange} content={this.state.content} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App
