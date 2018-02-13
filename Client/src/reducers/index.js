import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import recipeOperations from './recipeReducer';
import review from './reviewReducer';
import favorite from './favoriteReducer';
import popularRecipes from './popularRecipeReducer';
import singleRecipe from './singleRecipeReducer';
import allRecipe from './getAllRecipeReducer';

/**
 * @description combines all reducers into one
 */
const rootReducer = combineReducers({
  user,
  auth,
  recipeOperations,
  review,
  favorite,
  popularRecipes,
  singleRecipe,
  allRecipe
});

export default rootReducer;
