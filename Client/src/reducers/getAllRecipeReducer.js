import * as types from '../actions/types';

const getAllRecipeReducer = (state = {}, action) => {
  switch (action.type) {
  case types.GET_ALL_RECIPES:
    return action.payload;
  default:
    return state;
  }
};

export default getAllRecipeReducer;
