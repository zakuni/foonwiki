import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import assert from 'power-assert';

import PageTitle from '../../components/pagetitle.cjsx';

describe('<PageTitle>', () => {
  it('should render one <section>', () => {
    const wrapper = shallow(<PageTitle />);
    assert.equal(wrapper.find('section').length, 1);
  });

  it('renders the title', () => {
    const wrapper = shallow(<PageTitle title="title text" />);
    assert.equal(wrapper.text(), "title text");
  });

  it('renders different tag by focusing', () => {
    const wrapper = mount(<PageTitle title="title text" />);
    assert.equal(wrapper.find('h3').length, 1);

    wrapper.find('h3').simulate('click');
    assert.equal(wrapper.find('h3').length, 0);
    assert.equal(wrapper.find('form').length, 1);

    wrapper.find('input').simulate('blur');
    assert.equal(wrapper.find('form').length, 0);
    assert.equal(wrapper.find('h3').length, 1);
  });

  it('should call onTitleChange callback on input', () => {
    const onTitleChange = sinon.spy(title => {return title});
    const wrapper = mount(<PageTitle title="title text" onTitleChange={onTitleChange} />);
    wrapper.find('h3').simulate('click');
    wrapper.find('input').simulate('change');
    assert.equal(onTitleChange.calledOnce, true);
    assert.equal(onTitleChange.args[0], "title text");
    assert.equal(onTitleChange.returnValues[0], "title text");
  });
});
