import React, { Component, PropTypes } from 'react';

class PageContentRow extends Component {
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
          {this.props.text}
      </div>
    );
  }
}
PageContentRow.propTypes = {
  text: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired
};

export default PageContentRow;
