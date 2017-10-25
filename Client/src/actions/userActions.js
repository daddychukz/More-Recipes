import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


export const signUp = user => (dispatch) => {
  return axios.post('http://localhost:5000/api/v1/users/signup', user).then((response) => {
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

export const signIn = user => (dispatch) => {
  return axios.post('http://localhost:5000/api/v1/users/signin', user).then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    console.log(response.data);
    dispatch(setCurrentUser(jwt.decode(token)));
    dispatch({
      type: types.USER_LOGGED_IN,
      payload: user
    });
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};


// export function signIn(loginData) {
//   return dispatch => axios.post('http://localhost:5000/api/v1/users/signin', loginData)
//     .then((response) => {
//       dispatch({
//         type: types.USER_LOGGED_IN,
//         payload: loginData
//       });
//     });
// }
