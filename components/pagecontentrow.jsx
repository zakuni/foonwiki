import React, { Component, PropTypes } from 'react';

class PageContentRow extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(event) {
    const keyCode = event.keyCode;
    if(keyCode === 13) {
      this.props.onEnterKeyDown(this.props.lineNumber);
      event.preventDefault();
    } else if(keyCode === 8) {
      this.props.onBackSpaceKeyDown(this.props.lineNumber);
      event.preventDefault();
    }
  }
  render() {
    return (
      <div
          className="editable cursor-text"
          contentEditable="true"
          ref={node => this.editable = node}
          onInput={() => this.props.onChange(this.editable.innerHTML)}
          onKeyDown={this.handleKeyDown}
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
  onEnterKeyDown: PropTypes.func,
  onBackSpaceKeyDown: PropTypes.func
};
PageContentRow.defaultProps = {
  text: "",
  onChange: () => {}
};

export default PageContentRow;
