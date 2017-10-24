import * as types from '../actions/types';

const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_RECIPE:
      return [...state,
        Object.assign({}, action.recipe)
      ];

    default:
      return state;
  }
};

export default recipeReducer;
