import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../../src/components/pages/Home';


jest.mock('react-google-login');
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    isAuthenticated: false,
    user: {}
  },
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

const testRender = render.create(
  <BrowserRouter>
    <Provider store={store}>
      <Home />
    </Provider>
  </BrowserRouter>
);
describe('<Homepage/>', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <Home />
      </Provider>
    </BrowserRouter>
  );
  it('renders <Homepage/> component', () => {
    expect(testRender).toMatchSnapshot();
  });

  it('should check the <Header/> component exists', () => {
    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('should check the Connect(LoginForm) property exists', () => {
    expect(wrapper.find('Connect(LoginForm)').length).toEqual(1);
  });
});
