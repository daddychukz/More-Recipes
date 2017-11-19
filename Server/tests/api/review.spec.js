
import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;
let userToken;
let newUser;
let recipe1;

describe('Reviews Operations', () => {
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

  it('creates a new user with fullname and email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userTwo)
      .expect(201)
      .end((err, res) => {
        newUser = res.body.User;
        // expect(newUser.user).to.have.property('FullName');
        // expect(newUser.user).to.have.property('Email');
        if (err) return done(err);
        done();
      });
  });

  it('returns a token upon successful signin', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Email: 'user@yahoo.com',
        Password: 'user'
      })
      .expect(200)
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken);
        expect(res.body.message).to.equal('Welcome user');
        if (err) return done(err);
        done();
      });
  });

  it('adds a recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken)
      .send(fakeData.recipe3)
      .expect(200)
      .end((err, res) => {
        recipe1 = res.body.recipe;
        if (err) return done(err);
        done();
      });
  });

  it('adds a review to a recipe', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe1.recipeId}/reviews`)
      .set('authorization', userToken)
      .send({
        userId: newUser.userId,
        recipeId: recipe1.recipeId,
        FullName: newUser.fullname,
        Review: 'Cool Stuff!!'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
