import express from 'express';
import recipeController from '../controller/recipe';
import upvotesController from '../controller/upvotes';
import reviewController from '../controller/reviews';
import userController from '../controller/user';
import Auth from '../middleware/auth';

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

// Get Favorite recipes
router.get('/users/:userID/recipes', Auth.verify, userController.retrieveFavorites);

// Retrieve all recipes
router.get('/recipes', recipeController.retrieveRecipes);

// Retrieve single recipe
router.get('/recipes/:recipeID', Auth.verify, recipeController.retrieveRecipe);

// Add a recipe
router.post('/recipes', Auth.verify, recipeController.createRecipe);

// Add Favorite recipes
router.post('/recipes/:recipeID', Auth.verify, userController.addFavorites);

// Delete a recipe
router.delete('/recipes/:recipeID', Auth.verify, recipeController.deleteRecipe);

// Update a recipe
router.put('/recipes/:recipeID', Auth.verify, recipeController.updateRecipe);

// Post a review
router.post('/recipes/:recipeID/reviews', Auth.verify, reviewController.reviewRecipe);

// Upvote a recipe
router.post('/recipes/:recipeID/upvote', Auth.verify, upvotesController.upvoteRecipe);

// Get Recipe by Most Upvotes
router.get('/recipe', upvotesController.mostRecipeUpvote);


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
