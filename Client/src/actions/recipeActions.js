import axios from 'axios';
import toastr from 'toastr';
import * as types from './types';


export const addRecipe = recipe => (dispatch) => {
  return axios.post('/api/v1/recipes', recipe).then((response) => {
    toastr.success('Recipe Successfully Created');
    dispatch({
      type: types.CREATE_RECIPE,
      payload: response.data.recipe
    });
  });
};

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

export const updateUserRecipeAction = serverRes => ({
  type: types.UPDATE_USER_RECIPE,
  payload: serverRes
});

export const deleteUserRecipeAction = serverRes => ({
  type: types.DELETE_USER_RECIPE,
  payload: serverRes
});

export const getPopularRecipesAction = serverRes => ({
  type: types.GET_POPULAR_RECIPE,
  payload: serverRes
});

export const searchRecipesAction = serverRes => ({
  type: types.SEARCH_ALL_RECIPES,
  payload: serverRes
});

/**
 * @export { function } viewRecipes
 * @param {any} limit
 * @param {any} offset
 * @returns { object } action type and server response
 */
export const viewAllRecipes = (limit, offset) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch(viewAllRecipesAction(response.data));
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
 * @param {any} limit
 * @param {any} offset
 * 
 * @export { function } viewRecipes
 * @returns { object } action type and server response
 */
export const getUserRecipes = (limit, offset) => {
  return (dispatch) => {
    return axios.get(`/api/v1/recipes/myrecipes?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch(getUserRecipesAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } updateUserRecipe
 * @returns { object } action type and server response
 * @param { object } recipeID
 * @param { object } data
 */
export const updateUserRecipe = (recipeID, data) => {
  return (dispatch) => {
    return axios.post(`/api/v1/recipe/${recipeID}`, data)
      .then((response) => {
        dispatch(updateUserRecipeAction(response.data.updatedRecipe));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } deleteUserRecipe
 * @returns { object } action type and server response
 * @param { object } recipeID
 * @param { object } data
 */
export const deleteUserRecipe = (recipeID) => {
  return (dispatch) => {
    return axios.delete(`/api/v1/recipes/${recipeID}`)
      .then((response) => {
        console.log('>>>>>>>>>>>', response.data.recipes);
        dispatch(deleteUserRecipeAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } getPopularRecipes
 * @returns { object } action type and server response
 */
export const getPopularRecipes = () => {
  return (dispatch) => {
    return axios.get('/api/v1/recipe?sort=upvotes&order=des')
      .then((response) => {
        dispatch(getPopularRecipesAction(response.data.recipes));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**
 * @export { function } viewRecipes
 * @param {any} limit
 * @param {any} offset
 * @param {any} searchString
 * @returns { object } action type and server response
 */
export const searchRecipes = (limit, offset, searchString) => {
  return (dispatch) => {
    return axios.get(`/api/v1/search/recipes?limit=${limit}&offset=${offset}&searchString=${searchString}`)
      .then((response) => {
        dispatch(searchRecipesAction(response.data));
      });
  };
};
