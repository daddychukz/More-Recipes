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
      .get('/')
      .expect(200)
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
      .post('/api/recipes')
      .set('Content-Type', 'application/json')
      .send(fakeData.recipe)
      .expect(201)
      .end((err, res) => {
        expect(res.body.recipes[0]).to.have.property('Title');
        expect(res.body.Message).to.equal('Recipe successfully added');
        expect(res.body.recipes.length).to.equal(4);
        if (err) return done(err);
        done();
      });
  });

  it('upvote a recipe', (done) => {
    request(app)
      .put('/api/recipes/1/upvote')
      .set('Content-Type', 'application/json')
      .send(fakeData.user)
      .expect(201)
      .end((err, res) => {
        expect(res.body.recipes[0].Upvotes).to.equal(1);
        expect(res.body.Message).to.equal('Jollof Beans has received an upvote by Chuks');
        if (err) return done(err);
        done();
      });
  });

  it('adds a User review', (done) => {
    request(app)
      .post('/api/recipes/1/reviews')
      .set('Content-Type', 'application/json')
      .send(fakeData.reviews)
      .expect(201)
      .end((err, res) => {
        expect(res.body.reviews[0]).to.have.property('Username');
        expect(res.body.Message).to.equal('Review added');
        if (err) return done(err);
        done();
      });
  });

  it('Deletes a recipe', (done) => {
    request(app)
      .delete('/api/recipes/4')
      .set('Content-Type', 'application/json')
      .expect(201)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Recipe Successfully Deleted');
        expect(res.body.recipes.length).to.equal(3);
        if (err) return done(err);
        done();
      });
  });

  it('Retrieve all recipes', (done) => {
    request(app)
      .get('/api/recipes')
      .set('Content-Type', 'application/json')
      .expect(201)
      .end((err, res) => {
        expect(res.body.Recipes.length).to.equal(3);
        if (err) return done(err);
        done();
      });
  });
});
