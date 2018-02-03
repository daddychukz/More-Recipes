import faker from 'Faker';
import { userToken, newUser } from '../api/1_user.spec';
import recipe from '../api/2_recipe.spec';

const fakeFavorite = {

  invalidToken: 'invalidtoken',
  // noCategory: {
  //   recipeId: recipe.recipe3.recipeId,
  //   userId: newUser.user.userId,
  // },

  // recipe1: {
  //   recipeId: recipe.recipe3.recipeId,
  //   userId: newUser.user.userId,
  //   Category: 'Soups'
  // }
};

export default fakeFavorite;
