// /**
//  * API Endpoint Tests
//  */
import request from 'supertest';
import chai from 'chai';
import app from '../src/app';
import fakeData from './helpers/fakeData';

const expect = chai.expect;

describe('More-Recipes', () => {
  it('loads the home page', (done) => {
    request(app)
      .get('/api/v1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Fails to load the home page', (done) => {
    request(app)
      .get('/api/v1/home')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Fails to post to undeclared route', (done) => {
    request(app)
      .post('/api/v1/home')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('More-Recipes', () => {
  it('adds a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .send(fakeData.recipe)
      .expect(201)
      .end((err, res) => {
        expect(res.body.recipeListings[0]).to.have.property('Title');
        expect(res.body.recipeListings.length).to.equal(4);
        if (err) return done(err);
        done();
      });
  });

  it('Fails to add a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .send(fakeData.recipe2)
      .expect(400)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Title Field should not be Empty');
        if (err) return done(err);
        done();
      });
  });

  it('Fails upvote a recipe', (done) => {
    request(app)
      .put('/api/v1/recipes/10/upvote')
      .set('Content-Type', 'application/json')
      .send(fakeData.user)
      .expect(404)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });

  it('Fails to add a User review', (done) => {
    request(app)
      .post('/api/v1/recipes/10/reviews')
      .set('Content-Type', 'application/json')
      .send(fakeData.reviews)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('upvote a recipe', (done) => {
    request(app)
      .put('/api/v1/recipes/1/upvote')
      .set('Content-Type', 'application/json')
      .send(fakeData.user)
      .expect(200)
      .end((err, res) => {
        expect(res.body.recipeListings[0].Upvotes).to.equal(1);
        expect(res.body.Message).to.equal('Jollof Beans has received an upvote by Chuks');
        if (err) return done(err);
        done();
      });
  });

  it('adds a User review', (done) => {
    request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('Content-Type', 'application/json')
      .send(fakeData.reviews)
      .expect(201)
      .end((err, res) => {
        expect(res.body.userReviews[0]).to.have.property('Username');
        if (err) return done(err);
        done();
      });
  });

  it('Deletes a recipe', (done) => {
    request(app)
      .delete('/api/v1/recipes/4')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.recipeListings.length).to.equal(3);
        if (err) return done(err);
        done();
      });
  });

  it('Retrieve all recipes', (done) => {
    request(app)
      .get('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.recipeListings.length).to.equal(3);
        if (err) return done(err);
        done();
      });
  });

  it('Get Recipe by Most Upvotes', (done) => {
    request(app)
      .get('/api/v1/recipe?sort=upvotes&order=des')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Recipe with the Most Upvotes');
        if (err) return done(err);
        done();
      });
  });
});
