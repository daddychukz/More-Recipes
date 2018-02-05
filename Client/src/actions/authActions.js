import axios from 'axios';
import * as types from './types';

/**
 * Action creator
 * @export { function } validateUserTokenAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and server response
 */
export const validateUserTokenAction = serverResponse => ({
  type: types.VALIDATE_USER_TOKEN,
  payload: serverResponse
});

/**
 * @export { function } validateToken
 *
 * @param { object } token
 * @returns { object } of Token state
 */
export const validateToken = (token) => {
  return (dispatch) => {
    return axios.post('/api/v1/validate-token', { token })
      .then((response) => {
        dispatch(validateUserTokenAction(response.data));
      });
  };
};
