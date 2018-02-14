import axios from 'axios';
import toastr from 'toastr';
import {
  addToFavoriteAction,
  getUserFavoriteAction,
  searchUserFavoriteAction
} from './creators/favoriteActionCreators';

/**
 * @export { function } addToFavorites
 *
 * @param {any} recipeId
 * @param {any} category
 *
 * @returns { object } resolves with success message and favorite data
 */
export const addToFavorites = (recipeId, category) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}`, category)
      .then((response) => {
        dispatch(addToFavoriteAction(response.data));
        toastr.success(response.data.message);
      }).catch(error => toastr.error(error.response.data.message));
  };
};

/**
 * @export { function } getUserFavorite
 *
 * @param {any} userId
 *
 * @returns { object } resolves with all user favorite recipes
 */
export const getUserFavorite = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${userId}/recipes`)
      .then((response) => {
        dispatch(getUserFavoriteAction(response.data.favoriteRecipe));
      })
      .catch(() => {});
  };
};

/**
 * @export { function } searchUserFavorite
 *
 * @param {any} limit
 * @param {any} offset
 * @param {any} searchString
 *
 * @returns { object } resolves with searched favorite recipe
 */
export const searchUserFavorite = (limit, offset, searchString) => {
  return (dispatch) => {
    return axios.get(
      `/api/v1/search/favorites?limit=${limit}&offset=${offset}&searchString=${searchString}`
    )
      .then((response) => {
        dispatch(searchUserFavoriteAction(response.data));
      });
  };
};
