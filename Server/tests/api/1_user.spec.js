import request from 'supertest';
import chai from 'chai';
import jwtDecode from 'jwt-decode';
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
        newUser.user = res.body.user;
        expect(newUser.user).to.have.property('fullname');
        expect(newUser.user).to.have.property('email');
        expect(res.body.user.email).to.equal(fakeData.userOne.email);
        expect(res.body.user.fullname).to.equal(fakeData.userOne.fullName);
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
        newUser.user2 = res.body.user;
        expect(newUser.user2).to.have.property('fullname');
        expect(newUser.user2).to.have.property('email');
        expect(res.body.user.email).to.equal(fakeData.userFour.email);
        expect(res.body.user.fullname).to.equal(fakeData.userFour.fullName);
        if (err) return done(err);
        done();
      });
  });

  it('raises error with duplicate username', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        fullName: 'Daddychuks',
        email: 'chuksy@yahoo.com',
        sex: 'male',
        userName: 'chuks',
        password: 'chuks',
        confirmPassword: 'chuks'
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
        email: 'chuks@yahoo.com',
        password: 'password'
      })
      .expect(409)
      .end((err, res) => {
        expect(res.body.message).to.equal('Username or password incorrect');
        if (err) return done(err);
        done();
      });
  });

  it(
    'ensures user cannot signin if one of email or password is lacking.',
    (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          password: 'password'
        })
        .expect(406)
        .end((err, res) => {
          expect(res.body.message).to.equal('Email Field should not be Empty');
          if (err) return done(err);
          done();
        });
    }
  );

  it('ensures user cannot be created if email is lacking.', (done) => {
    fakeData.userThree.email = null;
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
    fakeData.userFour.password = null;
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

  it(
    'ensures user cannot signin if one of email or password is lacking.',
    (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'Email'
        })
        .expect(406)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .equal('Password Field should not be Empty');
          if (err) return done(err);
          done();
        });
    }
  );

  it('ensures user cannot be created if username is lacking.', (done) => {
    fakeData.userFour.userName = null;
    request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.userFour)
      .expect(406)
      .end((err, res) => {
        expect(res.body.error.message)
          .to
          .equal('Username Field should not be Empty');
        done();
      });
  });

  it('ensures user cannot be created if fullname is lacking.', (done) => {
    fakeData.userOne.fullName = null;
    request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.userOne)
      .expect(406)
      .end((err, res) => {
        expect(res.body.error.message)
          .to
          .equal('Fullname Field should not be Empty');
        done();
      });
  });

  it('denies access for an unregistered user', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'chika@yahoo.com',
        password: 'password'
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
      .expect(400)
      .end((error, res) => {
        expect(res.body.error.message)
          .to.equal('Full name must only contain letters');
        if (error) return done(error);
        done();
      });
  });

  it(`should not be able to create a new account when Password and
  PasswordConfirmation fields are different`, (done) => {
    fakeData.wrongUser.password = '12345';
    request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.wrongUser)
      .expect(406)
      .end((error, res) => {
        expect(res.body.error.message).to.equal('Password Mismatch!');
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
        expect(res.body.error.message).to.equal('Not an email');
        if (error) done(error);
        done();
      });
  });

  it('returns a token upon successful signin', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'chuks@yahoo.com',
        password: 'chuks'
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
        email: 'emma@yahoo.com',
        password: 'emma'
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
        expect(response.body.message).to.equal('Unauthorized');
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
        expect(response.body.message)
          .to.equal('You do not have Permission to this Page');
        done();
      });
  });
});

describe('User profile test cases', () => {
  it('should fail to get user profile information on wrong token', (done) => {
    request(app)
      .get('/api/v1/user/profile')
      .set('authorization', fakeData.invalidToken)
      .expect(401)
      .end((error, response) => {
        expect(response.body.message)
          .to.equal('You do not have Permission to this Page');
        if (error) done(error);
        done();
      });
  });

  it('should get user profile information', (done) => {
    request(app)
      .get('/api/v1/user/profile')
      .set('authorization', userToken.token)
      .expect(200)
      .end((error, response) => {
        expect(response.body.about).to.equal('Nil');
        if (error) done(error);
        done();
      });
  });

  it('should update user profile with specified field', (done) => {
    request(app)
      .post('/api/v1/user/profile/edit')
      .set('authorization', userToken.token)
      .send(fakeData.userUpdate)
      .expect(202)
      .end((error, response) => {
        expect(response.body.email).to.equal(fakeData.userOne.email);
        expect(response.body.about).to.equal(fakeData.userUpdate.about);
        expect(response.body).to.haveOwnProperty('fullname');
        expect(response.body).to.haveOwnProperty('username');
        expect(response.body).to.haveOwnProperty('address');
        if (error) done(error);
        done();
      });
  });
});

describe('Reset user password test cases', () => {
  it(`should fail to load reset password page with Wrong or
  expired token`, (done) => {
    request(app)
      .post('/api/v1/validate-token')
      .send({ token: 'token' })
      .expect(401)
      .end((error, response) => {
        expect(response.body.message)
          .to
          .equal('You do not have Permission to this Page');
        done();
      });
  });

  it(`should fail to send reset password link when an unregistered
  email is supplied`, (done) => {
    request(app)
      .post('/api/v1/user/reset_password_request')
      .expect(404)
      .send({ email: 'ade@yahoo.com' })
      .end((error, response) => {
        expect(response.body.message).to.equal('User not found!');
        if (error) done(error);
        done();
      });
  });

  it(`should send reset password link when a registered email
  is supplied`, (done) => {
    request(app)
      .post('/api/v1/user/reset_password_request')
      .expect(200)
      .send({ email: 'chuks@yahoo.com' })
      .end((error, response) => {
        expect(response.body.message)
          .to.equal('Reset Password link sent successfully');
        if (error) done(error);
        done();
      });
  });

  it(`should fail to change password with wrong old
  password supplied`, (done) => {
    const decoded = jwtDecode(userToken.token);
    request(app)
      .post('/api/v1/user/reset-password')
      .set('authorization', userToken.token)
      .send({
        oldPassword: 'dee',
        password: 'password2',
        confirmPassword: 'password2',
        userId: decoded.userId
      })
      .expect(409)
      .end((error, response) => {
        expect(response.body.message).to.equal('Incorrect User Password');
        if (error) done(error);
        done();
      });
  });

  it('should fail to reset password if invalid token is supplied', (done) => {
    request(app)
      .post('/api/v1/user/reset-password')
      .set('authorization', userToken.token)
      .send({
        password: 'password2',
        token: fakeData.invalidToken
      })
      .expect(401)
      .end((error, response) => {
        expect(response.body.message).to.equal('Unauthorized');
        if (error) done(error);
        done();
      });
  });

  it('should fail to change password if invalid token is supplied', (done) => {
    const decoded = {
      userId: '171530ce-0c87-4732-b8f2-cbd47f7a90eb'
    };
    request(app)
      .post('/api/v1/user/reset-password')
      .set('authorization', userToken.token)
      .send({
        oldPassword: 'chuks',
        password: 'password2',
        userId: decoded.userId
      })
      .expect(401)
      .end((error, response) => {
        expect(response.body.message).to.equal('Unauthorized');
        if (error) done(error);
        done();
      });
  });

  it('should change password of a registered user', (done) => {
    const decoded = jwtDecode(userToken.token);
    request(app)
      .post('/api/v1/user/reset-password')
      .set('authorization', userToken.token)
      .send({
        oldPassword: 'chuks',
        password: 'password2',
        userId: decoded.userId
      })
      .expect(200)
      .end((error, response) => {
        expect(response.body.message).to.equal('Password Successfuly Updated');
        if (error) done(error);
        done();
      });
  });

  it('should reset password of a registered user', (done) => {
    request(app)
      .post('/api/v1/user/reset-password')
      .set('authorization', userToken.token)
      .send({
        password: 'password2',
        token: userToken.token
      })
      .expect(200)
      .end((error, response) => {
        expect(response.body.message).to.equal('Password Successfuly Updated');
        if (error) done(error);
        done();
      });
  });
});

export {
  userToken,
  newUser
};
