import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/pages/Home';
import NotFound from '../components/pages/NotFound';
import RecipeBox from '../components/pages/RecipeBox';
import AddRecipe from '../components/pages/AddRecipe';

const myRoutes= () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipe-box" exact component={RecipeBox} />
      <Route path="/add-recipe" exact component={AddRecipe} />
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default myRoutes;
