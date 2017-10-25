import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import recipe from './recipeReducer';
import flashMessages from './flashMessages';
const rootReducer = combineReducers({
  user,
  flashMessages,
  auth,
  recipe
});

export default rootReducer;
