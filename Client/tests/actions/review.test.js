import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../src/actions/types';
import mockData from '../mocks/reviewData';
import {
  viewAllReviews,
  reviewRecipe
} from '../../src/actions/reviewActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test for Review action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch action to add a review to a recipe', (done) => {
    moxios.stubRequest('/api/v1/recipes/851e6aef-192a-46a3-b6e4-a65b681c/reviews', {
      status: 201,
      response: mockData.addReviewResponse
    });

    const expectedActions = [
      {
        type: types.REVIEW_RECIPE,
        payload: mockData.addReviewResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(reviewRecipe('851e6aef-192a-46a3-b6e4-a65b681c', 'Nice'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to get all reviews of a recipe', (done) => {
    moxios.stubRequest('/api/v1/reviews/851e6aef-192a-46a3-b6e4-a65b681c', {
      status: 200,
      response: mockData.getReviewsResponse
    });

    const expectedActions = [
      {
        type: types.SHOW_REVIEWS,
        payload: mockData.getReviewsResponse.reviews
      }
    ];
    const store = mockStore({});

    return store.dispatch(viewAllReviews('851e6aef-192a-46a3-b6e4-a65b681c'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
