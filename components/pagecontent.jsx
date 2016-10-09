import React, { Component } from 'react';
import PageContentRow from './pagecontentrow';
import ReactDOM from 'react-dom';

class PageContent extends Component {
  constructor(props) {
    super(props);
    this.mergeContent = this.mergeContent.bind(this);
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
  render() {
    const rows = [];
    this.props.content.split(/\r\n|\r|\n/).forEach((line, index) => {
      const lineNumber = index+1;
      rows.push(<PageContentRow
                  lineNumber={lineNumber}
                  text={line}
                  onChange={this.mergeContent}
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
