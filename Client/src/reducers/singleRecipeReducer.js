import * as types from '../actions/types';

const singleRecipeReducer = (state = {}, action) => {
  switch (action.type) {
  case types.GET_SINGLE_RECIPE:
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
};

export default singleRecipeReducer;
