
import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken, newUser } from './1_user.spec';

const { expect } = chai;
const recipe3 = {};

models
  .Review
  .destroy({
    cascade: true,
    truncate: true
  });

describe('Reviews Operations', () => {
  it('adds a second recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe2)
      .expect(201)
      .end((err, res) => {
        recipe3.recipe = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('adds a review to a recipe', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe3.recipe.recipeId}/reviews`)
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe3.recipe.recipeId,
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

export default recipe3;
