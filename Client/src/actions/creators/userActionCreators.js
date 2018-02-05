import * as types from '../types';

/**
 * @description set current user action creator
 *
 * @export { function } setCurrentUser
 *
 * @param { object } user
 *
 * @returns { object } action type and payload
 */
export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

/**
 * @description reset password request action creator
 *
 * @export { function } resetPasswordRequestAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const resetPasswordRequestAction = serverResponse => ({
  type: types.RESET_USER_PASSWORD_REQUEST,
  payload: serverResponse
});

/**
 * @description reset password action creator
 *
 * @export { function } resetPasswordAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const resetPasswordAction = serverResponse => ({
  type: types.RESET_USER_PASSWORD,
  payload: serverResponse
});

/**
 * @description get user profile action creator
 *
 * @export { function } getUserProfileAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const getUserProfileAction = serverResponse => ({
  type: types.GET_USER_PROFILE,
  payload: serverResponse
});

/**
 * @description update user profile action creator
 *
 * @export { function } updateUserProfileAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const updateUserProfileAction = serverResponse => ({
  type: types.EDIT_USER_PROFILE,
  payload: serverResponse
});
