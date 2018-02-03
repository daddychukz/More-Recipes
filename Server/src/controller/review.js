import isEmpty from 'lodash/isEmpty';
import db from '../models';
import errorHandling from './HandleErrors/errorHandling';

const userReview = db.Review;

/**
 * @class Review
 *@classdesc creates a class Review
 */
class Review {
  /**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static reviewRecipe(request, response) {
    if (!request.body.Review || request.body.Review.trim().length === 0) {
      return response.status(406).json({
        message: 'Review Field should not be Empty',
      });
    }
    userReview.create({
      userId: request.decoded.userId,
      recipeId: request.params.recipeID,
      fullname: request.decoded.fullname,
      review: request.body.Review
    }).then((rev) => {
      response.status(201).json({
        id: rev.id,
        userId: rev.userId,
        recipeId: rev.recipeId,
        review: rev.review,
        createdAt: rev.createdAt,
        User: {
          fullname: rev.fullname,
          publicUrl: request.decoded.publicUrl,
          imageUrl: request.decoded.imageUrl
        }
      });
    })
      .catch((error) => {
        errorHandling.validateRecipeIdErrors(error, response);
      });
  }
  /**
   * retrieveReviews
   * @desc gets all reviews for a recipe
   * Route: GET: '/reviews/:recipeID'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static retrieveReviews(request, response) {
    userReview
      .all({
        where: {
          recipeId: request.params.recipeID,
        },
        include: [{
          model: db.User,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'sex',
              'username', 'address', 'about']
          }
        }]
      })
      .then((reviews) => {
        if (!isEmpty(reviews)) {
          response.status(200).json({ reviews });
        }
        response.status(204);
      })
      .catch(error => errorHandling.validateRecipeIdErrors(error, response));
  }
}

export default Review;
