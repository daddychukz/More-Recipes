import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './routes';
import './utils/css/style.scss';
import '../../node_modules/toastr/build/toastr.min.js';

import configStore from './store/configStore';

const store = configStore();


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
