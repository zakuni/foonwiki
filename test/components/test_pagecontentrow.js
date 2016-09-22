import React from 'react';
import { shallow } from 'enzyme';
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
});
