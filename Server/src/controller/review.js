import isEmpty from 'lodash/isEmpty';
import db from '../models';
import errorHandling from './HandleErrors/errorHandling';

const userReview = db.Review;

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
   * @description gets all reviews for a recipe
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {array} reviews
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
          return response.status(200).json({ reviews });
        }
        response.status(204).send();
      })
      .catch(error => errorHandling.validateRecipeIdErrors(error, response));
  }
}

export default Review;
