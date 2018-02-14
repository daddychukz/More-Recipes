/**
* @swagger
* definitions:
*   Signup:
*     type: object
*     properties:
*       fullName:
*         type: string
*       email:
*         type: string
*         format: email
*       userName:
*         type: string
*       password:
*         type: string
*         format: password
*       confirmPassword:
*         type: string
*         format: password
*     example:
*       fullName: Adam Eve
*       email: example@example.com
*       userName: username
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
*   UserPass:
*     properties:
*       oldPassword:
*         type: string
*       password:
*         type: string
*         format: password
*       userId:
*         type: string
*     example:
*       oldPassword: password
*       password: password
*       userId: id
*/

/**
* @swagger
* definitions:
*   User:
*     properties:
*       userName:
*         type: string
*       address:
*         type: string
*     example:
*       userName: Enter name
*       address: Enter address
*/

/**
* @swagger
* definitions:
*   Reviews:
*     properties:
*       review:
*         type: string
*     example:
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
* /api/v1/user/profile:
*   get:
*     tags:
*       - Users
*     description: Gets user profile information
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
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
* /api/v1/user/profile/edit:
*   post:
*     tags:
*       - Users
*     description: Edit user profile information
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: User details
*         description: Click on the example to the right and specify field to update
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/User'
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
* /api/v1/user/reset-password:
*   post:
*     tags:
*       - Users
*     description: Change user password
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: User password details
*         description: Click on the example to the right and specify field to update
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/UserPass'
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
* /api/v1/recipes?limit={limit}&offset={offset}&searchString={searchString}:
*   get:
*     tags:
*       - Recipes
*     description: Returns all Recipes
*     produces:
*       - application/json
*     parameters:
*       - name: limit
*         description: Enter limit
*         in: path
*         required: true
*         type: integer
*         format: int32
*         minimum: 0
*       - name: offset
*         description: Enter offset
*         in: path
*         required: true
*         type: integer
*         format: int32
*         minimum: 0
*       - name: searchString
*         description: Filter Recipes
*         in: path
*         type: string
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
* /api/v1/recipes/myrecipes?limit={limit}&offset={offset}:
*   get:
*     tags:
*       - Recipes
*     description: Returns all recipes created by a user
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: limit
*         description: Enter limit
*         in: path
*         required: true
*         type: integer
*         format: int32
*         minimum: 0
*       - name: offset
*         description: Enter offset
*         in: path
*         required: true
*         type: integer
*         format: int32
*         minimum: 0
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
* /api/v1/recipe/{recipeID}:
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
*     description: Post a review on a Recipe
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
*       - name: Post review
*         description: Click on the example to the right and enter new review details
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
* /api/v1/reviews/{recipeID}:
*   get:
*     tags:
*       - Reviews
*     description: Returns all reviews for a recipe
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
*       - name: Specify Recipe category
*         description: Click on the example to the right and enter new review details
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
*       - Upvote
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
* /api/v1/recipes/{recipeID}/downvote:
*   post:
*     tags:
*       - Downvote
*     description: Downvote a Recipe
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
*       200:
*         description: Successful
*/
