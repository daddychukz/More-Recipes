import db from '../../models/';

const recipeModel = db.Recipe;
const voteModel = db.Vote;

/**
   * 
   * 
   * @static
   * @param {any} req
   * @param {any} vote
   * @memberof Upvote
   * @returns {number} votes
   */
const countVote = (req, vote) => {
  voteModel.count({
    where: {
      recipeId: req.params.recipeID,
      vote
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
};

export default countVote;
