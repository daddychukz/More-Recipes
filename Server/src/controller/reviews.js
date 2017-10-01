import db from '../models';

const userReview = db.Reviews;

/* Review a recipe */
const reviewRecipe = (req, res) => {
  if (!req.body.fullname) {
    return res.status(400).json({
      Message: 'Name Field should not be Empty',
    });
  } else if (!req.body.title) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty',
    });
  } else if (!req.body.review) {
    return res.status(400).json({
      Message: 'Review Field should not be Empty',
    });
  }
  userReview.create({
    userId: req.body.userId,
    recipeID: req.params.recipeID,
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
