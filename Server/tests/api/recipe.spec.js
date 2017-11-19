import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;
let userToken;
let recipe2;

describe('Recipe Operations', () => {
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

  it('returns a token upon successful signin', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Email: 'chuks@yahoo.com',
        Password: 'chuks'
      })
      .expect(200)
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken);
        expect(res.body.message).to.equal('Welcome chuks');
        if (err) return done(err);
        done();
      });
  });

  it('adds a second recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken)
      .send(fakeData.recipe)
      .expect(200)
      .end((err, res) => {
        recipe2 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('retrieves recipes from catalog', (done) => {
    request(app)
      .get('/api/v1/recipes')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('modifies a recipe in catalog', (done) => {
    request(app)
      .put(`/api/v1/recipes/${recipe2.recipeId}`)
      .set('authorization', userToken)
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
      .delete(`/api/v1/recipes/${recipe2.recipeId}`)
      .set('authorization', userToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
