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

//  Create action wrappers

export const viewAllRecipesAction = serverRes => ({
  type: types.GET_ALL_RECIPES,
  payload: serverRes
});

export const getUserRecipesAction = serverRes => ({
  type: types.GET_USER_RECIPES,
  payload: serverRes
});

export const viewSingleRecipeAction = serverRes => ({
  type: types.GET_SINGLE_RECIPE,
  payload: serverRes
});

export const upvoteRecipeAction = serverRes => ({
  type: types.UPVOTE_RECIPE,
  payload: serverRes
});

export const downvoteRecipeAction = serverRes => ({
  type: types.UPVOTE_RECIPE,
  payload: serverRes
});

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 */
export const viewAllRecipes = () => {
  return (dispatch) => {
    return axios.get('/api/v1/recipes')
      .then((response) => {
        dispatch(viewAllRecipesAction(response.data.recipes));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 * @param { object } recipeId
 */
export const viewSingleRecipe = (recipeId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes/${recipeId}`)
      .then((response) => {
        dispatch(viewSingleRecipeAction(response.data.recipe));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 * @param { object } recipeId
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

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 * @param { object } recipeId
 */
export const downvoteRecipe = (recipeId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipes/${recipeId}/downvote`)
      .then((response) => {
        dispatch(downvoteRecipeAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 */
export const getUserRecipes = () => {
  return (dispatch) => {
    return axios.get('/api/v1/recipes/myrecipes')
      .then((response) => {
        dispatch(getUserRecipesAction(response.data.recipes));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
