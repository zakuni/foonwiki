import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';

import PageApp from '../../components/pageapp.jsx';
import PageTitle from '../../components/pagetitle.jsx';
import PageContent from '../../components/pagecontent.jsx';

describe('<PageApp>', () => {
  it('has correct nodes', () => {
    const wrapper = shallow(<PageApp />);
    assert.equal(wrapper.childAt(0).type(), 'div');
    assert.equal(wrapper.find(PageTitle).length, 1);
    assert.equal(wrapper.find(PageContent).length, 1);
  });
});
