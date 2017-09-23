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
router.get('/api/recipes', recipeController.retrieveAll);

// Retrieve single recipe
router.get('/api/recipes/:recipeID', recipeController.retrieve);

// Add a recipe
router.post('/api/recipes', recipeController.create);

// Delete a recipe
router.delete('/api/recipes/:recipeID', recipeController.Delete);

// Update a recipe
router.put('/api/recipes/:recipeID', recipeController.Update);

// Post a review
router.post('/api/recipes/:recipeID/reviews', reviewController.review);

// Upvote a recipe
router.put('/api/recipes/:recipeID/upvote', upvotesController.upvote);

// Get Recipe by Most Upvotes
router.get('/api/recipe', upvotesController.mostUpvote);


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
