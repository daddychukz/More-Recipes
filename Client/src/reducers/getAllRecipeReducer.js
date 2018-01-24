import * as types from '../actions/types';

const initialState = {
  pagination: {},
  recipes: []
};

const getAllRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.GET_ALL_RECIPES:
    return action.payload;
  default:
    return state;
  }
};

export default getAllRecipeReducer;
