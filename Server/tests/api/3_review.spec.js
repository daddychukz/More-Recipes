import request from 'supertest';
import chai from 'chai';
import jwtDecode from 'jwt-decode';
import app from '../../src/app';
import models from '../../src/models';
import { userToken, newUser } from './1_user.spec';
import recipe from './2_recipe.spec';

const { expect } = chai;

models
  .Review
  .destroy({
    cascade: true,
    truncate: true
  });

describe('Reviews Operations', () => {
  it(`it fails to add a review to a recipe whose required
  field is empty`, (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/reviews`)
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe.recipe2.recipeId,
        fullName: newUser.user.fullname
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('Review Field should not be Empty');
        if (err) return done(err);
        done();
      });
  });

  it('it fails to add a review to a recipe with invalid recipeId', (done) => {
    request(app)
      .post('/api/v1/recipes/98c58f26-0423-4276-b70f-80364abe5were/reviews')
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe.recipe2.recipeId,
        fullName: newUser.user.fullname,
        review: 'Nice'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error.message).to.equal('Invalid Recipe ID');
        if (err) return done(err);
        done();
      });
  });

  it('it fails to add a review to a recipe with invalid recipeId', (done) => {
    const decoded = jwtDecode(userToken.token);
    request(app)
      .post(`/api/v1/recipes/${decoded.userId}/reviews`)
      .set('authorization', userToken.token2)
      .send({
        review: 'Nice'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error.message).to.equal('Wrong Recipe Id');
        if (err) return done(err);
        done();
      });
  });

  it('adds a review to a recipe', (done) => {
    request(app)
      .post(`/api/v1/recipes/${recipe.recipe2.recipeId}/reviews`)
      .set('authorization', userToken.token)
      .send({
        userId: newUser.user.userId,
        recipeId: recipe.recipe2.recipeId,
        fullName: newUser.user.fullname,
        review: 'Cool Stuff!!'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.review).to.equal('Cool Stuff!!');
        expect(res.body.User.fullname).to.equal('Daddychuks');
        if (err) return done(err);
        done();
      });
  });

  it('retrieve all reviews of a particular recipe', (done) => {
    request(app)
      .get(`/api/v1/reviews/${recipe.recipe2.recipeId}`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.reviews[0].review).to.equal('Cool Stuff!!');
        expect(res.body.reviews[0].fullname).to.equal('Daddychuks');
        expect(res.body.reviews[0].User.email).to.equal('chuks@yahoo.com');
        if (err) return done(err);
        done();
      });
  });
});
