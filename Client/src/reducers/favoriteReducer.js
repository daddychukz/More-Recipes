import * as types from '../actions/types';

/**
 * @description Reducer that handles favorite actions
 *
 * @param {array} state initial state for the favorite section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {array} new state of the favorite section of the store
 */
const favoriteReducer = (state = [], action) => {
  switch (action.type) {
  case types.ADD_TO_FAVORITES:
    if (action.payload.favorite) {
      return [...state,
        Object.assign({}, action.payload.favorite)
      ];
    }
    return state.filter(item => item.recipeId !== action.payload.prevFavorite.recipeId);
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
