import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';


export const validateUserTokenAction = serverRes => ({
  type: types.VALIDATE_USER_TOKEN,
  payload: serverRes
});

/**
 * @export { function } validateToken
 * @param { object } token
 * @returns { object } action type and server response
 */
export const validateToken = (token) => {
  return (dispatch) => {
    return axios.post('/api/v1/validate-token', { token })
      .then((response) => {
        dispatch(validateUserTokenAction(response.data));
      });
  };
};
