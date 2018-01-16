import db from '../models/';

const recipeModel = db.Recipe;
const voteModel = db.Vote;
const errors = [];

/**
 * @class Upvote
 *@classdesc creates a class Upvote
 */
class Upvote {
/**
   * upvoteRecipe
   * @desc upvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static upvoteRecipe(req, res) {
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
            vote: true
          },
          defaults: { vote: true } })
          .spread(() => {
            voteModel.destroy({
              where: {
                userId: req.decoded.userId,
                recipeId: req.params.recipeID,
                vote: true
              }
            }).then(() => {
            // counts total number of upvotes immediately after removing own upvote
              voteModel
                .count({
                  where: {
                    recipeId: req.params.recipeID,
                    vote: true
                  }
                }).then((totalUpvotes) => {
                  recipeModel.findOne({
                    where: {
                      recipeId: req.params.recipeID
                    },
                  }).then((recipeFound) => {
                    recipeFound.updateAttributes({
                      upvotes: totalUpvotes
                    });
                  });
                });
            });
            res.send({
              message: `${req.decoded.username} removed his Upvote`,
              value: 0
            });
          })
          .catch(() => {
            res.send({
              message: `${req.decoded.username} upvoted this recipe`,
              value: 1
            });

            // deletes downvote created by same user for same recipe
            voteModel.destroy({
              where: {
                recipeId: req.params.recipeID,
                userId: req.decoded.userId,
                vote: false
              },
            }).then(() => {
            // counts total number of upvotes immediately after upvoting
              voteModel
                .count({ where: {
                  recipeId: req.params.recipeID,
                  vote: true
                }
                }).then((total) => {
                  recipeModel.findOne({
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

  /**
   * mostRecipeUpvote
   * @desc Gets recipe with Upvotes in descending order
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static mostRecipeUpvote(req, res) {
    if (req.query.sort === 'upvotes' && req.query.order === 'des') {
      recipeModel.all({
        order: [['upvotes', 'DESC']],
        attributes: {
          exclude: ['id', 'updatedAt']
        },
        limit: 3
      })
        .then(recipes => res.status(200).json({ recipes }))
        .catch(err => res.status(400).send(err));
    } else {
      res.status(404).send({
        message: 'Invalid URL...'
      });
    }
  }
}

export default Upvote;
