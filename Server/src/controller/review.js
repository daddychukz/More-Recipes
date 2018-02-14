import isEmpty from 'lodash/isEmpty';
import db from '../models';
import errorHandling from './HandleErrors/errorHandling';

const UserReview = db.Review;

/**
 * @class Review
 * @classdesc creates a class Review
 */
class Review {
  /**
   * @description adds a review to a recipe
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {object} review
   */
  static reviewRecipe(request, response) {
    if (!request.body.review || request.body.review.trim().length === 0) {
      return response.status(400).json({
        message: 'Review Field should not be Empty',
      });
    }
    UserReview.create({
      userId: request.decoded.userId,
      recipeId: request.params.recipeID,
      fullname: request.decoded.fullname,
      review: request.body.review
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
   * @description gets all reviews for a recipe
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {array} reviews
   */
  static retrieveReviews(request, response) {
    UserReview
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
          return response.status(200).json({ reviews });
        }
        response.status(404).json({
          message: 'No Reviews Created'
        });
      })
      .catch(error => errorHandling.validateRecipeIdErrors(error, response));
  }
}

export default Review;
