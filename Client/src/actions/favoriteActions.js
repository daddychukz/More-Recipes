import axios from 'axios';
import * as types from './types';

export const upvoteRecipeAction = serverRes => ({
  type: types.UPVOTE_RECIPE,
  payload: serverRes
});

export const addToFavoriteAction = serverRes => ({
  type: types.ADD_TO_FAVORITES,
  payload: serverRes
});

export const getSingleFavoriteAction = serverRes => ({
  type: types.GET_SINGLE_FAVORITE,
  payload: serverRes
});

export const getUserFavoriteAction = serverRes => ({
  type: types.GET_ALL_FAVORITE,
  payload: serverRes
});

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 */

export const upvoteRecipe = (recipeId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}/upvote`)
      .then((response) => {
        dispatch(upvoteRecipeAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addToFavorites = (recipeId, category) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}`, category)
      .then((response) => {
        dispatch(addToFavoriteAction(response.data));
      });
  };
};

export const getSingleFavorite = (recipeId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${recipeId}`)
      .then((response) => {
        dispatch(getSingleFavoriteAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserFavorite = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${userId}/recipes`)
      .then((response) => {
        dispatch(getUserFavoriteAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
