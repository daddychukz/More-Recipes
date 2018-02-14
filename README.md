[![Build Status](https://travis-ci.org/daddychukz/More-Recipes.svg?branch=develop)](https://travis-ci.org/daddychukz/More-Recipes) [![Coverage Status](https://coveralls.io/repos/github/daddychukz/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/daddychukz/More-Recipes?branch=develop)
[![Code Climate](https://codeclimate.com/github/daddychukz/More-Recipes.png)](https://codeclimate.com/github/daddychukz/More-Recipes) [![codecov](https://codecov.io/gh/daddychukz/More-Recipes/branch/develop/graph/badge.svg)](https://codecov.io/gh/daddychukz/More-Recipes)

# MORE-RECIPES
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they
have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on
More-Recipes and  get feedback in form of reviews and votes from other users who explore that
recipe. Users can also keep a list of their favorite recipes on the application.

<b>View App Here</b> https://chuks-recipes.herokuapp.com/ <br/><br/>
<b>View API Doc Here</b> https://chuks-recipes.herokuapp.com/api-docs

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: React/Redux</li>
  <li>Back-end: NodeJs/Expressjs + Sequelize ORM/Postgresql</li>
  <li>Libraries: jsonwebtoken, ES6, Babel-CLI, eslint, Mocha/Chai</li>
</ul>

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signup</td>
      <td>Create an account</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signin</td>
      <td>Login to the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Creates New Recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/recipes/:recipeID</td>
      <td>Retieve a single recipe</td>
  </tr>
    <tr>
      <td>GET</td>
      <td>/api/v1/recipes/</td>
      <td>Retieve all recipes</td>
  </tr>

  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:recipeID</td>
      <td>Delete a recipe</td>
  </tr>

  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:recipeID<bookId></td>
      <td>Modify Recipe information</td>
  </tr>

  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:recipeID/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:recipeID/downvote</td>
      <td>Downvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:recipeId/reviews </td>
      <td>Post a review</td>
  </tr>
    <tr>
      <td>GET</td>
      <td>/api/v1/reviews/:recipeID </td>
      <td>Get all reviews</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/recipes?sort=upvotes&order=des </td>
      <td>Gets recipe with most Upvotes</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/:userId/recipes</td>
      <td>Gets a user Favorite Recipes</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/search/favorites</td>
      <td>search user favorites</td>
  </tr>
</table>

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
  - Clone the repository
  - Change into the directory
  - Install all required dependencies with `$npm install`
  - Create a `.env` file in your root directory as described in `.env.sample` file
  - Start the app with `npm start`

## Testing
  - Run Server Test `npm test`

## Contribution
- Fork this repository to your GitHub account
- Clone the forked repository
- Create your feature branch
- Commit your changes
- Push to the remote branch
- Open a Pull Request
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide.

## Limitations
The limitations with this current version of More Recipes includes:
* Users cannot receive notifications when a review is made on their post

## FAQs
Contact durugo_chuks@yahoo.com

## LICENSE
#### [MIT](./LICENSE) © [Durugo Chukwukadibia]

Copyright (c) 2018 Durugo Chukwukadibia
