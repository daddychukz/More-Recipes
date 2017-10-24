import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  user,
  auth
});

export default rootReducer;
