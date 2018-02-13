import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedResetForm,
{ ResetPassword } from '../../../src/components/forms/ResetPasswordForm';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  user: {
    message: 'all good'
  },
  auth: {
    isAuthenticated: false,
    user: {}
  }
};
const store = mockStore(initialState);

const props = {
  resetPassword: sinon.spy(() => new Promise(() => {})),
  token: 'token'
};

const mountedWrapper = mount(
  <BrowserRouter>
    <ConnectedResetForm {...props} store={store} />
  </BrowserRouter>
);

const shallowWrapper = shallow(<ResetPassword {...props} />);
const state = {
  token: props.token,
  Password: '',
  ConfirmPassword: '',
  error: false
};
const event = {
  preventDefault: jest.fn(),
  target: {
    Password: '',
    ConfirmPassword: ''
  }
};

describe('Reset password test suite', () => {
  it('renders reset password component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('ResetPasswordForm').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <ResetPassword {...props} />
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
    state.ConfirmPassword = 'chuksy';
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.state().error).toEqual(true);
  });
});
