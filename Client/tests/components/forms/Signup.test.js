import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedSignup,
{ PureSignup } from '../../../src/components/forms/SignupForm';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    isAuthenticated: false,
    user: {}
  },
  user: {}
};
const store = mockStore(initialState);

const props = {
  actions: {
    signUp: sinon.spy(() => new Promise(() => {}))
  },
};

const mountedWrapper = mount(
  <BrowserRouter>
    <ConnectedSignup store={store} />
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureSignup {...props} />);
const state = {
  email: 'chuks@yahoo.com',
  password: 'chuks',
  confirmPassword: 'chuks',
  error: false
};
const event = {
  preventDefault: jest.fn(),
  target: {
    password: 'abcde',
    email: 'chuks@yahoo.com',
  }
};

describe('Signup test actiomns', () => {
  it('renders Signup component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('SignupForm').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <PureSignup {...props} />
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls onChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onChange');
    shallowWrapper.instance().onChange(event);
    expect(shallowWrapper.instance().onChange.calledOnce).toEqual(true);
  });

  it('calls onSubmit event', () => {
    sinon.spy(shallowWrapper.instance(), 'onSubmit');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.instance().onSubmit.calledOnce).toEqual(true);
  });

  it('calls onSubmit event with errors when password mismatch', () => {
    state.confirmPassword = 'chuksy';
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.state().error).toEqual(true);
  });
});
