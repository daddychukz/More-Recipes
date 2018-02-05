import * as types from '../types';

/**
 * Action Creator
 * @export { function } addToFavoriteAction
 *
 * @param {any} serverResponse
 *
 * @returns { object } action type and payload
 */
export const addToFavoriteAction = serverResponse => ({
  type: types.ADD_TO_FAVORITES,
  payload: serverResponse
});

/**
 * Action Creator
 * @export { function } searchUserFavoriteAction
 *
 * @param {any} serverResponse
 *
 * @returns { object } action type and payload
 */
export const searchUserFavoriteAction = serverResponse => ({
  type: types.SEARCH_USER_FAVORITES,
  payload: serverResponse
});

/**
 * Action Creator
 * @export { function } getUserFavoriteAction
 *
 * @param {any} serverResponse
 *
 * @returns { object } action type and payload
 */
export const getUserFavoriteAction = serverResponse => ({
  type: types.GET_ALL_FAVORITE,
  payload: serverResponse
});
