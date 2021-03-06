var debug = require('debug')('page');
var inspect = require('object-inspect');
var request = require('superagent');
import React from 'react';
import PageTitle from './pagetitle';
import PageContent from './pagecontent';

var PageApp = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    pageId: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      title: this.props.title,
      content: this.props.content === null ? "" : this.props.content
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
  handleContentChange: function (text) {
    this.setState({content: text}, function() {
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

module.exports = PageApp
