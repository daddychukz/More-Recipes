import isEmpty from 'lodash/isEmpty';
import * as types from '../actions/types';

/**
 * @description Reducer that handles user authentication
 *
 * @param {Object} state initial state for the auth section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the auth section of the store
 */
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
