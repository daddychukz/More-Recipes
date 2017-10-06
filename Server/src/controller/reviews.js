import db from '../models';

const userReview = db.Reviews;

/**
   * reviewRecipe
   * @desc adds a review to a recipe
   * Route: POST: '/recipes/:recipeID/reviews'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const reviewRecipe = (req, res) => {
  if (!req.body.fullname || req.body.fullname.trim().length === 0) {
    return res.status(400).json({
      Message: 'Name Field should not be Empty',
    });
  } else if (!req.body.title || req.body.title.trim().length === 0) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty',
    });
  } else if (!req.body.review || req.body.review.trim().length === 0) {
    return res.status(400).json({
      Message: 'Review Field should not be Empty',
    });
  }
  userReview.create({
    userId: req.decoded.userId,
    recipeId: req.params.recipeID,
    fullName: req.body.fullname,
    title: req.body.title,
    review: req.body.review
  }).then(rev => res.status(201).json({
    rev }))
    .catch(err => res.status(400).send(err));
};

/* Export all methods */
export default {
  reviewRecipe
};
