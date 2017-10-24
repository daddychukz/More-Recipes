import isEmpty from 'lodash/isEmpty';
import * as types from '../actions/types';

const authReducer = (state = {
  isAuthenticated: false,
  user: {}
}, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};

export default authReducer;
