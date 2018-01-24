import * as types from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case types.CREATE_USER:
    return [...state,
      Object.assign({}, action.user)
    ];
  case types.USER_LOGGED_IN:
    return [...state,
      Object.assign({}, action.payload)
    ];
  case types.GET_USER_PROFILE:
    return action.payload;
  case types.EDIT_USER_PROFILE:
    return action.payload;
  case types.VALIDATE_USER_TOKEN:
    return action.payload;
  case types.RESET_USER_PASSWORD:
    return Object.assign({}, state, action.payload);
  case types.RESET_USER_PASSWORD_REQUEST:
    return Object.assign({}, state, action.payload);

  default:
    return state;
  }
};

export default userReducer;
