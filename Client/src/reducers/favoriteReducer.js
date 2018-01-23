import * as types from '../actions/types';

const favoriteReducer = (state = [], action) => {
  switch (action.type) {
  case types.ADD_TO_FAVORITES:
    if (action.payload) {
      return [...state,
        Object.assign({}, action.payload)
      ];
    } else {
      return [
        ...state.slice(0, state.length - 1)
      ];
    }
  case types.GET_SINGLE_FAVORITE:
    return action.payload;
  case types.GET_ALL_FAVORITE:
    return action.payload;
  case types.SEARCH_USER_FAVORITES:
    return action.payload.searchResult;

  default:
    return state;
  }
};

export default favoriteReducer;
