import isEmpty from 'lodash/isEmpty';
import db from '../models';
import paginate from '../services/paginate';
import errorHandling from './HandleErrors/errorHandling';

const RecipeModel = db.Recipe;

/**
 * @class Recipe
 * @classdesc creates a class Recipe
 */
class Recipe {
/**
   * @desc Gets all recipe from catalog
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} recipes
   */
  static retrieveRecipes(request, response) {
    const { limit, offset, searchString } = request.query;
    if (Number.isNaN(parseInt(limit, 10)) ||
    Number.isNaN(parseInt(offset, 10))) {
      return response.status(400).json({
        message: 'Limit or Offset must be a number',
      });
    }
    RecipeModel
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
          response.status(404).json({
            message: 'No Recipe Created'
          });
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
   * @description Gets all recipe created by a user
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {array} recipes
   */
  static myRecipes(request, response) {
    RecipeModel
      .findAndCountAll({
        where: {
          userId: request.decoded.userId,
        },
        order: [['createdAt', 'DESC']],
        limit: request.query.limit,
        offset: request.query.offset
      })
      .then((recipes) => {
        const { limit, offset } = request.query;
        const pagination = paginate({
          limit,
          offset,
          totalCount: recipes.count,
          pageSize: recipes.rows.length
        });
        if (recipes.count === 0) {
          return response.status(404).json({
            message: 'no recipes created'
          });
        }
        return response.status(200).json({
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
   * @description adds a review to a recipe
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} success message
   */
  static createRecipe(request, response) {
    const {
      title, description, imageUrl, publicId
    } = request.body;
    const { userId, fullname } = request.decoded;
    if (!title || title.trim().length === 0) {
      return response.status(400).json({
        message: 'Title Field should not be Empty',
      });
    }
    if (!description || description.trim().length === 0) {
      return response.status(400).json({
        message: 'Description Field should not be Empty',
      });
    }
    RecipeModel
      .findOne({
        where: {
          userId,
          title
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
          RecipeModel.create({
            userId,
            fullname,
            title,
            description,
            imageUrl,
            publicId
          }).then(recipe => response.status(201).json({
            recipe
          })).catch(() => response.status(500).json({
            message: 'Internal server error'
          }));
        }
      });
  }

  /**
   * @desc deletes a recipe from catalog
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} deleted recipe
   */
  static deleteRecipe(request, response) {
    RecipeModel.destroy({
      where: {
        recipeId: request.params.recipeID,
        userId: request.decoded.userId
      }
    })
      .then(() => {
        RecipeModel
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
   * @desc modifies a recipe in the catalog
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} updated recipe
   */
  static updateRecipe(request, response) {
    const updateRecord = {};
    const {
      title, description, imageUrl, publicId
    } = request.body;

    RecipeModel.findOne({
      where: {
        recipeId: request.params.recipeID,
        userId: request.decoded.userId
      },
    }).then((recipe) => {
      if (title) {
        updateRecord.title = title;
      }
      if (description) {
        updateRecord.description = description;
      }
      if (imageUrl) {
        updateRecord.imageUrl = imageUrl;
      }
      if (publicId) {
        updateRecord.publicId = publicId;
      }
      recipe.update(updateRecord)
        .then(() => {
          RecipeModel.all({
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
   * @desc gets a single recipe in the catalog
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {object} recipe
   */
  static retrieveRecipe(request, response) {
    const { userId } = request.decoded;
    RecipeModel
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
      .catch(error => errorHandling.validateRecipeIdErrors(error, response));
  }
}

export default Recipe;
