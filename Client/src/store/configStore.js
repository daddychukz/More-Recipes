import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const configStore = initialState => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);

export default configStore;
