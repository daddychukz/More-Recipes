import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { PureHeader } from '../../src/components/pages/Header';


const props = {
  logout: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const shallowWrapper = shallow(<PureHeader {...props} />);

describe('MyFavorite test suite', () => {
  it('renders MyFavorite component without crashing', () => {
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('nav').length).toBe(1);
  });

  it('should match component snapshot', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('calls logout event', () => {
    sinon.spy(shallowWrapper.instance(), 'logout');
    shallowWrapper.instance().logout();
    expect(shallowWrapper.instance().logout.calledOnce).toEqual(true);
  });
});
