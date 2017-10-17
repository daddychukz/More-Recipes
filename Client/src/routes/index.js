import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import Home from '../components/pages/Home';
import LoginPage from '../components/pages/LoginPage';

const myRoutes= () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LoginPage} />
    </Switch>
  </Router>
);

export default myRoutes;
