import db from '../models/';
import paginate from '../services/paginate';
import errorHandling from './HandleErrors/errorHandling';

const favoriteModel = db.Favorite;

/**
 * @class Favorite
 */
class Favorite {
/**
   * @description adds a recipe to users favorites
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {void}
   */
  static addFavorites(request, response) {
    const { category } = request.body;
    if (!category || category.trim().length === 0) {
      return response.status(400).json({
        message: 'Category Field should not be Empty',
      });
    }
    favoriteModel
      .findOne({
        where: {
          userId: request.decoded.userId,
          recipeId: request.params.recipeID
        }
      })
      .then((prevFavorite) => {
        if (prevFavorite) {
          prevFavorite.destroy();
          response.status(200).send({
            message: 'Recipe removed from your favorites',
            prevFavorite
          });
        } else {
          favoriteModel.create({
            userId: request.decoded.userId,
            recipeId: request.params.recipeID,
            category,
            attributes: {
              exclude: ['id']
            }
          }).then((favorite) => {
            response.status(201).send({
              message: 'Recipe added to your favorites',
              favorite
            });
          }).catch(() => response.status(404).send({
            message: 'Recipe not found'
          }));
        }
      }).catch((error) => {
        errorHandling.validateRecipeIdErrors(error, response);
      });
  }

  /**
   * @desc gets all favorites added by a user
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} user favorites
   */
  static retrieveFavorites(request, response) {
    favoriteModel
      .all({
        where: {
          userId: request.decoded.userId
        },
        include: [{
          model: db.Recipe
        }],
        attributes: {
          exclude: ['id', 'updatedAt']
        }
      })
      .then((recipe) => {
        if (recipe.length > 0) {
          response.status(200).send({
            favoriteRecipe: recipe
          });
        } else {
          response.status(404).send({
            message: 'No recipe favorited'
          });
        }
      });
  }

  /**
   * @description Search favorite recipes by a user in the application
   *
   * @memberof Favorite
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   * @param {Object} searchString
   *
   * @returns {function} Express middleware function that search
   * users and sends response to client
   */
  static searchUserFavorites(request, response) {
    const { limit, offset, searchString } = request.query;
    return favoriteModel.findAndCountAll({
      limit: request.query.limit,
      offset: request.query.offset,
      order: [['createdAt', 'DESC']],
      where: {
        $and: [
          {
            userId: request.decoded.userId,
          },
          {
            category: {
              $iLike: `%${searchString}%`
            }
          }
        ]
      },
      include: [{
        model: db.Recipe
      }],
      attributes: {
        exclude: ['updatedAt'],
      }
    })
      .then((recipeSearchResult) => {
        if (recipeSearchResult.count === 0) {
          response.status(404).json({
            message: 'Recipe not Found!'
          });
        } else {
          const pagination = paginate({
            limit,
            offset,
            totalCount: recipeSearchResult.count,
            pageSize: recipeSearchResult.rows.length
          });
          response.status(200).json({
            pagination,
            totalCount: recipeSearchResult.count,
            searchResult: recipeSearchResult.rows
          });
        }
      })
      .catch(error => response.status(400).json({
        message: 'Recipe not Found',
        error
      }));
  }
}

export default Favorite;
