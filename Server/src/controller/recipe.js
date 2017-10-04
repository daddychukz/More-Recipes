import db from '../models';

const recipeListings = db.Recipe;

/* Get all recipes in catalog */
const retrieveRecipes = (req, res) => recipeListings
  .all()
  .then(recipes => res.status(200).send(recipes))
  .catch(err => res.status(400).send(err));

/* Add new recipe */
const createRecipe = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      Message: 'Title Field should not be Empty',
    });
  } else if (!req.body.description) {
    return res.status(400).json({
      Message: 'Description Field should not be Empty',
    });
  }
  recipeListings.create({
    userId: req.body.user,
    title: req.body.title,
    description: req.body.description
  }).then(recipe => res.status(201).json({
    recipe }))
    .catch(err => res.status(400).send(err));
};

/* Delete a recipe */
const deleteRecipe = (req, res) => recipeListings
  .findById(req.params.recipeID)
  .then((recipe) => {
    recipe
      .destroy()
      .then(res.status(200).send({

      }))
      .catch(err => res.status(400).send(err));
  })
  .catch(() => res.status(404).send({
    message: 'Record Not Found!'
  }));

/* Update a recipe */
const updateRecipe = (req, res) => {
  const updateRecord = {};
  recipeListings.findOne({
    where: {
      recipeId: req.params.recipeID
    },
  }).then((recipe) => {
    if (req.body.title) {
      updateRecord.title = req.body.title;
    } else if (req.body.description) {
      updateRecord.description = req.body.description;
    }
    recipe.update(updateRecord)
      .then(updatedRecipe => res.send({
        updatedRecipe
      }));
  })
    .catch(() => res.status(404).send({
      message: 'Record Not Found'
    }));
};

/* Get a recipe by ID */
const retrieveRecipe = (req, res) => {
  recipeListings
    .findById(req.params.recipeID)
    .then((recipe) => {
      if (recipe) {
        res.status(200).send({
          recipe
        });
      } else {
        res.status(404).send({
          message: 'Record not Found!'
        });
      }
    })
    .catch(() => res.status(400).send({
      message: 'Recipe not Found'
    }));
};

/* Export all methods */
export default {
  retrieveRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  retrieveRecipe
};
