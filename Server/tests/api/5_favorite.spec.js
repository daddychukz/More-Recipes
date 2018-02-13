import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken, newUser } from './1_user.spec';
import recipe from './2_recipe.spec';

const { expect } = chai;

models
  .Favorite
  .destroy({
    cascade: true,
    truncate: true
  });

describe('User Favorite Operations', () => {
  it('raises error if no recipe category is provided', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        recipeId: recipe.recipe3.recipeId,
        userId: newUser.user.userId,
      })
      .expect(400)
      .end((error, response) => {
        expect(response.body.message)
          .to.equal('Category Field should not be Empty');
        if (error) return done(error);
        done();
      });
  });

  it('fails to favorite a recipe with wrong recipeId', (done) => {
    request(app)
      .post('/api/v1/recipes/98c58f26-0423-4276-b70f-80364aae511e')
      .set('authorization', userToken.token)
      .send({
        recipeId: recipe.recipe3.recipeId,
        userId: newUser.user.userId,
        category: 'Soups'
      })
      .expect(404)
      .end((err, response) => {
        expect(response.body.message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });

  it('adds a recipe to users favorites', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        recipeId: recipe.recipe3.recipeId,
        userId: newUser.user.userId,
        category: 'Soups'
      })
      .expect(201)
      .end((err, response) => {
        expect(response.body.message)
          .to.equal('Recipe added to your favorites');
        if (err) return done(err);
        done();
      });
  });

  it('adds another recipe to users favorites', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe3.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        recipeId: recipe.recipe3.recipeId,
        userId: newUser.user.userId,
        category: 'Lunch'
      })
      .expect(201)
      .end((err, response) => {
        expect(response.body.message)
          .to.equal('Recipe added to your favorites');
        if (err) return done(err);
        done();
      });
  });

  it('removes already favorited recipe from users favorites', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        recipeId: recipe.recipe3.recipeId,
        userId: newUser.user.userId,
        category: 'Soups'
      })
      .expect(200)
      .end((err, response) => {
        expect(response.body.message)
          .to.equal('Recipe removed from your favorites');
        if (err) return done(err);
        done();
      });
  });

  it('gets all favorites added by a user', (done) => {
    request(app)
      .get(`/api/v1/users/${newUser.user.userId}/recipes`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it(`raises an error retrieving favorite recipe
  with invalid userId`, (done) => {
    request(app)
      .get(`/api/v1/users/${newUser.user.userId}/recipes`)
      .set('authorization', fakeData.invalidToken)
      .expect(401)
      .end((err, response) => {
        expect(response.body.message)
          .to.equal('You do not have Permission to this Page');
        if (err) return done(err);
        done();
      });
  });

  it(`should return nothing retrieving users favorite when
  user has no favorite recipe`, (done) => {
    request(app)
      .get(`/api/v1/users/${newUser.user.userId}/recipes`)
      .set('authorization', userToken.token2)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('No recipe favorited');
        if (err) return done(err);
        done();
      });
  });

  it('should search for a recipe based on category', (done) => {
    request(app)
      .get('/api/v1/search/favorites?limit=9&offset=0&searchString=lunch')
      .set('authorization', userToken.token)
      .expect(200)
      .end((err, response) => {
        expect(response.body.searchResult[0].Recipe.title).to.equal('Yam');
        if (err) return done(err);
        done();
      });
  });

  it('should not find a recipe with unregistered category', (done) => {
    request(app)
      .get('/api/v1/search/favorites?limit=9&offset=0&searchString=breakfast')
      .set('authorization', userToken.token)
      .expect(404)
      .end((err, response) => {
        expect(response.body.message).to.equal('Recipe not Found!');
        if (err) return done(err);
        done();
      });
  });
});
