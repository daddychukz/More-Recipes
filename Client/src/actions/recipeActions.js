import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';


export const addRecipe = recipe => (dispatch) => {
  return axios.post('http://localhost:5000/api/v1/recipes', recipe).then((response) => {
    toastr.success('Recipe Successfully Created');
    console.log(response.data);
    dispatch({
      type: types.CREATE_RECIPE,
      payload: recipe
    });
  });
};

export const viewAllRecipes = () => (dispatch) => {
  return axios.get('http://localhost:5000/api/v1/recipes');
};

export const viewSingleRecipe = recipeId => (dispatch) => {
  return axios.get(`http://localhost:5000/api/v1/recipes/${ recipeId}`);
};
