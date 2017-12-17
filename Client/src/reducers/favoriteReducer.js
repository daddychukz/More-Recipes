import * as types from '../actions/types';

const favoriteReducer = (state = {}, action) => {
  switch (action.type) {
  case types.ADD_TO_FAVORITES:
    return action.payload;
  case types.GET_SINGLE_FAVORITE:
    return action.payload;
  case types.GET_ALL_FAVORITE:
    return action.payload;

  default:
    return state;
  }
};

export default favoriteReducer;
