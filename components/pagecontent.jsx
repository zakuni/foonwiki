import React, { Component } from 'react';
import PageContentRow from './pagecontentrow';

class PageContent extends Component {
  constructor(props) {
    super(props);
    this.mergeContent = this.mergeContent.bind(this);
    this.insertNewLine = this.insertNewLine.bind(this);
    this.backSpace = this.backSpace.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
  }
  mergeContent(lineNumber, text) {
    let content = "";
    Array.from(this.refs.contents.childNodes).forEach((node, index) => {
      content += index+1 === lineNumber ? `${text}\n` : `${node.textContent}\n`;
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
    this.refs[lineNumber].toggleFocus();
  }
  moveUp(lineNumber) {
    this.focusTo(lineNumber-1);
  }
  moveDown(lineNumber) {
    this.focusTo(lineNumber+1);
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
                  onUpkeyDown={this.moveUp}
                  onDownKeyDown={this.moveDown}  
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
