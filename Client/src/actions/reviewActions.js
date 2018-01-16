import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';


export const reviewRecipe = (recipeId, reviews) => (dispatch) => {
  return axios.post(`/api/v1/recipes/${recipeId}/reviews`, reviews).then((response) => {
    toastr.success('Review Successfully added');
    dispatch({
      type: types.REVIEW_RECIPE,
      payload: response.data.rev
    });
  });
};

export const viewAllReviewsAction = serverRes => ({
  type: types.SHOW_REVIEWS,
  payload: serverRes
});

export const viewAllReviews = (recipeId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/reviews/${recipeId}`)
      .then((response) => {
        dispatch(viewAllReviewsAction(response.data.reviews));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
