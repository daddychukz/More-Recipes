// /**
//  * API Endpoint Tests
//  */
import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken } from '../api/1_user.spec';

const { expect } = chai;
const recipe1 = {};

models
  .Recipe
  .destroy({
    cascade: true,
    truncate: true
  });

models
  .User
  .destroy({
    cascade: true,
    truncate: true
  });

models
  .Favorite
  .destroy({
    cascade: true,
    truncate: true
  });

models
  .Review
  .destroy({
    cascade: true,
    truncate: true
  });

describe('Verify and Validate token', () => {
  it('fails to add recipe for viewers without token', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(fakeData.recipe)
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('Unauthorized');
        if (err) return done(err);
        done();
      });
  });
});

describe('Recipe Operations', () => {
  it('users require a token to add recipe', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe4)
      .expect(201)
      .end((err, res) => {
        recipe1.recipe = res.body.recipe;
        expect(res.body.recipe.title).to.equal('Egg Sauce');
        expect(res.body.recipe.description)
          .to
          .equal('This is how to prepare Egg');
        if (err) return done(err);
        done();
      });
  });
});
