import React, { Component, PropTypes } from 'react';

class PageContentRow extends Component {
  render() {
    return (
      <div
          className="editable cursor-text"
          contentEditable="true"
          ref={node => this.editable = node}
          onInput={() => this.props.onChange(this.editable.innerHTML)}
      >
          {this.props.text}
      </div>
    );
  }
}
PageContentRow.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
PageContentRow.defaultProps = {
  text: "",
  onChange: () => {}
};

export default PageContentRow;
