import * as types from '../actions/types';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_USER:
      return [...state,
        Object.assign({}, action.user)
      ];
    case types.USER_LOGGED_IN:
      return [...state,
        Object.assign({}, action.user)
      ];

    default:
      return state;
  }
};

export default userReducer;
