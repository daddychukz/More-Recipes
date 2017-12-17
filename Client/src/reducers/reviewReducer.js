import * as types from '../actions/types';

const reviewReducer = (state = [], action) => {
  switch (action.type) {
  case types.REVIEW_RECIPE:
    return action.payload;
  case types.SHOW_REVIEWS:
    return action.payload;
  default:
    return state;
  }
};

export default reviewReducer;
