import db from '../models/';
import paginate from '../services/paginate';

const favoriteModel = db.Favorite;

/**
 * 
 * 
 * @class Favorite
 */
class Favorite {
/**
   * addFavorites
   * @desc adds a recipe to users favorites
   * Route: POST: '/recipes/:recipeID'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static addFavorites(request, response) {
    const { Category } = request.body;
    if (!Category || Category.trim().length === 0) {
      return response.status(406).json({
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
            message: 'Recipe removed from your favorites'
          });
        } else {
          favoriteModel.create({
            userId: request.decoded.userId,
            recipeId: request.params.recipeID,
            category: Category,
            attributes: {
              exclude: ['id']
            }
          }).then((favorite) => {
            response.status(201).send({
              message: 'Recipe added to your favorites',
              favorite
            });
          }).catch(error => response.status(500).send(error));
        }
      });
  }

  /**
   * retrieve user favorites
   * @desc gets all favorites added by a user
   * Route: GET: '/users/:userID/recipes
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
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
        if (recipe) {
          response.status(200).send({
            favoriteRecipe: recipe
          });
        } else {
          response.status(404).send({
            message: 'Record not Found!'
          });
        }
      })
      .catch(() => response.status(400).send({
        message: 'Record not found for this User!'
      }));
  }

  /**
   * Search favorite recipes by a user in the application
   * @method
   * @memberof User
   * @static
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Object} searchString response object
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
