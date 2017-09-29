/* Dummy data */
const recipeListings = [
  {
    id: 1,
    Title: 'Jollof Beans',
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.',
    Upvotes: 0
  },
  {
    id: 2,
    Title: 'Onion Stew',
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.',
    Upvotes: 3
  },
  {
    id: 3,
    Title: 'Onion Stew',
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.',
    Upvotes: 1
  }
];

/* Upvote a recipe */
const upvoteRecipe = (req, res) => {
  if (!req.body.Username) {
    return res.status(404).json({
      Message: 'Username field should not be empty',
    });
  }
  for (let i = 0; i < recipeListings.length; i++) {
    if (recipeListings[i].id === parseInt(req.params.recipeID, 10)) {
      recipeListings[i].Upvotes += 1;
      return res.status(201).json({
        Message: `${recipeListings[i].Title} has received an upvote by ${req.body.Username}`,
        recipeListings,
      });
    }
  }
  return res.status(404).json({
    Message: 'Recipe not found',
  });
};

/* Most Upvotes */
const mostRecipeUpvote = (req, res) => {
  const compareFunction = ((a, b) => b.Upvotes - a.Upvotes);
  if (req.query.sort === 'upvotes' && req.query.order === 'des') {
    recipeListings.sort(compareFunction);
    res.status(200).send({
      Message: 'Recipe with the Most Upvotes',
      recipeListings,
    });
  }
  return res.status(404).json({
    Message: 'Invalid query string',
  });
};

/* Export all methods */
export default {
  upvoteRecipe,
  mostRecipeUpvote
};

