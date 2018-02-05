import * as types from '../actions/types';

const initialState = {
  pagination: {},
  recipes: []
};

/**
 * @description Reducer that handles getAllRecipes actions
 *
 * @param {object} state initial state for allRecipe section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {object} new state of allRecipe section of the store
 */
const getAllRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.GET_ALL_RECIPES:
    return action.payload;
  default:
    return state;
  }
};

export default getAllRecipeReducer;
