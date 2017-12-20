import express from 'express';
import recipeController from '../controller/recipe';
import upvotesController from '../controller/upvote';
import downvotesController from '../controller/downvote';
import reviewController from '../controller/review';
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

// Get User Info
router.get('/user/profile', Auth.verify, userController.getUserProfile);

// Edit User Info
router.post('/user/profile/edit', Auth.verify, userController.updateUserProfile);

// Get one favorite
router.get('/users/:recipeID', Auth.verify, userController.getSingleFavorite);

// Retrieve all recipes created by a user
router.get('/recipes/myrecipes', Auth.verify, recipeController.myRecipes);

// Retrieve all recipes
router.get('/recipes', recipeController.retrieveRecipes);

// Retrieve all reviews
router.get('/reviews', Auth.verify, reviewController.retrieveReviews);

// Retrieve single recipe
router.get('/recipes/:recipeID', Auth.verify, recipeController.retrieveRecipe);

// Add a recipe
router.post('/recipes', Auth.verify, recipeController.createRecipe);

// Add Favorite recipes
router.post('/recipes/:recipeID', Auth.verify, userController.addFavorites);

// Delete a recipe
router.delete('/recipes/:recipeID', Auth.verify, recipeController.deleteRecipe);

// Update a recipe
router.post('/recipe/:recipeID', Auth.verify, recipeController.updateRecipe);

// Post a review
router.post('/recipes/:recipeID/reviews', Auth.verify, reviewController.reviewRecipe);

// Upvote a recipe
router.post('/recipes/:recipeID/upvote', Auth.verify, upvotesController.upvoteRecipe);

// Downvote a recipe
router.post('/recipes/:recipeID/downvote', Auth.verify, downvotesController.downvoteRecipe);

// Get Recipe by Most Upvotes
router.get('/recipe', upvotesController.mostRecipeUpvote);

// Reset Password Request
router.post('/user/reset_password_request', userController.resetPasswordRequest);

// Validate Email Token
router.post('/validate-token', Auth.checkMailToken);

// reset password
router.post('/user/reset-password', userController.resetPassword);


// A catch-all routes not define.
router.use('*', (req, res) => res.status(404).json({
  Message: 'Invalid Route'
}));

export default router;
