/* Dummy data */
const recipes = [
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
      Message: 'Username Missing',
      Error: true
    });
  }
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === parseInt(req.params.recipeID, 10)) {
      recipes[i].Upvotes += 1;
      return res.status(201).json({
        Message: `${recipes[i].Title} has received an upvote by ${req.body.Username}`,
        recipes,
        Error: false
      });
    }
  }
  return res.status(404).json({
    Message: 'Recipe not found',
    Error: true
  });
};

/* Most Upvotes */
const mostRecipeUpvote = (req, res) => {
  const compareFunction = ((a, b) => b.Upvotes - a.Upvotes);
  if (req.query.sort === 'upvotes' && req.query.order === 'des') {
    recipes.sort(compareFunction);
    res.status(200).send({
      Message: 'Most Upvotes',
      recipes,
      Error: false
    });
  }
  return res.status(404).json({
    Message: 'Invalid query string',
    Error: true
  });
};

/* Export all methods */
export default {
  upvoteRecipe,
  mostRecipeUpvote
};

