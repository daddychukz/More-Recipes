import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../src/actions/types';
import mockData from '../mocks/favoriteData';
import {
  addToFavorites,
  getUserFavorite,
  searchUserFavorite
} from '../../src/actions/favoriteActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test for favorite action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch action to add a recipe to users favorite', (done) => {
    moxios.stubRequest('/api/v1/recipes/851e6aef-192a-46a3-b6e4-a65b681c', {
      status: 201,
      response: mockData.addToFavoriteResponse
    });

    const expectedActions = [
      {
        type: types.ADD_TO_FAVORITES,
        payload: mockData.addToFavoriteResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(addToFavorites(
      '851e6aef-192a-46a3-b6e4-a65b681c', 'Lunch'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to get favorite recipes of a user', (done) => {
    moxios
      .stubRequest('/api/v1/users/851e6aef-192a-46a3-b6e4-a65b681cb30c/recipes',
        {
          status: 200,
          response: mockData.getFavoriteRecipeResponse
        });

    const expectedActions = [
      {
        type: types.GET_ALL_FAVORITE,
        payload: mockData.getFavoriteRecipeResponse.favoriteRecipe
      }
    ];
    const store = mockStore({});

    return store.dispatch(getUserFavorite(
      '851e6aef-192a-46a3-b6e4-a65b681cb30c'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to search favorite recipes of a user', (done) => {
    const searchString = 'Lunch';
    const limit = 10;
    const offset = 1;
    moxios.stubRequest(`/api/v1/search/favorites?limit=${limit}&offset=${
      offset}&searchString=${searchString}`, {
      status: 200,
      response: mockData.searchUserFavoriteResponse
    });

    const expectedActions = [
      {
        type: types.SEARCH_USER_FAVORITES,
        payload: mockData.searchUserFavoriteResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(searchUserFavorite(10, 1, searchString))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
