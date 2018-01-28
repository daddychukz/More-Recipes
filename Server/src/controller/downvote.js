import db from '../models';
import countVote from './Common/VoteOperations';
import errorHandling from './HandleErrors/errorHandling';

const recipeModel = db.Recipe;
const voteModel = db.Vote;

/**
 * @class Downvote
 * @classdesc creates a class Recipe
 */
class Downvote {
/**
   * downvoteRecipe
   * @desc downvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static downvoteRecipe(request, response) {
    recipeModel.findOne({
      where: {
        recipeId: request.params.recipeID
      },
    }).then((recipes) => {
      if (recipes) {
        voteModel
          .findOne({
            where: {
              userId: request.decoded.userId,
              recipeId: request.params.recipeID,
              vote: false
            }
          }).then((vote) => {
            if (vote) {
              voteModel.destroy({
                where: {
                  userId: request.decoded.userId,
                  recipeId: request.params.recipeID,
                  vote: false
                }
              }).then(() => {
              // counts all downvotes
                countVote(request, false);
              });
              response.send({
                message: 'You removed your Downvote',
                value: 0
              });
            } else {
              voteModel.create({
                userId: request.decoded.userId,
                recipeId: request.params.recipeID,
                vote: false
              }).then(() => {
                response.send({
                  message: 'You downvoted this recipe',
                  value: 1
                });

                // deletes upvote created by same user for same recipe
                voteModel.destroy({
                  where: {
                    recipeId: request.params.recipeID,
                    userId: request.decoded.userId,
                    vote: true
                  },
                })
                  .then(() => {
                    countVote(request, false);
                    countVote(request, true);
                  });
              });
            }
          });
      } else {
        response.status(404).send({
          message: 'This recipe record does not exists!'
        });
      }
    })
      .catch((error) => {
        errorHandling.validateRecipeIdErrors(error, response);
      });
  }
}

/* Export all methods */
export default Downvote;
