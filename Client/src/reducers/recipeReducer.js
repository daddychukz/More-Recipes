import * as types from '../actions/types';

const recipeReducer = (state = [], action) => {
  switch (action.type) {
  case types.GET_USER_RECIPES:
    return action.payload;
  case types.CREATE_RECIPE:
    return [...state,
      Object.assign({}, action.payload)
    ];
  case types.UPDATE_USER_RECIPE:
    return action.payload;
  case types.DELETE_USER_RECIPE:
    return action.payload;
  default:
    return state;
  }
};

export default recipeReducer;
