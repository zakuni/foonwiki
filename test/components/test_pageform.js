import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';

import PageForm from '../../components/pageform.jsx';

describe('<PageForm>', () => {
  it('should render one <form>', () => {
    const wrapper = shallow(<PageForm />);
    assert.equal(wrapper.find('form').length, 1);
  });
});
