import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedResetPassword,
{ ResetPassword } from '../../src/components/pages/ResetPassword';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  user: {}
};
const store = mockStore(initialState);

const props = {
  validateToken: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  match: {
    params: {
      token: ''
    }
  }
};

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedResetPassword {...props} />
    </Provider>
  </BrowserRouter>
);

describe('MyFavorite test suite', () => {
  it('renders MyFavorite component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('ResetPassword').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <Provider store={store}>
          <ResetPassword {...props} />
        </Provider>
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });
});
