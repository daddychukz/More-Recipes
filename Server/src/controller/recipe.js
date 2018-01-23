import isEmpty from 'lodash/isEmpty';
import db from '../models';
import paginate from '../services/paginate';

const recipeModel = db.Recipe;
const error = {};

/**
 * @class Recipe
 *@classdesc creates a class Recipe
 */
class Recipe {
/**
   * retrieveRecipe
   * @desc Gets all recipe from catalog
   * Route: GET: '/recipes'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static retrieveRecipes(req, res) {
    const { limit, offset, searchString } = req.query;
    recipeModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        where: {
          $or: [
            {
              title: {
                $iLike: `%${searchString}%`
              }
            },
            {
              description: {
                $iLike: `%${searchString}%`
              }
            }
          ]
        },
      })
      .then((recipes) => {
        if (recipes.count === 0) {
          res.status(404).json({
            message: 'Recipe not Found!'
          });
        } else {
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
        }
      })
      .catch(err => res.status(400).json({
        message: 'Recipe not Found',
        err
      }));
  }

  /**
   * myRecipe
   * @desc Gets all recipe created by a user
   * Route: GET: '/recipes/myrecipes'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static myRecipes(req, res) {
    recipeModel
      .findAndCountAll({
        where: {
          userId: req.decoded.userId,
        },
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
  }

  /**
   * createRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static createRecipe(req, res) {
    if (!req.body.Title || req.body.Title.trim().length === 0) {
      return res.status(400).json({
        message: 'Title Field should not be Empty',
      });
    } else if (!req.body.Description || req.body.Description.trim().length === 0) {
      return res.status(400).json({
        message: 'Description Field should not be Empty',
      });
    }
    recipeModel
      .findOrCreate({ where: {
        userId: req.decoded.userId,
        title: req.body.Title
      },
      defaults: {
        fullname: req.decoded.fullname,
        title: req.body.Title,
        description: req.body.Description,
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
        recipeModel.findOne({
          where: {
            userId: req.decoded.userId,
            title: req.body.Title
          },
          attributes: {
            exclude: ['imageUrl', 'publicId', 'fullname', 'updatedAt']
          }
        })
          .then((recipe) => {
            res.status(200).json({
              recipe
            });
          });
      });
  }

  /**
   * deleteRecipe
   * @desc deletes a recipe from catalog
   * Route: DELETE: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static deleteRecipe(req, res) {
    recipeModel.destroy({ where: {
      recipeId: req.params.recipeID,
      userId: req.decoded.userId
    } })
      .then(() => {
        recipeModel
          .findAndCountAll({
            where: {
              userId: req.decoded.userId,
            },
            order: [['createdAt', 'DESC']],
            limit: 5,
            offset: 0
          })
          .then((recipes) => {
            const pagination = paginate({
              limit: 5,
              offset: 0,
              totalCount: recipes.count,
              pageSize: recipes.rows.length
            });
            res.status(200).send({
              message: 'Recipe successfully deleted!',
              pagination,
              recipes
            });
          });
      })
      .catch(() => res.status(404).send({
        message: 'Record not found for this User!'
      }));
  }

  /**
   * updateRecipe
   * @desc modifies a recipe in the catalog
   * Route: PUT: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static updateRecipe(req, res) {
    const updateRecord = {};

    recipeModel.findOne({
      where: {
        recipeId: req.params.recipeID,
        userId: req.decoded.userId
      },
    }).then((recipe) => {
      if (req.body.Title) {
        updateRecord.title = req.body.Title;
      }
      if (req.body.Description) {
        updateRecord.description = req.body.Description;
      }
      if (req.body.imageUrl) {
        updateRecord.imageUrl = req.body.imageUrl;
      }
      if (req.body.publicId) {
        updateRecord.publicId = req.body.publicId;
      }
      recipe.update(updateRecord)
        .then(() => {
          recipeModel.all({
            where: {
              userId: req.decoded.userId
            },
            order: [['createdAt', 'DESC']],
          })
            .then(updatedRecipe => res.send({
              updatedRecipe,
            }));
        });
    })
      .catch(() => res.status(404).send({
        message: 'Record not found for this User'
      }));
  }

  /**
   * retrieveRecipe
   * @desc gets a single recipe in the catalog
   * Route: GET: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static retrieveRecipe(req, res) {
    recipeModel
      .findOne({
        where: {
          recipeId: req.params.recipeID,
        },
        include: [{
          model: db.Vote
        }],
      })
      .then((recipe) => {
        if (isEmpty(recipe)) {
          res.status(404).json({
            message: 'Record not Found!'
          });
        } else if (recipe) {
          res.status(200).json({
            recipe
          });
        } else {
          res.status(404).json({
            message: 'Record not Found!'
          });
        }
      })
      .catch(err => res.status(404).json({
        message: 'Recipe not Found',
        err
      }));
  }

  // /**
  //  * Search users in the application
  //  * @method
  //  * @memberof Recipe
  //  * @static
  //  * @param {Object} req request object
  //  * @param {Object} res response object
  //  * @param {Object} searchString response object
  //  * @returns {function} Express middleware function that search
  //  * users and sends response to client
  //  */
  // static searchAllRecipes(req, res) {
  //   const { limit, offset, searchString } = req.query;
  //   return recipeModel.findAndCountAll({
  //     limit,
  //     offset,
  //     order: [['createdAt', 'DESC']],
  //     where: {
  //       $or: [
  //         {
  //           title: {
  //             $iLike: `%${searchString}%`
  //           }
  //         },
  //         {
  //           description: {
  //             $iLike: `%${searchString}%`
  //           }
  //         }
  //       ]
  //     },
  //     attributes: {
  //       exclude: ['updatedAt']
  //     }
  //   })
  //     .then((recipeSearchResult) => {
  //       if (recipeSearchResult.count === 0) {
  //         res.status(404).json({
  //           message: 'Recipe not Found!'
  //         });
  //       } else {
  //         const pagination = paginate({
  //           limit,
  //           offset,
  //           totalCount: recipeSearchResult.count,
  //           pageSize: recipeSearchResult.rows.length
  //         });
  //         res.status(200).json({
  //           pagination,
  //           totalCount: recipeSearchResult.count,
  //           searchResult: recipeSearchResult.rows
  //         });
  //       }
  //     })
  //     .catch(err => res.status(400).json({
  //       message: 'Recipe not Found',
  //       err
  //     }));
  // }
}

export default Recipe;
