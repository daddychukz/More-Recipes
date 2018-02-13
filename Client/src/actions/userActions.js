import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import * as types from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {
  setCurrentUser,
  getUserProfileAction,
  updateUserProfileAction,
  resetPasswordAction,
  resetPasswordRequestAction
} from './creators/userActionCreators';

/**
 * @description dispatch action to register a user
 * @description dispatch action to set the current user
 *
 * @export { function } signUp
 *
 * @param { object } user
 *
 * @returns { object } resolves axios promise with user information
 * @returns { object } error message
 */
export const signUp = user => (dispatch) => {
  return axios.post('/api/v1/users/signup', user).then((response) => {
    toastr.success(response.data.Message);
    const token = response.data.User.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    dispatch({
      type: types.CREATE_USER,
      payload: response.data.User
    });
  }).catch(error => toastr.error(error.response.data.error.message)
  );
};

/**
 * @description dispatch action to signin a user
 * @description dispatch action to set the current user
 *
 * @export { function } signIn
 *
 * @param { object } user
 *
 * @returns { object } resolves axios promise with user information
 */
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
  });
};

/**
 * @description dispatch action to logout a user
 * @description dispatch action to set the current user
 *
 * @export { function } logOut
 *
 * @param { any } ()
 *
 * @returns { void }
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

/**
 * @description dispatch action to get user profile information
 *
 * @export { function } getUserProfile
 *
 * @param { any } ()
 *
 * @returns { object } resolve axios promise with user information
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
 * @description dispatch action to update user profile
 *
 * @param { object } user
 *
 * @export { function } updateUserProfile
 *
 * @returns { object } resolve axios promise with updated user information
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
 * @description dispatch action to reset password request
 *
 * @export { function } resetPasswordRequest
 *
 * @param { object } email
 *
 * @returns { object } success message
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
 * @description dispatch action to reset user password
 *
 * @export { function } resetPassword
 *
 * @param { object } userData
 *
 * @returns { void }
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
