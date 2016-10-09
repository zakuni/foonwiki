import React, { Component } from 'react';
import PageContentRow from './pagecontentrow';
import ReactDOM from 'react-dom';

class PageContent extends Component {
  constructor(props) {
    super(props);
    this.mergeContent = this.mergeContent.bind(this);
    this.insertNewLine = this.insertNewLine.bind(this);
    this.backSpace = this.backSpace.bind(this);
  }
  mergeContent() {
    let content = "";
    Array.from(this.refs.contents.childNodes).forEach((node) => {
      content += `${node.textContent}\n`;
    });
    // remove last extra newline
    content = content.substr(0, content.length-1);
    this.props.onContentChange(content);
  }
  insertNewLine(lineNumber) {
    let content = "";
    this.props.content.split(/\r\n|\r|\n/).forEach((line, index) => {
      content += `${line}\n`;
      if(index === lineNumber-1) {
        content += "\n";
      }
    });
    // remove last extra newline
    content = content.substr(0, content.length-1);
    this.props.onContentChange(content);
    this.focusTo(lineNumber+1);
  }
  backSpace(lineNumber) {
    let content = "";
    this.props.content.split(/\r\n|\r|\n/).forEach((line, index) => {
      content += `${line}\n`;
      if(index === lineNumber-1 && line === "") {
        content = content.substr(0, content.length-1);
      }
    });
    content = content.substr(0, content.length-1);
    this.props.onContentChange(content);
    this.focusTo(lineNumber-1);
  }
  focusTo(lineNumber) {
    ReactDOM.findDOMNode(this.refs[lineNumber]).focus();
  }
  render() {
    const rows = [];
    this.props.content.split(/\r\n|\r|\n/).forEach((line, index) => {
      const lineNumber = index+1;
      rows.push(<PageContentRow
                  lineNumber={lineNumber}
                  text={line}
                  onChange={this.mergeContent}
                  onEnterKeyDown={this.insertNewLine}
                  onBackSpaceKeyDown={this.backSpace}
                  key={index}
                  ref={lineNumber}
                />);
    });
    return (
      <section ref="contents">
        {rows}
      </section>
    );
  }
}
PageContent.propTypes = {
  content: React.PropTypes.string.isRequired,
  onContentChange: React.PropTypes.func.isRequired
};
PageContent.defaultProps = {
  content: "",
  onContentChange: () => {}
};

export default PageContent;
