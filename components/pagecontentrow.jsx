import React, { Component, PropTypes } from 'react';

class PageContentRow extends Component {
  constructor(props) {
    super(props);
  }
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
  lineNumber: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
PageContentRow.defaultProps = {
  text: "",
  onChange: () => {}
};

export default PageContentRow;
