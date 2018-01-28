import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import getRecipe from './recipeReducer';
import review from './reviewReducer';
import favorite from './favoriteReducer';
import popularRecipes from './getRecipeReducer';
import search from './searchReducer';
import singleRecipe from './singleRecipeReducer';
import allRecipe from './getAllRecipeReducer';

const rootReducer = combineReducers({
  user,
  auth,
  getRecipe,
  review,
  favorite,
  popularRecipes,
  search,
  singleRecipe,
  allRecipe
});

export default rootReducer;
