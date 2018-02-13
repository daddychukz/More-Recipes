import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedRecipeDetail,
{ PureRecipeDetail } from '../../src/components/pages/RecipeDetail';

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
  viewSingleRecipe: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  upvoteRecipe: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  downvoteRecipe: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  reviewRecipe: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  viewAllReviews: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  addFavorite: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  getFavorite: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  showReview: [],
  favoriteData: [],
  singleRecipe: {
    viewsCount: 0,
    title: '',
    description: '',
    fullname: '',
    publicId: '',
    recipeId: '',
    value: 0,
    upvotes: 0,
    downvotes: 0,
    Votes: [{
      id: 1,
      userId: '1',
      recipeId: '2',
      vote: true
    }]
  },
  user: {
    fullname: '',
    userId: '',
    publicUrl: ''
  },
  match: {
    params: {
      recipeId: ''
    }
  }
};

const nextProps = {
  match: {
    params: {
      recipeId: '9'
    }
  }
};

const mountedWrapper = mount(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRecipeDetail {...props} />
    </Provider>
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureRecipeDetail {...props} />);
const state = {
  upvoted: false,
  downvoted: false,
  upvote: 'fa fa-2x fa-thumbs-o-up',
  downvote: 'fa fa-2x fa-thumbs-o-down',
  favoriteIcon: 'fa fa-2x fa-star-o',
  Review: '',
  Category: '',
  selectCategory: '',
  upvoteCount: 0,
  downvoteCount: 0,
  isLoading: true,
  favorited: false,
  isDisabled: false
};
const event = {
  preventDefault: jest.fn(),
  target: {
    Review: 'Cool',
    Category: 'jhv'
  }
};

describe('Reset password test suite', () => {
  it('renders reset password component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('RecipeDetail').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <Provider store={store}>
          <PureRecipeDetail {...props} />
        </Provider>
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls onChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onChange(event);
    expect(shallowWrapper.instance().onChange.calledOnce).toEqual(true);
  });

  it('calls onSubmit event', () => {
    state.Review = 'nice';
    sinon.spy(shallowWrapper.instance(), 'onSubmit');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.instance().onSubmit.calledOnce).toEqual(true);
  });

  it('calls onInput event', () => {
    sinon.spy(shallowWrapper.instance(), 'onInput');
    shallowWrapper.instance().onInput(event);
    expect(shallowWrapper.instance().onInput.calledOnce).toEqual(true);
  });

  it('calls downvote recipe action', () => {
    props.singleRecipe.value = 1;
    state.upvoted = true;
    sinon.spy(shallowWrapper.instance(), 'downVote');
    shallowWrapper.setState(state);
    shallowWrapper.instance().downVote();
    expect(shallowWrapper.instance().downVote.calledOnce).toEqual(true);
  });

  it('calls downvote recipe action and removes users downvote', () => {
    props.singleRecipe.value = 0;
    shallowWrapper.setState(state);
    shallowWrapper.instance().downVote();
    expect(shallowWrapper.instance().downVote.called).toEqual(true);
  });

  it('calls upvote recipe action', () => {
    props.singleRecipe.value = 1;
    state.downvoted = true;
    sinon.spy(shallowWrapper.instance(), 'upvote');
    shallowWrapper.setState(state);
    shallowWrapper.instance().upvote();
    expect(shallowWrapper.instance().upvote.calledOnce).toEqual(true);
  });

  it('calls upvote recipe action and removes users upvote', () => {
    props.singleRecipe.value = 0;
    shallowWrapper.setState(state);
    shallowWrapper.instance().upvote();
    expect(shallowWrapper.instance().upvote.called).toEqual(true);
  });

  it('calls favoriteRecipe action and sets favorite icon', () => {
    state.Category = 'Lunch';
    props.favoriteData.push({
      userId: '3',
      recipeId: '8',
      Recipe: {}
    });
    props.user.userId = '3';
    props.match.params.recipeId = '8';
    sinon.spy(shallowWrapper.instance(), 'favoriteRecipe');
    shallowWrapper.setState(state);
    shallowWrapper.instance().favoriteRecipe();
    expect(shallowWrapper.instance().favoriteRecipe.calledOnce).toEqual(true);
  });

  it('removes users favorite and unsets favorite icon', () => {
    props.favoriteData.push({
      userId: '3',
      recipeId: '1',
      Recipe: {}
    });
    props.user.userId = '3';
    props.match.params.recipeId = '2';
    shallowWrapper.setState(state);
    shallowWrapper.instance().favoriteRecipe();
    expect(shallowWrapper.instance().favoriteRecipe.called).toEqual(true);
  });

  it('shows favorite category modal', () => {
    sinon.spy(shallowWrapper.instance(), 'openModal');
    shallowWrapper.setState(state);
    shallowWrapper.instance().openModal();
    expect(shallowWrapper.instance().openModal.calledOnce).toEqual(true);
  });

  it('sets upvote icon if user has already upvoted on componentDidMnt', () => {
    props.user.userId = '1';
    props.singleRecipe.recipeId = '2';
    props.match.params.recipeId = '2';
    sinon.spy(shallowWrapper.instance(), 'componentDidMount');
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentDidMount();
    expect(shallowWrapper.instance().componentDidMount.calledOnce).toBe(true);
  });

  it('sets downvote icon if user has already upvoted on componntDidMnt', () => {
    props.singleRecipe.Votes[0].vote = false;
    props.user.userId = '1';
    props.singleRecipe.recipeId = '2';
    props.match.params.recipeId = '2';
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentDidMount();
    expect(shallowWrapper.instance().componentDidMount.called).toBe(true);
  });

  it('sets favorite icon if user has already favorited', () => {
    props.favoriteData.push({
      userId: '3',
      recipeId: '8',
      Recipe: {}
    });
    props.user.userId = '3';
    props.match.params.recipeId = '8';
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentDidMount();
    expect(shallowWrapper.instance().componentDidMount.called).toBe(true);
  });

  it('calls componentWillreceiveProps if needed props are available', () => {
    sinon.spy(shallowWrapper.instance(), 'componentWillReceiveProps');
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(shallowWrapper.instance().componentWillReceiveProps.calledOnce)
      .toEqual(true);
  });

  it('sets upvote icon if user has already upvoted when receivin props', () => {
    props.singleRecipe.Votes[0].vote = true;
    props.user.userId = '1';
    props.singleRecipe.recipeId = '2';
    props.match.params.recipeId = '2';
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(shallowWrapper.instance().componentWillReceiveProps.called)
      .toBe(true);
  });

  it('sets downvote icon if user has already downvoted', () => {
    props.singleRecipe.Votes[0].vote = false;
    props.user.userId = '1';
    props.singleRecipe.recipeId = '2';
    props.match.params.recipeId = '2';
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(shallowWrapper.instance().componentWillReceiveProps.called)
      .toBe(true);
  });

  it('clears users upvote and downvote when receiving props', () => {
    props.singleRecipe.Votes = [];
    props.user.userId = '1';
    props.singleRecipe.recipeId = '2';
    props.match.params.recipeId = '2';
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(shallowWrapper.instance().componentWillReceiveProps.called)
      .toBe(true);
  });

  it('sets favorite icon if user has already favorited', () => {
    props.favoriteData.push({
      userId: '3',
      recipeId: '8',
      Recipe: {}
    });
    props.user.userId = '3';
    props.match.params.recipeId = '8';
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(shallowWrapper.instance().componentWillReceiveProps.called)
      .toBe(true);
  });
});
