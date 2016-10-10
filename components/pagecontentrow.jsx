import React, { Component, PropTypes } from 'react';

class PageContentRow extends Component {
  constructor(props) {
    super(props);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {focus: false};
  }
  toggleFocus() {
    this.setState({ focus: !this.state.focus }, () => {
      if (this.state.focus) {
        this.input.focus();
      }
    });
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
    let rowElem =
      this.state.focus ?
      <input
          type="text"
          ref={node => this.input = node}
          value={this.props.text}
          onChange={() => this.props.onChange(this.props.lineNumber, this.input.value)}
          onBlur={this.toggleFocus}
          onKeyDown={this.handleKeyDown}
      />
      :
      <div
          className="cursor-text"
          onClick={this.toggleFocus}
      >
          {this.props.text}
      </div>

    return rowElem;
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
