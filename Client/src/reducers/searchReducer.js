import * as types from '../actions/types';

const searchReducer = (state = [], action) => {
  switch (action.type) {
  case types.SEARCH_ALL_RECIPES:
    return action.payload;
  default:
    return state;
  }
};

export default searchReducer;
