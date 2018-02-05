import * as types from '../actions/types';

/**
 * @description Reducer that handles singleRecipe actions
 *
 * @param {object} state initial state for singleRecipe section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {object} new state of singleRecipe section of the store
 */
const singleRecipeReducer = (state = {}, action) => {
  switch (action.type) {
  case types.GET_SINGLE_RECIPE:
    return Object.assign({}, state, action.payload);
  case types.UPVOTE_RECIPE:
    if (action.payload.value === 1) {
      return Object.assign({}, state, {
        upvotes: state.upvotes + 1, value: action.payload.value });
    }
    return Object.assign({}, state, {
      upvotes: state.upvotes - 1, value: action.payload.value });
  case types.DOWNVOTE_RECIPE:
    if (action.payload.value === 1) {
      return Object.assign({}, state, {
        downvotes: state.downvotes + 1, value: action.payload.value });
    }
    return Object.assign({}, state, {
      downvotes: state.downvotes - 1, value: action.payload.value });
  default:
    return state;
  }
};

export default singleRecipeReducer;
