import * as types from '../actions/types';

const voteReducer = (state = {}, action) => {
  switch (action.type) {
  case types.UPVOTE_RECIPE:
    return Object.assign({}, state, action.payload);
  case types.DOWNVOTE_RECIPE:
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
};

export default voteReducer;
