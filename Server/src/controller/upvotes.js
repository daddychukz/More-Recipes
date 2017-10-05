import db from '../models';

const recipe = db.Recipe;

/* Upvote a recipe */
const upvoteRecipe = (req, res) => {
  recipe.findOne({
    where: {
      recipeId: req.params.recipeID
    },
  }).then((recipeFound) => {
    recipeFound.updateAttributes({
      upvotes: recipeFound.upvotes + 1
    })
      .then(updatedRecipe => res.status(200).send({
        Message: `${recipeFound.title} has received an upvote by ${req.body.Username}`,
        updatedRecipe
      }));
  })
    .catch(() => res.status(404).send({
      message: 'Record Not Found'
    }));
};

/* Most Upvotes */
const mostRecipeUpvote = (req, res) => {
  if (req.query.sort === 'upvotes' && req.query.order === 'des') {
    recipe.all({
      order: [['upvotes', 'DESC']]
    })
      .then(recipes => res.status(200).send(recipes))
      .catch(err => res.status(400).send(err));
  } else {
    res.status(404).send({
      message: 'Invalid URL...'
    });
  }
};

/* Export all methods */
export default {
  upvoteRecipe,
  mostRecipeUpvote
};

