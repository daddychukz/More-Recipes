import axios from 'axios';

import * as types from './types';


export const signUp = user => (dispatch) => {
  axios.post('http://localhost:5000/api/v1/users/signup', user).then((response) => {
    console.log(response);
    dispatch({
      type: types.CREATE_USER,
      payload: user
    });
  }).catch((err) => {
    console.log(err);
  });
};
