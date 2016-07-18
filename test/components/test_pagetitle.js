import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';

import PageTitle from '../../components/pagetitle.cjsx';

describe('<PageTitle>', () => {
  it('should render one <section>', () => {
    const wrapper = shallow(<PageTitle />);
    assert.equal(wrapper.find('section').length, 1);
  });
});