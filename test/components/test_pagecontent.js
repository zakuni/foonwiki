import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import assert from 'power-assert';

import PageContent from '../../components/pagecontent.jsx';

describe('<PageContent>', () => {
  it('should render one <section>', () => {
    const wrapper = shallow(<PageContent />);
    assert.equal(wrapper.find('section').length, 1);
    assert.equal(wrapper.find('PageContentRow').length, 1);
    assert.equal(wrapper.text(), "<PageContentRow />");
  });

  it('renders the content rows', () => {
    const content = "content text\nsecond row";
    const wrapper = shallow(<PageContent content={content} />);
    assert.equal(wrapper.text(), "<PageContentRow /><PageContentRow />");
  });

  it('should call onContentChange callback on input', () => {
    const content = "content text\nsecond row";
    const onContentChange = sinon.spy(text => {return text});
    const wrapper = mount(<PageContent content={content} onContentChange={onContentChange} />);
    wrapper.find('div').first().simulate('input');
    assert.equal(onContentChange.calledOnce, true);
    assert.equal(onContentChange.args[0], "content text\nsecond row");
    assert.equal(onContentChange.returnValues[0], "content text\nsecond row");
  });
});
