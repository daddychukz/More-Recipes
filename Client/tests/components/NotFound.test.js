import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from '../../src/components/pages/NotFound';


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
      <NotFound />
    </Provider>
  </BrowserRouter>
);
describe('Not Found page test suite', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <NotFound />
      </Provider>
    </BrowserRouter>
  );
  it('renders NotFound component', () => {
    expect(testRender).toMatchSnapshot();
  });

  it('should check the <Header/> component exists', () => {
    expect(wrapper.find('Header').length).toEqual(1);
  });
});
