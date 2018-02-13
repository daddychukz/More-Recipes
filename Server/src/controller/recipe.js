import isEmpty from 'lodash/isEmpty';
import db from '../models';
import paginate from '../services/paginate';
import errorHandling from './HandleErrors/errorHandling';

const recipeModel = db.Recipe;

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
    if (Number.isNaN(parseInt(limit, 10)) || Number.isNaN(parseInt(offset, 10))) {
      return response.status(406).json({
        message: 'Limit or Offset must be a number',
      });
    }
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
      Title, Description, ImageUrl, PublicId
    } = request.body;
    const { userId, fullname } = request.decoded;
    if (!Title || Title.trim().length === 0) {
      return response.status(406).json({
        message: 'Title Field should not be Empty',
      });
    }
    if (!Description || Description.trim().length === 0) {
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
            imageUrl: ImageUrl,
            publicId: PublicId
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
      Title, Description, ImageUrl, PublicId
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
      if (ImageUrl) {
        updateRecord.imageUrl = ImageUrl;
      }
      if (PublicId) {
        updateRecord.publicId = PublicId;
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
   * @desc gets a single recipe in the catalog
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {object} recipe
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
      .catch(error => errorHandling.validateRecipeIdErrors(error, response));
  }
}

export default Recipe;
