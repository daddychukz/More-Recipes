import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import * as types from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


export const signUp = user => (dispatch) => {
  return axios.post('/api/v1/users/signup', user).then((response) => {
    console.log(response.data);
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
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    toastr.success(response.data.message);
    console.log(response.data);
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
 * @param { object } userId
 */
export const getUserProfile = (userId) => {
  return (dispatch) => {
    return axios.get('/api/v1/user/profile/')
      .then((response) => {
        dispatch(getUserProfileAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 * @param { object } userId
 * @param { object } data
 */
export const updateUserProfile = (userId, data) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/profile/edit', data)
      .then((response) => {
        dispatch(updateUserProfileAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
 * @param { object } data
 * @returns { object } action type and server response
 */
export const resetPassword = (data) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/reset-password', data)
      .then((response) => {
        dispatch(resetPasswordAction(response.data));
      });
  };
};
