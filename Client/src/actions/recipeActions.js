import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';


export const addRecipe = recipe => (dispatch) => {
  return axios.post('/api/v1/recipes', recipe).then((response) => {
    toastr.success('Recipe Successfully Created');
    console.log(response.data);
    dispatch({
      type: types.CREATE_RECIPE,
      payload: recipe
    });
  });
};


export const viewAllRecipes = () => (dispatch) => {
  return axios.get('/api/v1/recipes');
};

export const viewSingleRecipe = recipeId => (dispatch) => {
  return axios.get(`/api/v1/recipes/${recipeId}`);
};

export const upvoteRecipe = recipeId => (dispatch) => {
  return axios.post(`/api/v1/recipes/${recipeId}/upvote`);
};

export const downvoteRecipe = recipeId => (dispatch) => {
  return axios.post(`/api/v1/recipes/${recipeId}/downvote`);
};

