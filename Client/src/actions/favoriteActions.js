import axios from 'axios';
import * as types from './types';

export const upvoteRecipeAction = serverRes => ({
  type: types.UPVOTE_RECIPE,
  payload: serverRes
});

export const favoriteRecipeAction = serverRes => ({
  type: types.ADD_TO_FAVORITES,
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

export const favoriteRecipe = (recipeId, category) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}`, category)
      .then((response) => {
        dispatch(favoriteRecipeAction(response.data));
      });
  };
};
