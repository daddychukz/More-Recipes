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
    Title: 'Egusi Soup',
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.',
    Upvotes: 1
  }
];

/* Get all recipes in catalog */
const retrieveAll = (req, res) => res.status(201).json({
  Recipes: recipes,
  Error: false
});

/* Add new recipe */
const create = (req, res) => {
  if (!req.body.id) {
    return res.status(404).json({
      Message: 'ID Missing',
      Error: true
    });
  } else if (!req.body.Title) {
    return res.status(404).json({
      Message: 'Title Missing',
      Error: true
    });
  } else if (!req.body.Description) {
    return res.status(404).json({
      Message: 'Description Missing',
      Error: true
    });
  }
  recipes.push({
    id: req.body.id,
    Title: req.body.Title,
    Description: req.body.Description,
    Upvotes: 0
  });
  res.status(201).json({
    Message: 'Recipe successfully added',
    recipes,
    Error: false
  });
};

/* Delete a recipe */
const Delete = (req, res) => {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === parseInt(req.params.recipeID, 10)) {
      recipes.splice(i, 1);
      return res.status(201).json({
        Message: 'Recipe Successfully Deleted',
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

/* Update a recipe */
const Update = (req, res) => {
  if (!req.body.Title && !req.body.Description) {
    return res.status(404).json({
      Message: 'No Changes Made',
      Error: true
    });
  }
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === parseInt(req.params.recipeID, 10)) {
      recipes[i].Title = req.body.Title;
      recipes[i].Description = req.body.Description;
      return res.status(201).json({
        Message: 'Update Success',
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

/* Get a recipe by ID */
const retrieve = (req, res) => {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === parseInt(req.params.recipeID, 10)) {
      return res.status(201).json({
        Recipe: recipes[i],
        Message: 'Success',
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
  retrieveAll,
  create,
  Delete,
  Update,
  retrieve
};
