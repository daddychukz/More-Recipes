import isEmpty from 'lodash/isEmpty';
import db from '../models';
import paginate from '../services/paginate';

const recipeListings = db.Recipe;
const error = {};

/**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveRecipes = (req, res) =>
  recipeListings
    .findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: req.query.limit,
      offset: req.query.offset
    })
    .then((recipes) => {
      const { limit, offset } = req.query;
      const pagination = paginate({
        limit,
        offset,
        totalCount: recipes.count,
        pageSize: recipes.rows.length
      });
      res.status(200).json({
        pagination,
        recipes: recipes.rows
      });
    })
    .catch(err => res.status(400).send(err));

/**
   * createRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const createRecipe = (req, res) => {
  if (!req.body.title || req.body.title.trim().length === 0) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty',
    });
  } else if (!req.body.description || req.body.description.trim().length === 0) {
    return res.status(400).json({
      Message: 'Description Field should not be Empty',
    });
  }
  // recipeListings.create({
  //   userId: req.decoded.userId,
  //   fullName: req.decoded.fullname,
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   publicId: req.body.publicId
  // }).then(recipe => res.status(201).json({
  //   recipe }))
  //   .catch(err => res.status(400).send(err));
  recipeListings
    .findOrCreate({ where: {
      userId: req.decoded.userId,
      title: req.body.title
    },
    defaults: {
      fullName: req.decoded.fullname,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      publicId: req.body.publicId
    } })
    .spread((recipe, created) => {
      if (created === false) {
        res.status(409).json({
          message: 'You already have a recipe with this Title'
        });
      } else if (created === true) {
        res.status(201).json({
          recipe
        });
      }
    })
    .catch(() => {
      recipeListings.findOne({
        where: {
          userId: req.decoded.userId,
          title: req.body.title
        },
        attributes: {
          exclude: ['imageUrl', 'publicId', 'fullName', 'updatedAt']
        }
      })
        .then((recipe) => {
          res.status(200).json({
            recipe
          });
        });
    });
};

/**
   * deleteRecipe
   * @desc deletes a recipe from catalog
   * Route: DELETE: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const deleteRecipe = (req, res) => recipeListings
  .findOne({
    where: {
      recipeId: req.params.recipeID,
      userId: req.decoded.userId
    },
  })
  .then((recipe) => {
    recipe
      .destroy()
      .then(res.status(200).send({
        message: 'Recipe successfully deleted!'
      }))
      .catch(err => res.status(400).send(err));
  })
  .catch(() => res.status(404).send({
    message: 'Record not found for this User!'
  }));

/**
   * updateRecipe
   * @desc modifies a recipe in the catalog
   * Route: PUT: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const updateRecipe = (req, res) => {
  const updateRecord = {};

  recipeListings.findOne({
    where: {
      recipeId: req.params.recipeID,
      userId: req.decoded.userId
    },
  }).then((recipe) => {
    if (req.body.title) {
      updateRecord.title = req.body.title;
    } else if (req.body.description) {
      updateRecord.description = req.body.description;
    }
    recipe.update(updateRecord)
      .then(updatedRecipe => res.send({
        updatedRecipe
      }));
  })
    .catch(() => res.status(404).send({
      message: 'Record not found for this User'
    }));
};

/**
   * retrieveRecipe
   * @desc gets a single recipe in the catalog
   * Route: GET: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveRecipe = (req, res) =>
  recipeListings
    .findAll({
      where: {
        recipeId: req.params.recipeID
      },
      include: [{
        model: db.votes
      }]
    })
    .then((recipe) => {
      if (isEmpty(recipe)) {
        res.status(406).json({
          message: 'Record not Found!'
        });
      } else if (recipe) {
        res.status(200).send({
          recipe
        });
      } else {
        res.status(404).send({
          message: 'Record not Found!'
        });
      }
    })
    .catch(() => res.status(400).send({
      message: 'Recipe not Found'
    }));

/* Export all methods */
export default {
  retrieveRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  retrieveRecipe
};
