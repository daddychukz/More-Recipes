import isEmpty from 'lodash/isEmpty';
import db from '../models';

const recipe = db.Recipe;
const vote = db.votes;
const error = [];

/**
   * downvoteRecipe
   * @desc downvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const downvoteRecipe = (req, res) => {
  recipe.findOne({
    where: {
      recipeId: req.params.recipeID
    },
  }).then((recipes) => {
    if (recipes) {
      // finds if vote by a user for a recipe exists else creates it
      vote
        .findOrCreate({ where: {
          userId: req.decoded.userId,
          recipeId: req.params.recipeID,
          vote: false
        },
        defaults: { vote: false } })
        .spread(() => {
          vote.destroy({
            where: {
              userId: req.decoded.userId,
              recipeId: req.params.recipeID,
              vote: false
            }
          }).then(() => {
            // counts all downvotes in vote table immediately after removing own downvote
            vote
              .count({ where: {
                recipeId: req.params.recipeID,
                vote: false
              }
              }).then((totalDownvotes) => {
                recipe.findOne({
                  where: {
                    recipeId: req.params.recipeID
                  },
                }).then((recipeFound) => {
                  recipeFound.updateAttributes({
                    downvotes: totalDownvotes
                  });
                });
              });
          });
          res.send({
            Message: `${req.decoded.username} removed his Downvote`,
          });
        })
        .catch(() => {
          res.send({
            Message: `${req.decoded.username} downvoted this recipe`,
          });

          // deletes upvote created by same user for same recipe
          vote.destroy({
            where: {
              recipeId: req.params.recipeID,
              userId: req.decoded.userId,
              vote: true
            },
          })
            .then(() => {
              // count all upvotes in vote table after removing previous upvote
              vote
                .count({ where: {
                  recipeId: req.params.recipeID,
                  vote: false
                }
                }).then((totalDownvotes) => {
                  recipe.findOne({
                    where: {
                      recipeId: req.params.recipeID
                    },
                  }).then((recipeFound) => {
                    recipeFound.updateAttributes({
                      downvotes: totalDownvotes
                    });
                  });
                });
              // count all upvotes in vote table after removing previous upvote
              vote
                .count({ where: {
                  recipeId: req.params.recipeID,
                  vote: true
                }
                }).then((totalDownvotes) => {
                  recipe.findOne({
                    where: {
                      recipeId: req.params.recipeID
                    },
                  }).then((recipeFound) => {
                    recipeFound.updateAttributes({
                      upvotes: totalDownvotes
                    });
                  });
                });
            });
        });
    } else {
      res.status(404).send({
        message: 'This recipe record does not exists!'
      });
    }
  })
    .catch((err) => {
      if (err.parent.routine === 'string_to_uuid') {
        error[0] = { message: 'Invalid Recipe ID' };
      }
      if (!error[0]) {
        error[0] = { message: 'Something Went Wrong' };
      }
      res.status(406).json(error); // {error, data: req.body}
    });
};

/* Export all methods */
export default {
  downvoteRecipe
};
