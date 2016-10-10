import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import assert from 'power-assert';

import PageContentRow from '../../components/pagecontentrow.jsx';

describe('<PageContentRow>', () => {
  it('should render one <div>', () => {
    const wrapper = shallow(<PageContentRow />);
    assert.equal(wrapper.find('div').length, 1);
  });

  it('renders the text', () => {
    const wrapper = shallow(<PageContentRow text="row text" />);
    assert.equal(wrapper.text(), "row text");
  });

  it('renders input tag by focusing', () => {
    const wrapper = mount(<PageContentRow />);
    assert.equal(wrapper.find('div').length, 1);

    wrapper.find('div').simulate('click');
    assert.equal(wrapper.find('div').length, 0);
    assert.equal(wrapper.find('input').length, 1);

    wrapper.find('input').simulate('blur');
    assert.equal(wrapper.find('input').length, 0);
    assert.equal(wrapper.find('div').length, 1);
  });

  it('should call onChange callback on input', () => {
    const contentRow = "row";
    const handleChange = sinon.spy((arg0, arg1) => {return [arg0, arg1]});
    const wrapper = mount(<PageContentRow lineNumber={1} text={contentRow} onChange={handleChange} />);
    wrapper.find('div').simulate('click');
    wrapper.find('input').simulate('change');
    assert.equal(handleChange.calledOnce, true);
    assert.equal(handleChange.args[0][0], 1);
    assert.equal(handleChange.args[0][1], "row");
    assert.equal(handleChange.returnValues[0][0], 1);
    assert.equal(handleChange.returnValues[0][1], "row");
  });
});
