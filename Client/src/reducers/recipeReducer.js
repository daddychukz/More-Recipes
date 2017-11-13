import * as types from '../actions/types';

const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_RECIPE:
      return [...state,
        Object.assign({}, action.recipe)
      ];
    case types.GET_ALL_RECIPES:
      return action.payload;
    case types.GET_SINGLE_RECIPE:
      return action.payload;
    case types.UPVOTE_RECIPE:
      return action.payload;
    case types.DOWNVOTE_RECIPE:
      return action.payload;
    case types.REVIEW_RECIPE:
      return action.payload;
    case types.SHOW_REVIEWS:
      return action.payload;
    default:
      return state;
  }
};

export default recipeReducer;
