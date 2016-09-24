import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import assert from 'power-assert';

import PageContent from '../../components/pagecontent.jsx';

describe('<PageContent>', () => {
  it('should render one <div>', () => {
    const wrapper = shallow(<PageContent />);
    assert.equal(wrapper.find('div').length, 1);
    assert.equal(wrapper.text(), "");
  });

  it('renders the content', () => {
    const wrapper = shallow(<PageContent content="content text" />);
    assert.equal(wrapper.text(), "content text");
  });

  it('should call onContentChange callback on input', () => {
    const content = "content text";
    const onContentChange = sinon.spy(text => {return text});
    const wrapper = mount(<PageContent content={content} onContentChange={onContentChange} />);
    wrapper.find('div').simulate('input');
    assert.equal(onContentChange.calledOnce, true);
    assert.equal(onContentChange.args[0], "content text");
    assert.equal(onContentChange.returnValues[0], "content text");
  });
});
