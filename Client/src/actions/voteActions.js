import axios from 'axios';
import {
  upvoteRecipeAction,
  downvoteRecipeAction,
} from './creators/recipeActionCreators';

/**
 * @description dispatch action to upvote a recipe
 *
 * @export { function } upvoteRecipe
 *
 * @param { string } recipeId
 *
 * @returns { object } resolves axios promise with success message
 */
export const upvoteRecipe = (recipeId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}/upvote`)
      .then((response) => {
        dispatch(upvoteRecipeAction(response.data));
      })
      .catch(() => {});
  };
};

/**
 * @description dispatch action to downvote a recipe
 *
 * @export { function } downvoteRecipe
 *
 * @param { string } recipeId
 *
 * @returns { object } resolves axios promise with success message
 */
export const downvoteRecipe = (recipeId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}/downvote`)
      .then((response) => {
        dispatch(downvoteRecipeAction(response.data));
      })
      .catch(() => {});
  };
};
