import mockData from '../mocks/recipeData';
import * as types from '../../src/actions/types';
import recipeReducer from '../../src/reducers/singleRecipeReducer';

describe('Single Recipe Reducers', () => {
  it('should return proper initial state', (done) => {
    expect(recipeReducer(undefined, {})).toEqual({});
    done();
  });

  it(`gets a single recipe when action of type GET_SINGLE_RECIPE
  is called`, (done) => {
    const action = {
      type: types.GET_SINGLE_RECIPE,
      payload: mockData.getSingleRecipeResponse
    };

    const newState = recipeReducer({}, action);
    expect(newState.recipe.recipeId)
      .toEqual('434c71b3-04a1-44bb-abe6-11badced59c4');
    done();
  });
});

describe('Upvote Recipe Reducers', () => {
  it('upvotes a recipe when action of type UPVOTE_RECIPE is called', (done) => {
    const action = {
      type: types.UPVOTE_RECIPE,
      payload: { value: 1 }
    };

    const newState = recipeReducer({}, action);
    expect(newState.value).toEqual(1);
    done();
  });

  it('upvotes a recipe when action of type UPVOTE_RECIPE is called', (done) => {
    const action = {
      type: types.UPVOTE_RECIPE,
      payload: { value: 0 }
    };

    const newState = recipeReducer({}, action);
    expect(newState.value).toEqual(0);
    done();
  });
});

describe('Downvote Recipe Reducers', () => {
  it(`downvotes a recipe when action of type DOWNVOTE_RECIPE
  is called`, (done) => {
    const action = {
      type: types.DOWNVOTE_RECIPE,
      payload: { value: 1 }
    };

    const newState = recipeReducer({}, action);
    expect(newState.value).toEqual(1);
    done();
  });

  it(`downvotes a recipe when action of type DOWNVOTE_RECIPE
  is called`, (done) => {
    const action = {
      type: types.DOWNVOTE_RECIPE,
      payload: { value: 0 }
    };

    const newState = recipeReducer({}, action);
    expect(newState.value).toEqual(0);
    done();
  });
});
