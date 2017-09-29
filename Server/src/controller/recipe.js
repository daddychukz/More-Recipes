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
    Title: 'Egusi Soup',
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.',
    Upvotes: 1
  }
];

/* Get all recipes in catalog */
const retrieveRecipes = (req, res) => res.status(200).json({
  recipeListings
});

/* Add new recipe */
const createRecipe = (req, res) => {
  if (!req.body.Title) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty',
    });
  } else if (!req.body.Description) {
    return res.status(400).json({
      Message: 'Description Field should not be Empty',
    });
  }
  recipeListings.push({
    id: recipeListings[recipeListings.length - 1].id + 1,
    Title: req.body.Title,
    Description: req.body.Description,
    Upvotes: 0
  });
  res.status(201).json({
    recipeListings,
  });
};

/* Delete a recipe */
const deleteRecipe = (req, res) => {
  for (let i = 0; i < recipeListings.length; i++) {
    if (recipeListings[i].id === parseInt(req.params.recipeID, 10)) {
      recipeListings.splice(i, 1);
      return res.status(200).json({
        recipeListings
      });
    }
  }
  return res.status(404).json({});
};

/* Update a recipe */
const updateRecipe = (req, res) => {
  if (!req.body.Title && !req.body.Description) {
    return res.status(400).json({
      Message: 'Specify a field to update'
    });
  }
  for (let i = 0; i < recipeListings.length; i++) {
    if (recipeListings[i].id === parseInt(req.params.recipeID, 10)) {
      recipeListings[i].Title = req.body.Title;
      recipeListings[i].Description = req.body.Description;
      return res.status(200).json({
        recipeListings
      });
    }
  }
  return res.status(404).json({});
};

/* Get a recipe by ID */
const retrieveRecipe = (req, res) => {
  for (let i = 0; i < recipeListings.length; i++) {
    if (recipeListings[i].id === parseInt(req.params.recipeID, 10)) {
      return res.status(200).json({
        recipeListings: recipeListings[i]
      });
    }
  }
  return res.status(404).json({});
};

/* Export all methods */
export default {
  retrieveRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  retrieveRecipe
};
