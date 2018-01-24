import db from '../models';

const recipeModel = db.Recipe;
const voteModel = db.Vote;
const errors = [];

/**
 * @class Downvote
 *@classdesc creates a class Recipe
 */
class Downvote {
/**
   * downvoteRecipe
   * @desc downvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static downvoteRecipe(req, res) {
    recipeModel.findOne({
      where: {
        recipeId: req.params.recipeID
      },
    }).then((recipes) => {
      if (recipes) {
      // finds if vote by a user for a recipe exists else creates it
        voteModel
          .findOrCreate({ where: {
            userId: req.decoded.userId,
            recipeId: req.params.recipeID,
            vote: false
          },
          defaults: {} })
          .spread(() => {
            voteModel.destroy({
              where: {
                userId: req.decoded.userId,
                recipeId: req.params.recipeID,
                vote: false
              }
            }).then(() => {
            // counts all downvotes in vote table immediately after removing own downvote
              voteModel
                .count({ where: {
                  recipeId: req.params.recipeID,
                  vote: false
                }
                }).then((totalDownvotes) => {
                  recipeModel.findOne({
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
              message: 'You removed your Downvote',
              value: 0
            });
          })
          .catch(() => {
            res.send({
              message: 'You downvoted this recipe',
              value: 1
            });

            // deletes upvote created by same user for same recipe
            voteModel.destroy({
              where: {
                recipeId: req.params.recipeID,
                userId: req.decoded.userId,
                vote: true
              },
            })
              .then(() => {
              // count all upvotes in vote table after removing previous upvote
                voteModel
                  .count({ where: {
                    recipeId: req.params.recipeID,
                    vote: false
                  }
                  }).then((totalDownvotes) => {
                    recipeModel.findOne({
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
                voteModel
                  .count({ where: {
                    recipeId: req.params.recipeID,
                    vote: true
                  }
                  }).then((totalDownvotes) => {
                    recipeModel.findOne({
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
          errors[0] = { message: 'Invalid Recipe ID' };
        }
        if (!errors[0]) {
          errors[0] = { message: 'Something Went Wrong' };
        }
        res.status(406).json(errors); // {error, data: req.body}
      });
  }
}

/* Export all methods */
export default Downvote;
