import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import recipe from './recipeReducer';
import review from './reviewReducer';

const rootReducer = combineReducers({
  user,
  auth,
  recipe,
  review
});

export default rootReducer;
