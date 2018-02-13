import db from '../../models/';

const RecipeModel = db.Recipe;
const VoteModel = db.Vote;

const countVote = {
/**
   *
   *
   * @static
   * @param {any} req
   * @param {any} vote
   * @memberof Upvote
   * @returns {number} votes
   */
  countUpvote(req) {
    VoteModel.count({
      where: {
        recipeId: req.params.recipeID,
        vote: true
      }
    }).then((totalUpvotes) => {
      RecipeModel.findOne({
        where: {
          recipeId: req.params.recipeID
        },
      }).then((recipeFound) => {
        recipeFound.updateAttributes({
          upvotes: totalUpvotes
        });
      });
    });
  },

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} vote
   * @memberof Upvote
   * @returns {number} votes
   */
  countDownvote(req) {
    VoteModel.count({
      where: {
        recipeId: req.params.recipeID,
        vote: false
      }
    }).then((totalUpvotes) => {
      RecipeModel.findOne({
        where: {
          recipeId: req.params.recipeID
        },
      }).then((recipeFound) => {
        recipeFound.updateAttributes({
          downvotes: totalUpvotes
        });
      });
    });
  }
};

export default countVote;
