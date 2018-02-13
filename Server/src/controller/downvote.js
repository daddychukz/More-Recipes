import db from '../models';
import countVote from './Common/countVote';
import errorHandling from './HandleErrors/errorHandling';

const RecipeModel = db.Recipe;
const VoteModel = db.Vote;

/**
 * @class Downvote
 */
class Downvote {
/**
   * downvoteRecipe
   * @desc downvotes a Recipe
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {void}
   */
  static downvoteRecipe(request, response) {
    RecipeModel.findOne({
      where: {
        recipeId: request.params.recipeID
      },
    }).then((recipes) => {
      if (recipes) {
        VoteModel
          .findOne({
            where: {
              userId: request.decoded.userId,
              recipeId: request.params.recipeID,
              vote: false
            }
          }).then((vote) => {
            if (vote) {
              VoteModel.destroy({
                where: {
                  userId: request.decoded.userId,
                  recipeId: request.params.recipeID,
                  vote: false
                }
              }).then(() => {
              // counts all downvotes
                countVote.countDownvote(request);
              });
              response.send({
                message: 'You removed your Downvote',
                value: 0
              });
            } else {
              VoteModel.create({
                userId: request.decoded.userId,
                recipeId: request.params.recipeID,
                vote: false
              }).then(() => {
                response.send({
                  message: 'You downvoted this recipe',
                  value: 1
                });

                // deletes upvote created by same user for same recipe
                VoteModel.destroy({
                  where: {
                    recipeId: request.params.recipeID,
                    userId: request.decoded.userId,
                    vote: true
                  },
                })
                  .then(() => {
                    countVote.countUpvote(request);
                    countVote.countDownvote(request);
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
