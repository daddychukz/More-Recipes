
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
});
