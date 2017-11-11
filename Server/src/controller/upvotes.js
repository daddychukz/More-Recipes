import isEmpty from 'lodash/isEmpty';
import db from '../models';

const recipe = db.Recipe;
const vote = db.votes;
const error = [];

/**
   * upvoteRecipe
   * @desc upvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const upvoteRecipe = (req, res) => {
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
          vote: true
        },
        defaults: { vote: true } })
        .spread(() => {
          vote.destroy({
            where: {
              userId: req.decoded.userId,
              recipeId: req.params.recipeID,
              vote: true
            }
          }).then(() => {
            // counts total number of upvotes immediately after removing own upvote
            vote
              .count({
                where: {
                  recipeId: req.params.recipeID,
                  vote: true
                }
              }).then((total) => {
                recipe.findOne({
                  where: {
                    recipeId: req.params.recipeID
                  },
                }).then((recipeFound) => {
                  recipeFound.updateAttributes({
                    upvotes: total
                  });
                });
              });
          });
          res.send({
            Message: `${req.decoded.username} removed his Upvote`,
          });
        })
        .catch(() => {
          res.send({
            Message: `${req.decoded.username} upvoted this recipe`,
          });

          // deletes downvote created by same user for same recipe
          vote.destroy({
            where: {
              recipeId: req.params.recipeID,
              userId: req.decoded.userId,
              vote: false
            },
          }).then(() => {
            // counts total number of upvotes immediately after upvoting
            vote
              .count({ where: {
                recipeId: req.params.recipeID,
                vote: true
              }
              }).then((total) => {
                recipe.findOne({
                  where: {
                    recipeId: req.params.recipeID
                  },
                }).then((recipeFound) => {
                  recipeFound.updateAttributes({
                    upvotes: total
                  });
                });
              });

            // counts total number of downvotes after deleting previous downvote 
            vote
              .count({ where: {
                recipeId: req.params.recipeID,
                vote: false
              }
              }).then((total) => {
                recipe.findOne({
                  where: {
                    recipeId: req.params.recipeID
                  },
                }).then((recipeFound) => {
                  recipeFound.updateAttributes({
                    downvotes: total
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
      res.status(400).json(error); // {error, data: req.body}
    });
};

/**
   * mostRecipeUpvote
   * @desc Gets recipe with Upvotes in descending order
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

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
  // recipe.findAndCountAll({
  //   include: [
  //     { model: vote, where: { vote: true } }
  //   ],
  //   limit: 3
  // });
};

/* Export all methods */
export default {
  upvoteRecipe,
  mostRecipeUpvote
};
