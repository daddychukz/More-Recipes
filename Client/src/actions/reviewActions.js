import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';


export const reviewRecipe = (recipeId, reviews) => (dispatch) => {
  return axios.post(`/api/v1/recipes/${recipeId}/reviews`, reviews).then((response) => {
    toastr.success('Review Successfully added');
    console.log(response.data.rev);
    dispatch({
      type: types.REVIEW_RECIPE,
      payload: reviews
    });
  });
};

export const viewAllReviewsAction = serverRes => ({
  type: types.SHOW_REVIEWS,
  payload: serverRes
});

export const viewAllReviews = () => {
  return (dispatch) => {
    return axios.get('/api/v1/reviews')
      .then((response) => {
        dispatch(viewAllReviewsAction(response.data.reviews));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
