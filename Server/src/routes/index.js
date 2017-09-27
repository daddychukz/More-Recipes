import express from 'express';
import recipeController from '../controller/recipe';
import upvotesController from '../controller/upvotes';
import reviewController from '../controller/reviews';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'More-Recipes' });
});

/* All API Routes */

// Retrieve all recipes
router.get('/api/recipes', recipeController.retrieveRecipes);

// Retrieve single recipe
router.get('/api/recipes/:recipeID', recipeController.retrieveRecipe);

// Add a recipe
router.post('/api/recipes', recipeController.createRecipe);

// Delete a recipe
router.delete('/api/recipes/:recipeID', recipeController.deleteRecipe);

// Update a recipe
router.put('/api/recipes/:recipeID', recipeController.updateRecipe);

// Post a review
router.post('/api/recipes/:recipeID/reviews', reviewController.reviewRecipe);

// Upvote a recipe
router.put('/api/recipes/:recipeID/upvote', upvotesController.upvoteRecipe);

// Get Recipe by Most Upvotes
router.get('/api/recipe', upvotesController.mostRecipeUpvote);


// A catch-all routes not define.
router.get('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

router.delete('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

router.post('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

router.put('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

export default router;
