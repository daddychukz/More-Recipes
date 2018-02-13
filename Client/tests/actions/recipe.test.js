import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../src/actions/types';
import mockData from '../mocks/recipeData';
import {
  addRecipe,
  viewAllRecipes,
  viewSingleRecipe,
  getUserRecipes,
  updateUserRecipe,
  deleteUserRecipe,
  getPopularRecipes
} from '../../src/actions/recipeActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test for recipes action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch action to add a new recipe', (done) => {
    moxios.stubRequest('/api/v1/recipes', {
      status: 201,
      response: mockData.addRecipeResponse
    });

    const expectedActions = [
      {
        type: types.CREATE_RECIPE,
        payload: mockData.addRecipeResponse.recipe
      }
    ];
    const store = mockStore({});

    return store.dispatch(addRecipe(mockData.addRecipeRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to get all recipe', (done) => {
    moxios.stubRequest('/api/v1/recipes?limit=5&offset=0&searchString=', {
      status: 200,
      response: mockData.getAllRecipeResponse
    });

    const expectedActions = [
      {
        type: types.GET_ALL_RECIPES,
        payload: mockData.getAllRecipeResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(viewAllRecipes(5, 0, ''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to get a single recipe', (done) => {
    moxios.stubRequest('/api/v1/recipes/f871151a-6f33-44c1-8ad3-3b00b91d57fe', {
      status: 200,
      response: mockData.getSingleRecipeResponse
    });

    const expectedActions = [
      {
        type: types.GET_SINGLE_RECIPE,
        payload: mockData.getSingleRecipeResponse.recipe
      }
    ];
    const store = mockStore({});

    return store.dispatch(viewSingleRecipe('f871151a-6f33-44c1-8ad3-3b00b91d57fe'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to get all recipes of a user', (done) => {
    moxios.stubRequest('/api/v1/recipes/myrecipes?limit=5&offset=0', {
      status: 200,
      response: mockData.getUserRecipeResponse
    });

    const expectedActions = [
      {
        type: types.GET_USER_RECIPES,
        payload: mockData.getUserRecipeResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(getUserRecipes(5, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to update recipe of a user', (done) => {
    moxios.stubRequest('/api/v1/recipe/f871151a-6f33-44c1-8ad3-3b00b91d57fe', {
      status: 200,
      response: mockData.updateRecipeResponse
    });

    const expectedActions = [
      {
        type: types.UPDATE_USER_RECIPE,
        payload: mockData.updateRecipeResponse.updatedRecipe
      }
    ];
    const store = mockStore({});

    return store.dispatch(updateUserRecipe('f871151a-6f33-44c1-8ad3-3b00b91d57fe', mockData.addRecipeRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to delete recipe of a user', (done) => {
    moxios.stubRequest('/api/v1/recipes/f871151a-6f33-44c1-8ad3-3b00b91d57fe', {
      status: 200,
      response: mockData.getAllRecipeResponse
    });

    const expectedActions = [
      {
        type: types.DELETE_USER_RECIPE,
        payload: mockData.getAllRecipeResponse
      }
    ];
    const store = mockStore({});

    return store.dispatch(deleteUserRecipe('f871151a-6f33-44c1-8ad3-3b00b91d57fe'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch action to get popular recipes', (done) => {
    moxios.stubRequest('/api/v1/recipe?sort=upvotes&order=des', {
      status: 200,
      response: mockData.getPopularRecipesResponse
    });

    const expectedActions = [
      {
        type: types.GET_POPULAR_RECIPE,
        payload: mockData.getPopularRecipesResponse.recipes
      }
    ];
    const store = mockStore({});

    return store.dispatch(getPopularRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
