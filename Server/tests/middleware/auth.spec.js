// /**
//  * API Endpoint Tests
//  */
import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;
let userToken;
let newUser;
let recipe1;
let recipe2;

describe('User Signin/Signup', () => {
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

  it('fails to add recipe for viewers without token', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(fakeData.recipe)
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('No token provided');
        if (err) return done(err);
        done();
      });
  });
});

describe('Recipe Operations', () => {
  models
    .Recipe
    .destroy({
      cascade: true,
      truncate: true
    });

  it('users require a token to add recipe', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken)
      .send(fakeData.recipe)
      .expect(200)
      .end((err, res) => {
        recipe1 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('adds a recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken)
      .send(fakeData.recipe4)
      .expect(200)
      .end((err, res) => {
        recipe2 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });
});
