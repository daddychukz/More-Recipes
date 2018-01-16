import * as types from '../actions/types';

const getRecipeReducer = (state = [], action) => {
  switch (action.type) {
  case types.GET_POPULAR_RECIPE:
    return action.payload;
  default:
    return state;
  }
};

export default getRecipeReducer;
