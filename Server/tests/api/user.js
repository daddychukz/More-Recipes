// /**
//  * API Endpoint Tests
//  */
import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;

let userToken, recipe;

describe('More-Recipes', () => {
  it('loads the home page', (done) => {
    request(app)
      .get('/api/v1/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('User Signin/Signup', () => {
  models
    .User
    .destroy({
      cascade: true,
      truncate: true
    });

  it('creates a new user with fullname and email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userOne)
      .expect(201)
      .end((err, res) => {
        expect(res.body.user).to.have.property('fullName');
        expect(res.body.user).to.have.property('email');
        if (err) return done(err);
        done();
      });
  });

  it('raises error with duplicate user email', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userOne)
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors[0].message).to.equal('email must be unique');
        if (err) return done(err);
        done();
      });
  });

  it('raises error with duplicate username', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        fullname: 'Daddychuks',
        email: 'chuksy@yahoo.com',
        sex: 'male',
        username: 'chuks',
        password: 'chuks',
        confirmPassword: 'chuks'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors[0].message).to.equal('userName must be unique');
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
      .expect(400)
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
        password: 'password'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Email Field should not be Empty');
        if (err) return done(err);
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
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('adds a recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken)
      .send(fakeData.recipe2)
      .expect(201)
      .end((err, res) => {
        recipe = res.body.recipe;
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
      .put(`/api/v1/recipes/${recipe.recipeId}`)
      .set('authorization', userToken)
      .send({
        title: 'Egusi soup preparation',
        description: 'This is how to prepare Egusi soup'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('deletes recipe from catalog', (done) => {
    request(app)
      .delete(`/api/v1/recipes/${recipe.recipeId}`)
      .set('authorization', userToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('Reviews Operations', () => {
  models
    .Recipe
    .destroy({
      cascade: true,
      truncate: true
    });

  it('deletes recipe from catalog', (done) => {
    request(app)
      .delete(`/api/v1/recipes/${recipe.recipeId}`)
      .set('authorization', userToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
