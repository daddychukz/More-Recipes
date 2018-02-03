
import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken, newUser } from './1_user.spec';
import recipe from './2_recipe.spec';

const { expect } = chai;

models
  .Review
  .destroy({
    cascade: true,
    truncate: true
  });

describe('Reviews Operations', () => {
  it('it fails to add a review to a recipe whose required field is empty', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/reviews`)
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe.recipe2.recipeId,
        FullName: newUser.user.fullname
      })
      .expect(406)
      .end((err, res) => {
        expect(res.body.message).to.equal('Review Field should not be Empty');
        if (err) return done(err);
        done();
      });
  });

  it('it fails to add a review to a recipe with invalid recipeId', (done) => {
    request(app)
      .post('/api/v1/recipes/98c58f26-0423-4276-b70f-80364abe5were/reviews')
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe.recipe2.recipeId,
        FullName: newUser.user.fullname,
        Review: 'Nice'
      })
      .expect(406)
      .end((err, res) => {
        expect(res.body.error.message).to.equal('Invalid Recipe ID');
        if (err) return done(err);
        done();
      });
  });

  it('adds a review to a recipe', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/reviews`)
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe.recipe2.recipeId,
        FullName: newUser.user.fullname,
        Review: 'Cool Stuff!!'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('retrieve all reviews of a particular recipe', (done) => {
    request(app)
      .get(`/api/v1/reviews/${recipe.recipe2.recipeId}`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.reviews);
        if (err) return done(err);
        done();
      });
  });
});
