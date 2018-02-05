import * as types from '../actions/types';

/**
 * @description Reducer that handles reviews actions
 *
 * @param {array} state initial state for reviews section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {array} new state of reviews section of the store
 */
const reviewReducer = (state = [], action) => {
  switch (action.type) {
  case types.REVIEW_RECIPE:
    return [...state,
      Object.assign({}, action.payload)
    ];
  case types.SHOW_REVIEWS:
    return action.payload;
  default:
    return state;
  }
};

export default reviewReducer;
