import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken } from './1_user.spec';

const { expect } = chai;
const recipe = {};

models
  .Recipe
  .destroy({
    cascade: true,
    truncate: true
  });

describe('Recipe Operations', () => {
  it('adds a recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe1)
      .expect(201)
      .end((err, res) => {
        recipe.recipe1 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('adds a second recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe2)
      .expect(201)
      .end((err, res) => {
        recipe.recipe2 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('adds a third recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe3)
      .expect(201)
      .end((err, res) => {
        recipe.recipe3 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('retrieves recipes from catalog', (done) => {
    request(app)
      .get('/api/v1/recipes?limit=10&offset=0&searchString=')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('modifies a recipe in catalog', (done) => {
    request(app)
      .post(`/api/v1/recipe/${recipe.recipe1.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        Title: 'Egusi soup preparation',
        Description: 'This is how to prepare Egusi soup'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('deletes recipe from catalog', (done) => {
    request(app)
      .delete(`/api/v1/recipes/${recipe.recipe1.recipeId}`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

export default recipe;
