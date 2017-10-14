import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Routes from './routes';
import configStore from './routes/configStore'

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>, document.getElementById("app"));