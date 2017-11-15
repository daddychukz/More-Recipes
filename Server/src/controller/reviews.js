import db from '../models';

const userReview = db.Reviews;
const error = {};

/**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const reviewRecipe = (req, res) => {
  if (!req.body.review || req.body.review.trim().length === 0) {
    return res.status(406).json({
      Message: 'Review Field should not be Empty',
    });
  }
  userReview.create({
    userId: req.decoded.userId,
    recipeId: req.params.recipeID,
    fullName: req.decoded.fullname,
    review: req.body.review
  }).then(rev => res.status(201).json({
    rev }))
    .catch((err) => {
      if (err.parent.routine === 'string_to_uuid') {
        error[0] = { message: 'Invalid Recipe ID' };
      }
      if (!error[0]) {
        error[0] = { message: 'Something Went Wrong' };
      }
      res.status(406).send(error);
    });
};

const retrieveReviews = (req, res) => userReview
  .all({
    include: [{
      model: db.User
    }]
  })
  .then(reviews => res.status(200).json({ reviews }))
  .catch(err => res.status(400).send(err));

/* Export all methods */
export default {
  reviewRecipe,
  retrieveReviews
};
