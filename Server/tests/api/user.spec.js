
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
let recipe2;

describe('More-Recipes', () => {
  it('loads the home page', (done) => {
    request(app)
      .get('/api/v1/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});

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

  it('raises error with duplicate user email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userOne)
      .expect(409)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('raises error with duplicate username', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        FullName: 'Daddychuks',
        Email: 'chuksy@yahoo.com',
        Sex: 'male',
        UserName: 'chuks',
        Password: 'chuks',
        ConfirmPassword: 'chuks'
      })
      .expect(409)
      .end((err, res) => {
        expect(res.body.error.message).to.equal('username already exists');
        if (err) return done(err);
        done();
      });
  });

  it('denies access upon incorrect login details', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Email: 'chuks@yahoo.com',
        Password: 'password'
      })
      .expect(409)
      .end((err, res) => {
        expect(res.body.message).to.equal('Username or password incorrect');
        if (err) return done(err);
        done();
      });
  });

  it('ensures user cannot be created if one of email or password is lacking.', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Password: 'password'
      })
      .expect(406)
      .end((err, res) => {
        expect(res.body.message).to.equal('Email Field should not be Empty');
        if (err) return done(err);
        done();
      });
  });
});
