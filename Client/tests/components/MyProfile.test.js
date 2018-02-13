import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedUserProfile,
{ PureProfile } from '../../src/components/pages/MyProfile';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  user: {},
  recipeOperations: {
    pagination: {},
    recipes: []
  },
  review: [],
  favorite: [],
  popularRecipes: [],
  singleRecipe: {},
  allRecipe: {
    pagination: {},
    recipes: []
  }
};
const store = mockStore(initialState);

const props = {
  getUserProfile: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  updateUserProfile: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  logout: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  profile: {
    userId: '',
    email: '',
    username: '',
    address: '',
    about: '',
    hobbies: '',
    phone: '',
    publicUrl: '',
    imageUrl: '',
    fullname: ''
  },
  resetPassword: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedUserProfile {...props} />
    </Provider>
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureProfile {...props} />);
const state = {
  FullName: props.profile.fullname,
  Phone: props.profile.phone,
  Address: props.profile.address,
  About: props.profile.about,
  Hobbies: props.profile.hobbies,
  PublicId: props.profile.publicUrl,
  Email: props.profile.email,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  isLoading: false
};
const event = {
  preventDefault: jest.fn(),
  target: {
    Review: '',
    Category: ''
  }
};

describe('MyFavorite test suite', () => {
  it('renders MyFavorite component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('MyProfile').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <Provider store={store}>
          <PureProfile {...props} />
        </Provider>
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls logout event', () => {
    sinon.spy(shallowWrapper.instance(), 'logout');
    shallowWrapper.instance().logout();
    expect(shallowWrapper.instance().logout.calledOnce).toEqual(true);
  });

  it('calls onSubmit event', () => {
    sinon.spy(shallowWrapper.instance(), 'onSubmit');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.instance().onSubmit.calledOnce).toEqual(true);
  });

  it('calls onChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onChange(event);
    expect(shallowWrapper.instance().onChange.calledOnce).toEqual(true);
  });

  it('calls uploadWidget function when user adds image successfully', () => {
    sinon.spy(shallowWrapper.instance(), 'uploadWidget');
    shallowWrapper.instance().uploadWidget();
    expect(shallowWrapper.instance().uploadWidget.calledOnce).toEqual(true);
  });

  it('throws error user password fields doesnt match', () => {
    state.newPassword = '123';
    state.confirmPassword = '223';
    sinon.spy(shallowWrapper.instance(), 'changePassword');
    shallowWrapper.setState(state);
    shallowWrapper.instance().changePassword(event);
    expect(shallowWrapper.instance().changePassword.calledOnce).toEqual(true);
  });

  it('dispatches action to change user password', () => {
    state.newPassword = '123';
    state.confirmPassword = '123';
    shallowWrapper.setState(state);
    shallowWrapper.instance().changePassword(event);
    expect(shallowWrapper.instance().changePassword.called).toEqual(true);
  });

  it('calls change password modal', () => {
    sinon.spy(shallowWrapper.instance(), 'openModal');
    shallowWrapper.setState(state);
    shallowWrapper.instance().openModal();
    expect(shallowWrapper.instance().openModal.calledOnce).toEqual(true);
  });

  it('displays default user image', () => {
    props.profile.publicUrl = 'user-male_jvc8hn.jpg';
    sinon.spy(shallowWrapper.instance(), 'componentWillMount');
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillMount();
    expect(shallowWrapper.instance().componentWillMount.calledOnce).toEqual(true);
  });
});
