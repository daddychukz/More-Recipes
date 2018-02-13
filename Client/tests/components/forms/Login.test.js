import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedLogin, { PureLogin } from '../../../src/components/forms/LoginForm';

jest.mock('react-google-login');

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
  signIn: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  signUp: jest.fn(),
  resetPasswordRequest: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const mountedWrapper = mount(
  <BrowserRouter>
    <ConnectedLogin store={store} />
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureLogin {...props} />);
const state = {
  Email: 'chuks@yahoo.com',
  Password: 'chuks'
};
const event = {
  preventDefault: jest.fn(),
  target: {
    Password: 'abcde',
    Email: 'chuks@yahoo.com',
  }
};
const googleResponse = {
  profileObj: {
    email: 'chuks@yahoo.com',
    name: 'chuks',
    googleId: 12345678,
    imageUrl: 'image.jpg'
  }
};

describe('Login', () => {
  it('renders Login component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('LoginForm').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <PureLogin {...props} />
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

  it('calls sendResetLink event', () => {
    sinon.spy(shallowWrapper.instance(), 'sendResetLink');
    state.Email = 'abu@yahoo.com';
    shallowWrapper.setState(state);
    shallowWrapper.instance().sendResetLink(event);
    expect(shallowWrapper.instance().sendResetLink.calledOnce).toEqual(true);
  });

  it('calls GoogleSignup event', () => {
    sinon.spy(shallowWrapper.instance(), 'responseGoogle');
    shallowWrapper.instance().responseGoogle(googleResponse);
    expect(shallowWrapper.instance().responseGoogle.calledOnce).toEqual(true);
  });
});
