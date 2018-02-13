import request from 'supertest';
import chai from 'chai';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';
import { userToken } from './1_user.spec';

const { expect } = chai;
const recipe = {};

models
  .Recipe
  .destroy({
    cascade: true,
    truncate: true
  });

describe('Recipe Operations', () => {
  it(`fails to adds a recipe to the catalog whose required
  field is empty`, (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.incompleteRecipe)
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('Title Field should not be Empty');
        if (err) return done(err);
        done();
      });
  });

  it(`fails to adds a recipe to the catalog whose required
   field is empty`, (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.incompleteRecipe2)
      .expect(400)
      .end((err, res) => {
        expect(res.body.message)
          .to.equal('Description Field should not be Empty');
        if (err) return done(err);
        done();
      });
  });

  it('adds a recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe1)
      .expect(201)
      .end((err, res) => {
        recipe.recipe1 = res.body.recipe;
        expect(res.body.recipe.title).to.equal('Beans');
        expect(res.body.recipe.description).to.equal('This is how to prepare beans');
        expect(res.body.recipe).to.haveOwnProperty('imageUrl');
        expect(res.body.recipe).to.haveOwnProperty('publicId');
        if (err) return done(err);
        done();
      });
  });

  it(`fails to add a recipe to the catalog of a user with same
   recipe title`, (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe1)
      .expect(409)
      .end((err, res) => {
        expect(res.body.message)
          .to.equal('You already have a recipe with this Title');
        if (err) return done(err);
        done();
      });
  });

  it('adds a second recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe2)
      .expect(201)
      .end((err, res) => {
        recipe.recipe2 = res.body.recipe;
        expect(res.body.recipe.title).to.equal('Egusi');
        expect(res.body.recipe.description).to.equal('This is how to prepare Egusi soup');
        expect(res.body.recipe).to.haveOwnProperty('imageUrl');
        expect(res.body.recipe).to.haveOwnProperty('publicId');
        if (err) return done(err);
        done();
      });
  });

  it('adds a third recipe to the catalog', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .set('authorization', userToken.token)
      .send(fakeData.recipe3)
      .expect(201)
      .end((err, res) => {
        recipe.recipe3 = res.body.recipe;
        expect(res.body.recipe.title).to.equal('Yam');
        expect(res.body.recipe.description).to.equal('This is how to prepare Yam');
        expect(res.body.recipe).to.haveOwnProperty('imageUrl');
        expect(res.body.recipe).to.haveOwnProperty('publicId');
        if (err) return done(err);
        done();
      });
  });

  it(`fails to retrieves recipes from catalog with invalid limit
  or offset`, (done) => {
    request(app)
      .get('/api/v1/recipes?limit=aa&offset=0&searchString=')
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).to.equal('Limit or Offset must be a number');
        if (err) return done(err);
        done();
      });
  });

  it(`should return no content when retrieving all recipes from
    catalog whose searched item is not found`, (done) => {
    request(app)
      .get('/api/v1/recipes?limit=9&offset=0&searchString=indomie')
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('No Recipe Created');
        if (err) return done(err);
        done();
      });
  });

  it(`should return no content when retrieving recipes of a
  user who has not created any`, (done) => {
    request(app)
      .get('/api/v1/recipes/myrecipes?limit=10&offset=0&searchString=')
      .set('authorization', userToken.token2)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('no recipes created');
        if (err) return done(err);
        done();
      });
  });

  it('retrieves all recipes from catalog', (done) => {
    request(app)
      .get('/api/v1/recipes?limit=10&offset=0&searchString=')
      .expect(200)
      .end((err, res) => {
        expect(res.body.pagination.totalCount).to.equal(3);
        expect(res.body.pagination.pageSize).to.equal(3);
        expect(res.body.recipes[0].title).to.equal('Yam');
        expect(res.body.recipes[1].title).to.equal('Egusi');
        expect(res.body.recipes[2].title).to.equal('Beans');
        if (err) return done(err);
        done();
      });
  });

  it(`fails to retrieve a single recipe from catalog
  on invalid recipeId`, (done) => {
    request(app)
      .get('/api/v1/recipes/98c58f26-0423-4276-b70f-80364abe5were')
      .set('authorization', userToken.token2)
      .expect(400)
      .end((err, res) => {
        expect(res.body.error.message).to.equal('Invalid Recipe ID');
        if (err) return done(err);
        done();
      });
  });

  it('retrieves a single recipe from catalog', (done) => {
    request(app)
      .get(`/api/v1/recipes/${recipe.recipe1.recipeId}`)
      .set('authorization', userToken.token2)
      .expect(200)
      .end((err, res) => {
        expect(res.body.recipe.title).to.equal('Beans');
        expect(res.body.recipe.fullname).to.equal('Daddychuks');
        expect(res.body.recipe.description).to.equal('This is how to prepare beans');
        expect(res.body.recipe).to.haveOwnProperty('imageUrl');
        expect(res.body.recipe).to.haveOwnProperty('publicId');
        if (err) return done(err);
        done();
      });
  });

  it('should not update recipe on wrong recipeId', (done) => {
    request(app)
      .put('/api/v1/recipe/98c58f26-0423-4276-b70f-80364abe5were')
      .set('authorization', userToken.token)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('Record not found for this User');
        if (err) return done(err);
        done();
      });
  });

  it('modifies a recipe in catalog', (done) => {
    request(app)
      .put(`/api/v1/recipe/${recipe.recipe1.recipeId}`)
      .set('authorization', userToken.token)
      .send({
        title: 'Egusi soup',
        description: 'Egusi soup preparation',
        imageUrl: 'image url',
        publicId: 'public id'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.updatedRecipe[2].title).to.equal('Egusi soup');
        expect(res.body.updatedRecipe[2].description).to.equal('Egusi soup preparation');
        expect(res.body.updatedRecipe[2]).to.haveOwnProperty('imageUrl');
        if (err) return done(err);
        done();
      });
  });

  it('deletes recipe from catalog', (done) => {
    request(app)
      .delete(`/api/v1/recipes/${recipe.recipe1.recipeId}`)
      .set('authorization', userToken.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('Recipe successfully deleted!');
        if (err) return done(err);
        done();
      });
  });

  it('should not delete recipe from catalog on wrong recipeId', (done) => {
    request(app)
      .delete('/api/v1/recipes/98c58f26-0423-4276-b70f-80364abe5were')
      .set('authorization', userToken.token)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('Record not found for this User!');
        if (err) return done(err);
        done();
      });
  });
});

export default recipe;
