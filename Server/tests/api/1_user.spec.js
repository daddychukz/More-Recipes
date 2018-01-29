
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
  .Vote
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
        expect(newUser.user).to.have.property('fullname');
        expect(newUser.user).to.have.property('email');
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
      .end((err, res) => {
        expect(res.body.error.message).to.equal('Email already exists');
        if (err) return done(err);
        done();
      });
  });

  it('creates a second user with fullname and email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userFour)
      .expect(201)
      .end((err, res) => {
        newUser.user2 = res.body.User;
        expect(newUser.user2).to.have.property('fullname');
        expect(newUser.user2).to.have.property('email');
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

  it('ensures user cannot be created if email is lacking.', (done) => {
    fakeData.userThree.Email = null;
    request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.userThree)
      .expect(406)
      .end((err, res) => {
        expect(res.body.error.message)
          .to
          .equal('Email Field should not be Empty');
        done();
      });
  });

  it('ensures user cannot be created if password is lacking.', (done) => {
    fakeData.userFour.Password = null;
    request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.userFour)
      .expect(406)
      .end((err, res) => {
        expect(res.body.error.message)
          .to
          .equal('Password Field should not be Empty');
        done();
      });
  });

  it('denies access for an unregistered user', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Email: 'chika@yahoo.com',
        Password: 'password'
      })
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('Please register to signin');
        if (err) return done(err);
        done();
      });
  });

  it(`should not be able to create a new account when fullname field contains
  number(s)`, (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.wrongUser)
      .expect(406)
      .end((error, res) => {
        expect(res.body.error.message).to.equal('Full name must only contain letters');
        if (error) return done(error);
        done();
      });
  });

  it(`should not be able to create a new account when email field
  is invalid`, (done) => {
    request(app).post('/api/v1/users/signup')
      .send(fakeData.wrongUser2)
      .end((error, res) => {
        expect(406);
        expect(res.body.error.message).to.equal('Enter a Valid Email');
        if (error) done(error);
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

  it('returns a token upon successful signin of second user', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        Email: 'emma@yahoo.com',
        Password: 'emma'
      })
      .expect(200)
      .end((err, res) => {
        userToken.token2 = res.body.token;
        expect(userToken.token2);
        expect(res.body.message).to.equal('Welcome emma');
        if (err) return done(err);
        done();
      });
  });
});

describe('get user profile details cases', () => {
  it(`should not be able to access the profile page when token
  is not set`, (done) => {
    request(app)
      .get('/api/v1/user/profile')
      .expect(403)
      .end((error, response) => {
        expect(response.body.message).to.equal('No token provided');
        done();
      });
  });

  it(`should not be able to access the profile page when wrong token
  is set`, (done) => {
    request(app)
      .get('/api/v1/user/profile')
      .set('authorization', fakeData.invalidToken)
      .expect(403)
      .end((error, response) => {
        expect(response.body.message).to.equal('You do not have Permission to this Page');
        done();
      });
  });
});

describe('update user profile details test', () => {
  it('should not be able to update user profile field not specified', (done) => {
    request(app)
      .post('/api/v1/user/profile/edit')
      .set('authorization', userToken.token)
      .send(fakeData.userUpdate)
      .expect(202)
      .end((error, response) => {
        expect(response.body.email).to.equal('chuks@yahoo.com');
        expect(response.body.about).to.equal('Nil');
        if (error) done(error);
        done();
      });
  });
});

export {
  userToken,
  newUser
};
