import * as types from '../actions/types';

const initialState = {
  pagination: {},
  recipes: []
};

/**
 * @description Reducer that handles CRUD actions on recipes
 *
 * @param {object} state initial state for recipeOperations section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {object} new state of recipeOperations section of the store
 */
const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.CREATE_RECIPE:
    return Object.assign({}, state, {
      recipes: state.recipes.concat(action.payload),
      pagination: Object.assign({}, state.pagination, {
        totalCount: state.pagination.totalCount + 1
      })
    });
  case types.GET_USER_RECIPES:
    return action.payload;
  case types.UPDATE_USER_RECIPE:
    return Object.assign({}, state, {
      recipes: action.payload
    });
  case types.DELETE_USER_RECIPE:
    return Object.assign({}, state, {
      pagination: action.payload.pagination,
      recipes: action.payload.recipes.rows
    });
  default:
    return state;
  }
};

export default recipeReducer;
