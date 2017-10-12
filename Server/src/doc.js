/**
* @swagger
* definitions:
*   Signup:
*     type: object
*     properties:
*       fullname:
*         type: string
*       email:
*         type: string
*         format: email
*       sex:
*         type: string
*       username:
*         type: string
*       password:
*         type: string
*         format: password
*       confirmPassword:
*         type: string
*         format: password
*     example:
*       fullname: Adam Eve
*       email: example@example.com
*       sex: male
*       username: username
*       password: password
*       confirmPassword: password
*/

/**
* @swagger
* definitions:
*   Signin:
*     properties:
*       email:
*         type: string
*         format: email
*       password:
*         type: string
*         format: password
*     example:
*       email: example@example.com
*       password: password
*/

/**
* @swagger
* definitions:
*   Recipes:
*     properties:
*       title:
*         type: string
*       description:
*         type: string
*     example:
*       title: Jollof Rice
*       description: lorem ipsum bla bla bla
*/

/**
* @swagger
* definitions:
*   Favorites:
*     properties:
*       category:
*         type: string
*     example:
*       category: Lunch
*/

/**
* @swagger
* definitions:
*   Reviews:
*     properties:
*       title:
*         type: string
*       fullname:
*         type: string
*       review:
*         type: string
*     example:
*       title: Jollof Rice
*       fullname: Ade
*       review: Cool Stuff!
*/

// Register a new User
/**
* @swagger
* /api/v1/users/signup:
*   post:
*     tags:
*       - Users
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Registration
*         description: Enter your details as shown in the example to the right
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signup'
*     responses:
*       201:
*         description: Successfully Registered
*/

/**
* @swagger
* /api/v1/users/signin:
*   post:
*     tags:
*       - Users
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signin'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes:
*   post:
*     tags:
*       - Recipes
*     description: Add a new Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: Post Recipe
*         description: Click on the example to the right and enter new Recipe details
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       201:
*         description: Successfully created
*/

/**
* @swagger
* /api/v1/recipes:
*   get:
*     tags:
*       - Recipes
*     description: Returns all Recipes
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Successful
*         schema:
*           $ref: '#/definitions/Recipes'
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeID}:
*   get:
*     tags:
*       - Recipes
*     description: Returns a single Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Recipe's id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successful
*         schema:
*           
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeID}:
*   delete:
*     tags:
*       - Recipes
*     description: Delete a Recipe From Catalog
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Enter Recipe ID to be deleted
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeID}:
*   put:
*     tags:
*       - Recipes
*     description: Update a Recipe Information
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Enter Recipe ID
*         in: path
*         required: true
*         type: string
*       - name: Recipe Details
*         description: Click on the example to the right and specify field to update
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeID}/upvote:
*   post:
*     tags:
*       - Votes
*     description: Upvote a Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Enter Recipe ID
*         in: path
*         required: true
*         type: string
*     responses:
*       201:
*         description: Successful
*/

/**
* @swagger
* /api/v1/recipe?sort=upvotes&order=des:
*   get:
*     tags:
*       - Votes
*     description: Returns all Recipes by most Upvotes
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeID}/reviews:
*   post:
*     tags:
*       - Reviews
*     description: Post a Review on a Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Enter Recipe ID
*         in: path
*         required: true
*         type: string
*       - name: Post Review
*         description: Click on the example to the right and enter new Review details
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Reviews'
*     responses:
*       201:
*         description: Successfully created
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/recipes/{recipeID}:
*   post:
*     tags:
*       - Favorites
*     description: Add favorite Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: recipeID
*         description: Enter Recipe ID
*         in: path
*         required: true
*         type: string
*       - name: Specify Recipe Category
*         description: Click on the example to the right and enter new Review details
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Favorites'
*     responses:
*       201:
*         description: Successful
*/

/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/v1/users/{userID}/recipes:
*   get:
*     tags:
*       - Favorites
*     description: Returns all Favorited Recipes
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: userID
*         description: Enter User ID
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successful
*/
