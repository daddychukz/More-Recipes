
import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const { expect } = chai;
const userToken = {};
const newUser = {};

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

describe('More-Recipes', () => {
  it('loads the home page', (done) => {
    request(app)
      .get('/api/v1/')
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});

describe('User Signin/Signup', () => {
  it('creates a new user with fullname and email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userOne)
      .expect(201)
      .end((err, res) => {
        newUser.user = res.body.User;
        // expect(newUser.user).to.have.property('FullName');
        // expect(newUser.user).to.have.property('Email');
        if (err) return done(err);
        done();
      });
  });

  it('raises error with duplicate user email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userTwo)
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
        expect(res.body.error.message).to.equal('Username already exists');
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

  it('ensures user cannot signin if one of email or password is lacking.', (done) => {
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

  it('returns a token upon successful signin', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Email: 'chuks@yahoo.com',
        Password: 'chuks'
      })
      .expect(200)
      .end((err, res) => {
        userToken.token = res.body.token;
        expect(userToken.token);
        expect(res.body.message).to.equal('Welcome chuks');
        if (err) return done(err);
        done();
      });
  });
});

export {
  userToken,
  newUser
};
