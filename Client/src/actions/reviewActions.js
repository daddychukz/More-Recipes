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

export const viewAllReviews = () => (dispatch) => {
  return axios.get('/api/v1/reviews');
};
