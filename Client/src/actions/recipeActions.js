import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';
import {
  viewAllRecipesAction,
  viewSingleRecipeAction,
  getUserRecipesAction,
  updateUserRecipeAction,
  deleteUserRecipeAction,
  getPopularRecipesAction
} from './creators/recipeActionCreators';

/**
 * @export { function } addRecipe
 *
 * @description it dispatch actions to add a new recipe
 *
 * @param { object } recipe
 *
 * @returns { object } recipe added
 */
export const addRecipe = recipe => (dispatch) => {
  return axios.post('/api/v1/recipes', recipe).then((response) => {
    toastr.success('Recipe Successfully Created');
    dispatch({
      type: types.CREATE_RECIPE,
      payload: response.data.recipe
    });
  });
};

/**
 * @description dispatch action to get all recipes
 *
 * @export { function } viewAllRecipes
 *
 * @param { number } limit
 * @param { number } offset
 * @param { string } searchString
 *
 * @returns { object } resolves axios promise with all recipes
 */
export const viewAllRecipes = (limit, offset, searchString) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes?limit=${limit}&offset=${offset}&searchString=${searchString}`)
      .then((response) => {
        dispatch(viewAllRecipesAction(response.data));
      });
  };
};

/**
 * @description dispatch action to get a recipe
 *
 * @export { function } viewSingleRecipe
 *
 * @param { string } recipeId
 *
 * @returns { object } resolves axios promisen with a recipe information
 * @returns { error } error messages
 */
export const viewSingleRecipe = (recipeId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes/${recipeId}`)
      .then((response) => {
        dispatch(viewSingleRecipeAction(response.data.recipe));
      })
      .catch((error) => {
        if (error.response.data.message === 'Record not Found!') {
          window.location.replace('/error');
        } else if (error.response.data.error.message === 'Invalid Recipe ID') {
          window.location.replace('/error');
        }
      });
  };
};

/**
 * @description dispatch action to get recipes added by a user
 *
 * @export { function } getUserRecipes
 *
 * @param { number } limit
 * @param { number } offset
 *
 * @returns { array } resolves axios promise with user recipes
 */
export const getUserRecipes = (limit, offset) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes/myrecipes?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch(getUserRecipesAction(response.data));
      })
      .catch(() => {});
  };
};

/**
 * @description dispact action to update a user recipe
 *
 * @export { function } updateUserRecipe
 *
 * @param { string } recipeID
 * @param { object } recipe
 *
 * @returns { object } resolves axios promise with updated recipe
 */
export const updateUserRecipe = (recipeID, recipe) => {
  return (dispatch) => {
    return axios.put(`/api/v1/recipe/${recipeID}`, recipe)
      .then((response) => {
        dispatch(updateUserRecipeAction(response.data.updatedRecipe));
      })
      .catch(() => {});
  };
};

/**
 * @description dispatch action to delete a users recipe
 *
 * @export { function } deleteUserRecipe
 *
 * @param { string } recipeID
 *
 * @returns { object } resolves axios promise with success message
 */
export const deleteUserRecipe = (recipeID) => {
  return (dispatch) => {
    return axios.delete(`/api/v1/recipes/${recipeID}`)
      .then((response) => {
        dispatch(deleteUserRecipeAction(response.data));
      })
      .catch(() => {});
  };
};

/**
 * @description dispatch action to get popular recipes
 *
 * @export { function } getPopularRecipes
 *
 * @param {any} null
 *
 * @returns { array } resolves axios promise with popular recipes
 */
export const getPopularRecipes = () => {
  return (dispatch) => {
    return axios.get('/api/v1/recipe?sort=upvotes&order=des')
      .then((response) => {
        dispatch(getPopularRecipesAction(response.data.recipes));
      })
      .catch(() => {});
  };
};
