import isEmpty from 'lodash/isEmpty';
import db from '../models';
import paginate from '../services/paginate';

const recipeModel = db.Recipe;

/**
 * @class Recipe
 * @classdesc creates a class Recipe
 */
class Recipe {
/**
   * retrieveRecipe
   * @desc Gets all recipe from catalog
   * Route: GET: '/recipes'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static retrieveRecipes(request, response) {
    const { limit, offset, searchString } = request.query;
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
          response.status(204);
        } else {
          const pagination = paginate({
            limit,
            offset,
            totalCount: recipes.count,
            pageSize: recipes.rows.length
          });
          response.status(200).json({
            pagination,
            recipes: recipes.rows
          });
        }
      })
      .catch(error => response.status(500).json({
        message: 'Internal Server Error',
        error
      }));
  }

  /**
   * myRecipe
   * @desc Gets all recipe created by a user
   * Route: GET: '/recipes/myrecipes'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static myRecipes(request, response) {
    recipeModel
      .findAndCountAll({
        where: {
          userId: request.decoded.userId,
        },
        order: [['createdAt', 'DESC']],
        limit: request.query.limit,
        offset: request.query.offset
      })
      .then((recipes) => {
        if (recipes.count === 0) {
          response.status(204);
        }
        const { limit, offset } = request.query;
        const pagination = paginate({
          limit,
          offset,
          totalCount: recipes.count,
          pageSize: recipes.rows.length
        });
        response.status(200).json({
          pagination,
          recipes: recipes.rows
        });
      })
      .catch(error => response.status(500).json({
        message: 'Internal Server Error',
        error
      }));
  }

  /**
   * createRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static createRecipe(request, response) {
    const {
      Title, Description, imageUrl, publicId
    } = request.body;
    const { userId, fullname } = request.decoded;
    if (!Title || Title.trim().length === 0) {
      return response.status(406).json({
        message: 'Title Field should not be Empty',
      });
    } else if (!Description || Description.trim().length === 0) {
      return response.status(406).json({
        message: 'Description Field should not be Empty',
      });
    }
    recipeModel
      .findOne({
        where: {
          userId,
          title: Title
        },
        attributes: {
          exclude: ['imageUrl', 'publicId', 'fullname', 'updatedAt']
        }
      })
      .then((recipeFound) => {
        if (recipeFound) {
          response.status(409).json({
            message: 'You already have a recipe with this Title'
          });
        } else {
          recipeModel.create({
            userId,
            fullname,
            title: Title,
            description: Description,
            imageUrl,
            publicId
          }).then(recipe => response.status(201).json({
            recipe
          })).catch(() => response.status(500).json({
            message: 'Internal server error',
          }));
        }
      });
  }

  /**
   * deleteRecipe
   * @desc deletes a recipe from catalog
   * Route: DELETE: '/recipes/:recipeID'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static deleteRecipe(request, response) {
    recipeModel.destroy({
      where: {
        recipeId: request.params.recipeID,
        userId: request.decoded.userId
      }
    })
      .then(() => {
        recipeModel
          .findAndCountAll({
            where: {
              userId: request.decoded.userId,
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
            response.status(200).send({
              message: 'Recipe successfully deleted!',
              pagination,
              recipes
            });
          });
      })
      .catch(() => response.status(404).send({
        message: 'Record not found for this User!'
      }));
  }

  /**
   * updateRecipe
   * @desc modifies a recipe in the catalog
   * Route: PUT: '/recipes/:recipeID'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static updateRecipe(request, response) {
    const updateRecord = {};
    const {
      Title, Description, imageUrl, publicId
    } = request.body;

    recipeModel.findOne({
      where: {
        recipeId: request.params.recipeID,
        userId: request.decoded.userId
      },
    }).then((recipe) => {
      if (Title) {
        updateRecord.title = Title;
      }
      if (Description) {
        updateRecord.description = Description;
      }
      if (imageUrl) {
        updateRecord.imageUrl = imageUrl;
      }
      if (publicId) {
        updateRecord.publicId = publicId;
      }
      recipe.update(updateRecord)
        .then(() => {
          recipeModel.all({
            where: {
              userId: request.decoded.userId
            },
            order: [['createdAt', 'DESC']],
          })
            .then(updatedRecipe => response.send({
              updatedRecipe,
            }));
        });
    })
      .catch(() => response.status(404).send({
        message: 'Record not found for this User'
      }));
  }

  /**
   * retrieveRecipe
   * @desc gets a single recipe in the catalog
   * Route: GET: '/recipes/:recipeID'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static retrieveRecipe(request, response) {
    const { userId } = request.decoded;
    recipeModel
      .findOne({
        where: {
          recipeId: request.params.recipeID,
        },
        include: [{
          model: db.Vote
        }],
      })
      .then((recipe) => {
        if (isEmpty(recipe)) {
          response.status(404).json({
            message: 'Record not Found!'
          });
        } else if (recipe) {
          if (recipe.userId === userId && !recipe.isViewed) {
            recipe.update(
              { isViewed: true, viewsCount: recipe.viewsCount + 1 },
              { returning: true }
            ).then(response.status(200).json({
              recipe
            }));
          } else if (recipe.userId === userId && recipe.isViewed) {
            response.status(200).json({
              recipe
            });
          } else if (recipe.userId !== userId) {
            recipe.update(
              { viewsCount: recipe.viewsCount + 1 },
              { returning: true }
            ).then(response.status(200).json({
              recipe
            }));
          }
        }
      })
      .catch(error => response.status(500).json({
        message: 'Internal Server Error',
        error
      }));
  }
}

export default Recipe;
