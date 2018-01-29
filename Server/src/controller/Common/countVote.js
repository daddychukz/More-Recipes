import db from '../../models/';

const recipeModel = db.Recipe;
const voteModel = db.Vote;

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
    voteModel.count({
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
    voteModel.count({
      where: {
        recipeId: req.params.recipeID,
        vote: false
      }
    }).then((totalUpvotes) => {
      recipeModel.findOne({
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
}

export default countVote;
