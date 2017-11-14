import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import recipe from './recipeReducer';
import review from './reviewReducer';
import favorite from './favoriteReducer';

const rootReducer = combineReducers({
  user,
  auth,
  recipe,
  review,
  favorite
});

export default rootReducer;
