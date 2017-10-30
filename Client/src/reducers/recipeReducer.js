import * as types from '../actions/types';

const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_RECIPE:
      return [...state,
        Object.assign({}, action.recipe)
      ];
    case types.GET_ALL_RECIPES:
      return [...state,
        Object.assign({}, action.payload)
      ];

    default:
      return state;
  }
};

export default recipeReducer;
