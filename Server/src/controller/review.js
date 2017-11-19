import db from '../models';

const userReview = db.Review;
const error = {};

/**
 * @class Review
 *@classdesc creates a class Review
 */
class Review {
  /**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static reviewRecipe(req, res) {
    if (!req.body.Review || req.body.Review.trim().length === 0) {
      return res.status(406).json({
        message: 'Review Field should not be Empty',
      });
    }
    userReview.create({
      userId: req.decoded.userId,
      recipeId: req.params.recipeID,
      fullname: req.decoded.fullname,
      review: req.body.Review
    }).then(rev => res.status(201).json({
      rev }))
      .catch((err) => {
        if (err.parent.routine === 'string_to_uuid') {
          error[0] = { message: 'Invalid Recipe ID' };
        }
        if (err.parent.routine === 'ri_ReportViolation') {
          error[0] = { message: 'User not found' };
        }
        if (!error[0]) {
          error[0] = { message: 'Something Went Wrong', err };
        }
        res.status(406).send(error);
      });
  }
  /**
   * retrieveReviews
   * @desc gets all reviews for a recipe
   * Route: GET: '/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static retrieveReviews(req, res) {
    userReview
      .all({
        include: [{
          model: db.User
        }]
      })
      .then(reviews => res.status(200).json({ reviews }))
      .catch(err => res.status(400).send(err));
  }
}

export default Review;
