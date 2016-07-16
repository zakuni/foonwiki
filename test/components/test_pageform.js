import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';

import PageForm from '../../components/pageform.jsx';

describe('<PageForm>', () => {
  it('should render one <form>', () => {
    const wrapper = shallow(<PageForm />);
    expect(wrapper.find('form')).to.have.length(1);
  });
});
