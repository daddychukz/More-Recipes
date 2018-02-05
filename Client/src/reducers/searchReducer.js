import * as types from '../actions/types';

/**
 * @description Reducer that handles search actions
 *
 * @param {object} state initial state for search section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {object} new state of search section of the store
 */
const searchReducer = (state = {}, action) => {
  switch (action.type) {
  case types.SEARCH_ALL_RECIPES:
    return action.payload;
  default:
    return state;
  }
};

export default searchReducer;
