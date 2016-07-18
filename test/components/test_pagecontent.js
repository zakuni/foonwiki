import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import assert from 'power-assert';

import PageContent from '../../components/pagecontent.cjsx';

describe('<PageContent>', () => {
  it('should render one <div>', () => {
    const wrapper = shallow(<PageContent />);
    assert.equal(wrapper.find('div').length, 1);
    assert.equal(wrapper.text(), "");
  });

  it('should call onContentChange callback on input', () => {
    const onContentChange = sinon.spy();
    const wrapper = shallow(<PageContent onContentChange={onContentChange} />);
    wrapper.find('div').simulate('input');
    assert.equal(onContentChange.calledOnce, true);
  });
});
