import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';

import PageContent from '../../components/pagecontent.cjsx';

describe('<PageContent>', () => {
  it('should render one <div>', () => {
    const wrapper = shallow(<PageContent />);
    assert.equal(wrapper.find('div').length, 1);
  });
});
