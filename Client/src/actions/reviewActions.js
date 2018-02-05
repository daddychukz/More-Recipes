import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';

/**
 * @description get all reviews action creator
 *
 * @export { function } viewAllReviewsAction
 *
 * @param { object } serverResponse
 *
 * @returns { object } action type and payload
 */
export const viewAllReviewsAction = serverResponse => ({
  type: types.SHOW_REVIEWS,
  payload: serverResponse
});

/**
 * @description dispatch action to add review to a recipe
 *
 * @export { function } reviewRecipe
 *
 * @param { string } recipeId
 * @param { object } reviews
 *
 * @returns { object } resolves axios promise with recipe review
 */
export const reviewRecipe = (recipeId, reviews) => (dispatch) => {
  return axios.post(`/api/v1/recipes/${recipeId}/reviews`, reviews).then(
    (response) => {
      toastr.success('Review Successfully added');
      dispatch({
        type: types.REVIEW_RECIPE,
        payload: response.data
      });
    });
};

/**
 * @description dispatch action to get reviews for a particular recipe
 *
 * @export { function } viewAllReviews
 *
 * @param { string } recipeId
 *
 * @returns { array } resolves axios promise with recipe reviews
 */
export const viewAllReviews = (recipeId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/reviews/${recipeId}`)
      .then((response) => {
        dispatch(viewAllReviewsAction(response.data.reviews));
      })
      .catch(() => {});
  };
};
