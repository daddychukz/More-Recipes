import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken, newUser } from './1_user.spec';
import recipe3 from './3_review.spec';

const { expect } = chai;

models
  .Favorite
  .destroy({
    cascade: true,
    truncate: true
  });

describe('User Favorite Operations', () => {
  it('adds a recipe to users favorites', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe3.recipe.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        recipeId: recipe3.recipe.recipeId,
        userId: newUser.user.userId,
        Category: 'Soups'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('gets all favorites added by a user', (done) => {
    request(app)
      .get(`/api/v1/users/${newUser.user.userId}/recipes`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
