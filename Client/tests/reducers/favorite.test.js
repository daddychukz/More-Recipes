import mockData from '../mocks/favoriteData';
import * as types from '../../src/actions/types';
import recipeReducer from '../../src/reducers/favoriteReducer';

describe('Favorite Recipe Reducer', () => {
  it('should return proper initial state', (done) => {
    expect(recipeReducer(undefined, {})).toEqual([]);
    done();
  });

  it('adds a recipe to favorite when action of type ADD_TO_FAVORITE is called', (done) => {
    const action = {
      type: types.ADD_TO_FAVORITES,
      payload: mockData.addToFavoriteResponse
    };

    const newState = recipeReducer({}, action);
    expect(newState[0].category).toEqual('Lunch');
    done();
  });

  it('adds a recipe to favorite when action of type ADD_TO_FAVORITE is called', (done) => {
    const action = {
      type: types.ADD_TO_FAVORITES,
      payload: {
        message: 'recipe removed',
        prevFavorite: {
          id: 38,
          userId: '054ef146-46ce-40ab-8e93-812facae48db',
          recipeId: '851e6aef-192a-46a3-c6e4-a65b681cb30c',
          category: 'Lunch',
          updatedAt: '2018-02-08T09:01:18.855Z',
          createdAt: '2018-02-08T09:01:18.855Z'
        }
      }
    };

    const newState = recipeReducer(mockData.getFavoriteRecipeResponse.favoriteRecipe, action);
    expect(newState[0].Recipe.fullname).toEqual('Adam Eve');
    done();
  });

  it('gets all user favorite when action of type GET_ALL_FAVORITE is called', (done) => {
    const action = {
      type: types.GET_ALL_FAVORITE,
      payload: mockData.getFavoriteRecipeResponse
    };

    const newState = recipeReducer({}, action);
    expect(newState.favoriteRecipe[0].category).toEqual('Lunch');
    done();
  });

  it('search a user favorite recipes when action of type SEARCH_USER_FAVORITE is called', (done) => {
    const action = {
      type: types.SEARCH_USER_FAVORITES,
      payload: mockData.searchUserFavoriteResponse
    };

    const newState = recipeReducer({}, action);
    expect(newState[0].Recipe.fullname).toEqual('Adam Eve');
    done();
  });
});
