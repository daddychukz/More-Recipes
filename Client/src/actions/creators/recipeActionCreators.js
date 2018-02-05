import * as types from '../types';

/**
 * @description view all recipes action creator
 *
 * @export { function } viewAllRecipesAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const viewAllRecipesAction = serverResponse => ({
  type: types.GET_ALL_RECIPES,
  payload: serverResponse
});

/**
 * @description get user recipes action creator
 *
 * @export { function } getUserRecipesAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const getUserRecipesAction = serverResponse => ({
  type: types.GET_USER_RECIPES,
  payload: serverResponse
});

/**
 * @description get single recipe action creator
 *
 * @export { function } viewSingleRecipeAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const viewSingleRecipeAction = serverResponse => ({
  type: types.GET_SINGLE_RECIPE,
  payload: serverResponse
});

/**
 * @description upvote recipe action creator
 *
 * @export { function } upvoteRecipeAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const upvoteRecipeAction = serverResponse => ({
  type: types.UPVOTE_RECIPE,
  payload: serverResponse
});

/**
 * @description downvote recipe action creator
 *
 * @export { function } downvoteRecipeAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const downvoteRecipeAction = serverResponse => ({
  type: types.DOWNVOTE_RECIPE,
  payload: serverResponse
});

/**
 * @description update recipe action creator
 *
 * @export { function } updateUserRecipeAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const updateUserRecipeAction = serverResponse => ({
  type: types.UPDATE_USER_RECIPE,
  payload: serverResponse
});

/**
 * @description delete recipe action creator
 *
 * @export { function } deleteUserRecipeAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const deleteUserRecipeAction = serverResponse => ({
  type: types.DELETE_USER_RECIPE,
  payload: serverResponse
});

/**
 * @description get popular recipe action creator
 *
 * @export { function } getPopularRecipesAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const getPopularRecipesAction = serverResponse => ({
  type: types.GET_POPULAR_RECIPE,
  payload: serverResponse
});
