import React, { Component } from 'react';

class PageContent extends Component {
  render() {
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
