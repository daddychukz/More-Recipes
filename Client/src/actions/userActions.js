import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import * as types from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


export const signUp = user => (dispatch) => {
  return axios.post('/api/v1/users/signup', user).then((response) => {
    toastr.success(response.data.Message);
    dispatch({
      type: types.CREATE_USER,
      payload: user
    });
  });
};

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

export const resetPasswordRequestAction = serverRes => ({
  type: types.RESET_USER_PASSWORD_REQUEST,
  payload: serverRes
});

export const resetPasswordAction = serverRes => ({
  type: types.RESET_USER_PASSWORD,
  payload: serverRes
});

export const getUserProfileAction = serverRes => ({
  type: types.GET_USER_PROFILE,
  payload: serverRes
});

export const updateUserProfileAction = serverRes => ({
  type: types.EDIT_USER_PROFILE,
  payload: serverRes
});

export const signIn = user => (dispatch) => {
  return axios.post('/api/v1/users/signin', user).then((response) => {
    toastr.success(response.data.message);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    dispatch({
      type: types.USER_LOGGED_IN,
      payload: user
    });
    localStorage.setItem('user', jwt.decode(token).userId);
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 */
export const getUserProfile = () => {
  return (dispatch) => {
    return axios.get('/api/v1/user/profile/')
      .then((response) => {
        dispatch(getUserProfileAction(response.data));
      })
      .catch(() => {});
  };
};

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 * @param { object } user
 */
export const updateUserProfile = (user) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/profile/edit', user)
      .then((response) => {
        dispatch(updateUserProfileAction(response.data));
      })
      .catch(() => {});
  };
};

/**
 * @export { function } resetPasswordRequest
 * @param { object } email
 * @returns { object } action type and server response
 */
export const resetPasswordRequest = (email) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/reset_password_request', email)
      .then((response) => {
        dispatch(resetPasswordRequestAction(response.data));
      });
  };
};

/**
 * @export { function } resetPassword
 * @param { object } userData
 * @returns { object } action type and server response
 */
export const resetPassword = (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/reset-password', userData)
      .then((response) => {
        toastr.success(response.data.message);
        dispatch(resetPasswordAction(response.data));
      });
  };
};
