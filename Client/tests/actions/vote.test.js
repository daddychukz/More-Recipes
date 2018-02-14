import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../src/actions/types';
import mockData from '../mocks/voteData';
import {
  upvoteRecipe,
  downvoteRecipe
} from '../../src/actions/voteActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test for Vote actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch action to upvote a recipe', (done) => {
    moxios.stubRequest(
      '/api/v1/recipes/851e6aef-192a-46a3-b6e4-a65b681c/upvote',
      {
        status: 201,
        response: mockData.upvoteRecipeResponse
      });

    const expectedActions = [
      {
        type: types.UPVOTE_RECIPE,
        payload: mockData.upvoteRecipeResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(upvoteRecipe('851e6aef-192a-46a3-b6e4-a65b681c'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to upvote a recipe', (done) => {
    moxios.stubRequest(
      '/api/v1/recipes/851e6aef-192a-46a3-b6e4-a65b681c/downvote', {
        status: 201,
        response: mockData.upvoteRecipeResponse
      });

    const expectedActions = [
      {
        type: types.DOWNVOTE_RECIPE,
        payload: mockData.upvoteRecipeResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(downvoteRecipe('851e6aef-192a-46a3-b6e4-a65b681c'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
