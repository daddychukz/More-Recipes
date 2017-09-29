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

const userReviews = [];

/* Review a recipe */
const reviewRecipe = (req, res) => {
  if (!req.body.Review) {
    return res.status(404).json({
      Message: 'Please enter a review'
    });
  } else if (!req.body.Username) {
    return res.status(404).json({
      Message: 'Please enter your Username',
      Error: true
    });
  }
  for (let i = 0; i < recipeListings.length; i++) {
    if (recipeListings[i].id === parseInt(req.params.recipeID, 10)) {
      userReviews.push({
        Title: recipeListings[i].Title,
        Username: req.body.Username,
        Review: req.body.Review
      });
      return res.status(201).json({
        userReview: userReviews
      });
    }
  }
  return res.status(404).json({
  });
};

/* Export all methods */
export default {
  reviewRecipe
};
