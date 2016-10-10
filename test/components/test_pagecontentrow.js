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
    const handleChange = sinon.spy(value => {return value});
    const wrapper = mount(<PageContentRow text={contentRow} onChange={handleChange} />);
    wrapper.find('div').simulate('input');
    assert.equal(handleChange.calledOnce, true);
    assert.equal(handleChange.args[0], "row");
    assert.equal(handleChange.returnValues[0], "row");
  });
});
