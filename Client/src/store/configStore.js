import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = (process.env.NODE_ENV === 'development') ?
  composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant())) :
  applyMiddleware(thunk);

const configStore = initialState => createStore(
  rootReducer,
  initialState,
  middleware
);

export default configStore;
