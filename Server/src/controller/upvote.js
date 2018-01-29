import db from '../models/';
import countVote from './Common/countVote';
import errorHandling from './HandleErrors/errorHandling';

const recipeModel = db.Recipe;
const voteModel = db.Vote;

/**
 * @class Upvote
 * @classdesc creates a class Upvote
 */
class Upvote {
  /**
   * upvoteRecipe
   * @desc upvotes a Recipe
   * Route: PUT: /recipes/:recipeID/upvote
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static upvoteRecipe(request, response) {
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
              vote: true
            }
          }).then((vote) => {
            if (vote) {
              voteModel.destroy({
                where: {
                  userId: request.decoded.userId,
                  recipeId: request.params.recipeID,
                  vote: true
                }
              }).then(() => {
                // counts total number of upvotes
                countVote.countUpvote(request);
              });
              response.status(200).send({
                message: 'You removed your Upvote',
                value: 0
              });
            } else {
              voteModel.create({
                userId: request.decoded.userId,
                recipeId: request.params.recipeID,
                vote: true
              }).then(() => {
                response.status(201).send({
                  message: 'You upvoted this recipe',
                  value: 1
                });

                voteModel.destroy({
                  where: {
                    recipeId: request.params.recipeID,
                    userId: request.decoded.userId,
                    vote: false
                  },
                }).then(() => {
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

  /**
   * mostRecipeUpvote
   * @desc Gets recipe with Upvotes in descending order
   * Route: GET: /api/v1/recipe?sort=upvotes&order=des
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static mostRecipeUpvote(request, response) {
    if (request.query.sort === 'upvotes' && request.query.order === 'des') {
      recipeModel.all({
        order: [['upvotes', 'DESC']],
        attributes: {
          exclude: ['id', 'updatedAt']
        },
        limit: 3
      })
        .then(recipes => response.status(200).json({ recipes }))
        .catch(error => response.status(400).send(error));
    } else {
      response.status(404).send({
        message: 'Invalid URL...'
      });
    }
  }
}

export default Upvote;
