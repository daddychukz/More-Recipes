import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import recipe from './recipeReducer';

const rootReducer = combineReducers({
  user,
  auth,
  recipe
});

export default rootReducer;
