import express from 'express';
import recipeController from '../controller/recipe';
import upvotesController from '../controller/upvotes';
import reviewController from '../controller/reviews';
import userController from '../controller/user';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'More-Recipes' });
});

/* All API Routes */

// Register a new User
router.post('/users/signup', userController.signUp);

// Login route
router.post('/users/signin', userController.signIn);

// Get Recipe by Most Upvotes
router.get('/recipe', userController.favorites);

// Retrieve all recipes
router.get('/recipes', recipeController.retrieveRecipes);

// Retrieve single recipe
router.get('/recipes/:recipeID', recipeController.retrieveRecipe);

// Add a recipe
router.post('/recipes', recipeController.createRecipe);

// Delete a recipe
router.delete('/recipes/:recipeID', recipeController.deleteRecipe);

// Update a recipe
router.put('/recipes/:recipeID', recipeController.updateRecipe);

// Post a review
router.post('/recipes/:recipeID/reviews', reviewController.reviewRecipe);

// Upvote a recipe
router.put('/recipes/:recipeID/upvote', upvotesController.upvoteRecipe);

// Get all Favorite recipes
router.get('/users/:userID/recipes', upvotesController.mostRecipeUpvote);


// A catch-all routes not define.
router.get('*', (req, res) => res.status(404).json({
  Message: 'Invalid Route'
}));

router.delete('*', (req, res) => res.status(404).json({
  Message: 'Invalid Route'
}));

router.post('*', (req, res) => res.status(404).json({
  Message: 'Invalid Route'
}));

router.put('*', (req, res) => res.status(404).json({
  Message: 'Invalid Route'
}));

export default router;
