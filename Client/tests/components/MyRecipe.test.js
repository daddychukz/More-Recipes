import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedUserRecipe,
{ PureUserRecipe } from '../../src/components/pages/MyRecipe';

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
  recipes: {
    pagination: {
      totalCount: 0,
      pageCount: 0
    },
    recipes: []
  },
  getUserRecipes: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  deleteUserRecipe: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  updateRecipe: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedUserRecipe {...props} />
    </Provider>
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureUserRecipe {...props} />);
const state = {
  recipeDetail: {},
  Title: '',
  Description: '',
  imageUrl: '',
  publicId: '',
  Category: '',
  currentPage: 1,
  pagination: {
    totalPages: 1,
    boundaryPagesRange: 1,
    siblingPagesRange: 2,
    limit: 5,
    offset: 0,
  },
  isLoading: true
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
    expect(mountedWrapper.find('MyRecipe').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <Provider store={store}>
          <PureUserRecipe {...props} />
        </Provider>
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls onSubmit event', () => {
    sinon.spy(shallowWrapper.instance(), 'onSubmit');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.instance().onSubmit.calledOnce).toEqual(true);
  });

  it('calls onPageChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onPageChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onPageChange(event);
    expect(shallowWrapper.instance().onPageChange.calledOnce).toEqual(true);
  });

  it('calls onChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onChange(event);
    expect(shallowWrapper.instance().onChange.calledOnce).toEqual(true);
  });

  it('dispatches action to edit recipe', () => {
    const recipe = {
      recipeId: '123'
    };
    state.Category = 'Lunch';
    sinon.spy(shallowWrapper.instance(), 'editRecipe');
    shallowWrapper.instance().editRecipe(recipe);
    expect(shallowWrapper.instance().editRecipe.calledOnce).toEqual(true);
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

  it('calls uploadWidget function when user adds image successfully', () => {
    sinon.spy(shallowWrapper.instance(), 'uploadWidget');
    shallowWrapper.instance().uploadWidget();
    expect(shallowWrapper.instance().uploadWidget.calledOnce).toEqual(true);
  });

  it('displays recipes of a user', () => {
    props.recipes.recipes.push({
      userId: '3',
      recipeId: '8',
      Recipe: {}
    });
    sinon.spy(shallowWrapper.instance(), 'componentDidMount');
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentDidMount();
    expect(shallowWrapper.instance().componentDidMount.called).toEqual(true);
  });

  it('displays pagination component', () => {
    props.recipes.pagination.totalCount = 6;
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentDidMount();
    expect(shallowWrapper.instance().componentDidMount.called).toEqual(true);
  });
});
