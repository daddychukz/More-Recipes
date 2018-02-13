import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../../src/routes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const store = mockStore({});

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>
);

describe('The Routes Component', () => {
  it('should render without issues', () => {
    expect(mountedWrapper).toBeDefined();
    expect(toJson(mountedWrapper)).toMatchSnapshot();
  });
});
