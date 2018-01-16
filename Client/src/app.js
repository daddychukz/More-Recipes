import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import App from './routes';
import { setCurrentUser } from './actions/userActions';
import './static/css/style.scss';
// import '../../node_modules/bootstrap/less/bootstrap.less';
import '../../node_modules/toastr/build/toastr.min.css';
import setAuthorizationToken from './utils/setAuthorizationToken';

import configStore from './store/configStore';

const store = configStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
