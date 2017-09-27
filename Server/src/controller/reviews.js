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

const reviews = [];

/* Review a recipe */
const reviewRecipe = (req, res) => {
  if (!req.body.Review) {
    return res.status(404).json({
      Message: 'Review Missing',
      Error: true
    });
  } else if (!req.body.Username) {
    return res.status(404).json({
      Message: 'Username Missing',
      Error: true
    });
  }
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === parseInt(req.params.recipeID, 10)) {
      reviews.push({
        Title: recipes[i].Title,
        Username: req.body.Username,
        Review: req.body.Review
      });
      return res.status(201).json({
        Message: 'Review added',
        reviews,
        Error: false
      });
    }
  }
  return res.status(404).json({
    Message: 'Recipe not found',
    Error: true
  });
};

/* Export all methods */
export default {
  reviewRecipe
};
