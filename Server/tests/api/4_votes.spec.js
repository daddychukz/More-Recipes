import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import fakeData from '../helpers/fakeData';
import { userToken } from './1_user.spec';
import recipe from './2_recipe.spec';

const { expect } = chai;

describe('test cases for upvoting a recipe', () => {
  it('should be able to upvote a recipe by a user', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/upvote`)
      .set('authorization', userToken.token)
      .expect(201)
      .end((error, response) => {
        expect(response.body).deep.equal({
          message: 'You upvoted this recipe',
          value: 1
        });
        if (error) done(error);
        done();
      });
  });

  it('should be able to upvote same recipe by another user', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/upvote`)
      .set('authorization', userToken.token2)
      .expect(201)
      .end((error, response) => {
        expect(response.body).deep.equal({
          message: 'You upvoted this recipe',
          value: 1
        });
        if (error) done(error);
        done();
      });
  });

  it('should remove a users upvote', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/upvote`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((error, response) => {
        expect(response.body).deep.equal({
          message: 'You removed your Upvote',
          value: 0
        });
        if (error) done(error);
        done();
      });
  });

  it('should return sorted list of recipes by upvotes in descending order', (done) => {
    request(app)
      .get('/api/v1/recipe?sort=upvotes&order=des')
      .set('authorization', userToken.token)
      .expect(200)
      .end((error, response) => {
        expect(response.body.recipes[0].title).to.equal('Egusi');
        done();
      });
  });
});

describe('test cases for downvoting a recipe', () => {
  it('should be able to downvote a recipe by a user', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe3.recipeId}/downvote`)
      .set('authorization', userToken.token)
      .expect(201)
      .end((error, response) => {
        expect(response.body).deep.equal({
          message: 'You downvoted this recipe',
          value: 1
        });
        done();
      });
  });

  it('should remove a users downvote', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe3.recipeId}/downvote`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((error, response) => {
        expect(response.body).deep.equal({
          message: 'You removed your Downvote',
          value: 0
        });
        done();
      });
  });
});
