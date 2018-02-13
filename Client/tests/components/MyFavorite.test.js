import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedFavorite,
{ PureFavorite } from '../../src/components/pages/MyFavorite';

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
  getFavorite: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  favoriteData: [],
  searchFavorites: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  user: {
    userId: ''
  },
  deleteFavorite: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedFavorite {...props} />
    </Provider>
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureFavorite {...props} />);
const state = {
  isLoading: true,
  currentPage: 1,
  pagination: {
    totalPages: 2,
    boundaryPagesRange: 1,
    siblingPagesRange: 2,
    limit: 4,
    offset: 0,
  },
  searchString: ''
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
    expect(mountedWrapper.find('MyFavoriteRecipe').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <Provider store={store}>
          <PureFavorite {...props} />
        </Provider>
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls onKeyPressEnter event', () => {
    event.key = 'Enter';
    sinon.spy(shallowWrapper.instance(), 'onKeyPressEnter');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onKeyPressEnter(event);
    expect(shallowWrapper.instance().onKeyPressEnter.calledOnce).toEqual(true);
  });

  it('calls onInputChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onInputChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onInputChange(event);
    expect(shallowWrapper.instance().onInputChange.calledOnce).toEqual(true);
  });

  it('dispatches action to delete recipe', () => {
    const recipe = {
      recipeId: '123'
    };
    state.Category = 'Lunch';
    sinon.spy(shallowWrapper.instance(), 'deleteRecipe');
    shallowWrapper.instance().deleteRecipe(recipe);
    expect(shallowWrapper.instance().deleteRecipe.calledOnce).toEqual(true);
  });

  it('displays favorite recipes of a user', () => {
    props.favoriteData.push({
      userId: '3',
      recipeId: '8',
      Recipe: {}
    });
    sinon.spy(shallowWrapper.instance(), 'componentWillMount');
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillMount();
    expect(shallowWrapper.instance().componentWillMount.called).toEqual(true);
  });
});
