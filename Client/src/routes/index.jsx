import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/pages/Home';
import NotFound from '../components/pages/NotFound';
import RecipeBox from '../components/pages/RecipeBox';
import AddRecipe from '../components/pages/AddRecipe';
import RecipeDetail from '../components/pages/RecipeDetail';
import MyRecipe from '../components/pages/MyRecipe';
import MyFavorite from '../components/pages/MyFavorite';
import MyProfile from '../components/pages/MyProfile';
import ResetPassword from '../components/pages/ResetPassword';
import requireAuth from '../utils/requireAuth';
import noAuth from '../utils/noAuth';

const myRoutes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={noAuth(Home)} />
      <Route path="/recipe-box" exact component={requireAuth(RecipeBox)} />
      <Route path="/add-recipe" exact component={requireAuth(AddRecipe)} />
      <Route
        path="/recipe/:recipeId"
        exact
        component={requireAuth(RecipeDetail)}
      />
      <Route path="/my-recipe" exact component={requireAuth(MyRecipe)} />
      <Route path="/my-favorite" exact component={requireAuth(MyFavorite)} />
      <Route path="/my-profile" exact component={requireAuth(MyProfile)} />
      <Route
        path="/reset-password/:token"
        exact
        component={noAuth(ResetPassword)}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default myRoutes;
