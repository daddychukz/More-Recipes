import * as types from '../actions/types';

/**
 * @description Reducer that handles popularRecipes actions
 *
 * @param {array} state initial state for popularRecipe section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {array} new state of popularRecipe section of the store
 */
const popularRecipeReducer = (state = [], action) => {
  switch (action.type) {
  case types.GET_POPULAR_RECIPE:
    return action.payload;
  default:
    return state;
  }
};

export default popularRecipeReducer;
