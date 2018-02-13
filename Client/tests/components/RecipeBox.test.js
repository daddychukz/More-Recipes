import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedRecipeBox,
{ PureRecipeBox } from '../../src/components/pages/RecipeBox';

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
  viewAllRecipes: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  allRecipe: {
    pagination: {
      totalCount: 0,
      pageCount: 0
    },
    recipes: []
  }
};

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRecipeBox {...props} />
    </Provider>
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureRecipeBox {...props} />);
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

describe('RecipeBox test suite', () => {
  it('renders recibe box component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('RecipeBox').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <Provider store={store}>
          <PureRecipeBox {...props} />
        </Provider>
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls onPageChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onPageChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onPageChange(event);
    expect(shallowWrapper.instance().onPageChange.calledOnce).toEqual(true);
  });

  it('calls onInputChange event', () => {
    state.Review = 'nice';
    sinon.spy(shallowWrapper.instance(), 'onInputChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onInputChange(event);
    expect(shallowWrapper.instance().onInputChange.calledOnce).toEqual(true);
  });

  it('displays recipes on the page if recipes are created', () => {
    props.allRecipe.recipes.push({
      recipeId: '123',
      userId: '1234',
      title: 'yam',
      description: 'preparation'
    });
    sinon.spy(shallowWrapper.instance(), 'componentWillMount');
    shallowWrapper.instance().componentWillMount();
    expect(shallowWrapper.instance().componentWillMount.calledOnce).toEqual(true);
  });

  it('displays loader when recipes is loading', () => {
    state.isLoading = true;
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillMount();
    expect(shallowWrapper.instance().componentWillMount.called).toEqual(true);
    expect(state.isLoading).toBe(true);
  });

  it('displays pagination component', () => {
    props.allRecipe.pagination.totalCount = 5;
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillMount();
    expect(shallowWrapper.instance().componentWillMount.called).toEqual(true);
  });
});
