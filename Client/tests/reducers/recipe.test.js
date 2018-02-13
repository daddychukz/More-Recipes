import mockData from '../mocks/recipeData';
import mockReviewData from '../mocks/reviewData';
import * as types from '../../src/actions/types';
import recipeReducer from '../../src/reducers/recipeReducer';
import getRecipes from '../../src/reducers/getAllRecipeReducer';
import reviewReducer from '../../src/reducers/reviewReducer';
import popularRecipeReducer from '../../src/reducers/popularRecipeReducer';

describe('Recipe Reducers', () => {
  describe('Create Recipe Reducer', () => {
    const initialState = {
      pagination: {},
      recipes: []
    };

    it('should return proper initial state', (done) => {
      expect(recipeReducer(undefined, {})).toEqual(initialState);
      done();
    });

    it('adds recipe data when action of type CREATE_RECIPE is called',
      (done) => {
        const action = {
          type: types.CREATE_RECIPE,
          payload: mockData.addRecipeResponse,
        };

        const newState = recipeReducer(initialState, action);
        expect(newState.recipes).toEqual(action.payload);
        done();
      });

    it('retrieves recipes created by a user when action of type GET_USER_RECIPES is called',
      (done) => {
        const action = {
          type: types.GET_USER_RECIPES,
          payload: mockData.getUserRecipeResponse,
        };

        const newState = recipeReducer(initialState, action);
        expect(newState).toEqual(action.payload);
        done();
      });

    it('updates recipe from the store', (done) => {
      const action = {
        type: types.UPDATE_USER_RECIPE,
        payload: mockData.updateRecipeResponse,
      };

      const newState = recipeReducer(initialState, action);
      expect(newState.recipes).toEqual(action.payload);
      done();
    });

    it('removes recipe from the store', (done) => {
      const action = {
        type: types.DELETE_USER_RECIPE,
        payload: mockData.getUserRecipeResponse,
      };

      const newState = recipeReducer(initialState, action);
      expect(newState.recipes).toEqual(action.payload.recipes.rows);
      done();
    });

    it('get all recipe from the store', (done) => {
      const action = {
        type: types.GET_ALL_RECIPES,
        payload: mockData.getAllRecipeResponse,
      };

      const newState = getRecipes(initialState, action);
      expect(newState.recipes[0].fullname).toEqual(action.payload.recipes[0].fullname);
      done();
    });
  });

  describe('Review Reducer Test Cases', () => {
    it('adds a review when the action type REVIEW_RECIPE is called', (done) => {
      const action = {
        type: types.REVIEW_RECIPE,
        payload: mockReviewData.addReviewResponse,
      };

      const newState = reviewReducer([], action);
      expect(newState[0].User.fullname).toEqual('Adam Eve');
      done();
    });

    it('displays all review when the action type SHOW_REVIEWS is called', (done) => {
      const action = {
        type: types.SHOW_REVIEWS,
        payload: mockReviewData.getReviewsResponse,
      };

      const newState = reviewReducer([], action);
      expect(newState.reviews[0].User.fullname).toEqual('Adam Eve');
      done();
    });
  });

  describe('Popular Recipe Reducer Test Cases', () => {
    it('gets most upvoted recipe when the action type GET_POPULAR_RECIPE is called', (done) => {
      const action = {
        type: types.GET_POPULAR_RECIPE,
        payload: mockData.getPopularRecipesResponse,
      };

      const newState = popularRecipeReducer([], action);
      expect(newState.recipes[0].fullname).toEqual('Adam Eve');
      done();
    });

    it('returns default state', (done) => {
      const action = {
        type: types.GET_POPULAR,
      };

      const newState = popularRecipeReducer([], action);
      expect(newState).toEqual([]);
      done();
    });
  });
});
