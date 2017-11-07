import db from '../models';

const recipe = db.Recipe;
const vote = db.votes;

/**
   * downvoteRecipe
   * @desc downvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const downvoteRecipe = (req, res) => {
  vote
    .findOrCreate({ where: {
      userId: req.decoded.userId,
      recipeId: req.params.recipeID,
      vote: false
    },
    defaults: { vote: false } })
    .spread(() => {
      res.status(403).send({
        Message: `${req.decoded.username} has already downvoted this recipe`,
      });
    })
    .catch(() => {
      res.status(201).send({
        Message: `${req.decoded.username} downvoted this recipe`,
      });
      vote.findOne({
        where: {
          recipeId: req.params.recipeID,
          userId: req.decoded.userId,
          vote: true
        },
      })
        .then((prevUpvote) => {
          if (prevUpvote) {
            prevUpvote
              .destroy();
          }
        });
      vote
        .count({ where: {
          recipeId: req.params.recipeID,
          vote: false
        }
        }).then((totalDownvotes) => {
          if (totalDownvotes) {
            recipe.findOne({
              where: {
                recipeId: req.params.recipeID
              },
            }).then((recipeFound) => {
              recipeFound.updateAttributes({
                downvotes: totalDownvotes
              });
            });
          }
        });
      vote
        .count({ where: {
          recipeId: req.params.recipeID,
          vote: true
        }
        }).then((totalUpvotes) => {
          if (totalUpvotes) {
            recipe.findOne({
              where: {
                recipeId: req.params.recipeID
              },
            }).then((recipeFound) => {
              recipeFound.updateAttributes({
                upvotes: totalUpvotes
              });
            });
          }
        });
    });
};

/* Export all methods */
export default {
  downvoteRecipe
};
