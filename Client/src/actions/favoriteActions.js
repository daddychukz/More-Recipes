import axios from 'axios';
import * as types from './types';

export const addToFavoriteAction = serverRes => ({
  type: types.ADD_TO_FAVORITES,
  payload: serverRes
});

export const getSingleFavoriteAction = serverRes => ({
  type: types.GET_SINGLE_FAVORITE,
  payload: serverRes
});

export const searchUserFavoriteAction = serverRes => ({
  type: types.SEARCH_USER_FAVORITES,
  payload: serverRes
});

export const getUserFavoriteAction = serverRes => ({
  type: types.GET_ALL_FAVORITE,
  payload: serverRes
});

export const addToFavorites = (recipeId, category) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}`, category)
      .then((response) => {
        dispatch(addToFavoriteAction(response.data.favorite));
      });
  };
};

export const getUserFavorite = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${userId}/recipes`)
      .then((response) => {
        dispatch(getUserFavoriteAction(response.data.favoriteRecipe));
      })
      .catch((error) => error);
  };
};

/**
 * @export { function } viewRecipes
 * @param {any} limit
 * @param {any} offset
 * @param {any} searchString
 * @returns { object } action type and server response
 */
export const searchUserFavorite = (limit, offset, searchString) => {
  return (dispatch) => {
    return axios.get(`/api/v1/search/favorites?limit=${limit}&offset=${offset}&searchString=${searchString}`)
      .then((response) => {
        dispatch(searchUserFavoriteAction(response.data));
      });
  };
};
