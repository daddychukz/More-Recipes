[![Build Status](https://travis-ci.org/daddychukz/More-Recipes.svg?branch=feature_API_Badges_Dummy_Data)](https://travis-ci.org/daddychukz/More-Recipes) [![Coverage Status](https://coveralls.io/repos/github/daddychukz/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/daddychukz/More-Recipes?branch=develop)
[![Code Climate](https://codeclimate.com/github/daddychukz/More-Recipes.png)](https://codeclimate.com/github/daddychukz/More-Recipes)

# MORE-RECIPES
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they 
have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on 
More-Recipes and  get feedback in form of reviews and votes from other users who explore that 
recipe. Users can also keep a list of their favorite recipes on the application. 

<b>View App Here</b> https://chuks-recipes.herokuapp.com/api/v1

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: React/Redux + Bootstrap (To be Implemented)</li>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres</li>
  <li>Libraries: jsonwebtoken, ES6, Babel-CLI, eslint, Mocha/Chai</li>
  <li>Postman</li>
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
      <td>/api/recipes/:recipeId/reviews </td>
      <td>Post a review</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes?sort=upvotes&order=des </td>
      <td>Gets recipe with most Upvotes</td>
  </tr>
</table>

<h2>User</h2
<hr>

<h3>Signup</h3>
<hr>
To create an account, make a <b>POST</b> request to the end-point /api/v1/users/signup

<h4>Request</h4>
<b>POST:</b> /api/v1/users/signup <br>
<br>
{<br>
    fullname: 'user-one',<br>
    email: 'user@yahoo.com',<br>
    sex: 'male',<br>
    username: 'user1',<br>
    password: 'user1',<br>
    confirmPassword: 'user1'<br>
}<br>

<h3>Mock Response</h3>
<hr><br>
{<br>
    "user": {<br>
        "userId": "3fee13ba-4d1e-4dc1-a056-bc590f283032",<br>
        "fullName": "user-one",<br>
        "email": "user@yahoo.com",<br>
        "sex": "male",<br>
        "userName": "user",<br>
        "password": "$2a$08$dVSI4eJCKc2/Y5JtPVRz3O.0.ioQmQQrVkhQpqxOAskvuSM6Mt90K",<br>
        "confirmPassword": "$2a$08$DEvirC7cCwzrAJpWjrAb..pB7PnRJnjVpGJ0WP4la7/yPrHs4sRq2",<br>
        "updatedAt": "2017-10-05T05:07:57.944Z",<br>
        "createdAt": "2017-10-05T05:07:57.944Z"<br>
}
<hr>

<h3>Signin</h3>
<hr>
To Signin to the app, make a <b>POST</b> request to the end-point /api/v1/users/signin

<h4>Request</h4>
<b>POST:</b> /api/v1/users/signin <br>
<br>
{<br>
    email: 'user@yahoo.com',<br>
    password: 'user1',<br>
}<br>

<h3>Mock Response</h3>
<hr><br>
{<br>
    "message": "Welcome user",
    "token": "Token appears here"
}
<hr>

<h3>Recipe</h3>
<hr>
To add a recipe, make a <b>POST</b> request to the end-point /api/v1/recipes

<h4>Request</h4>
<b>POST:</b> /api/v1/recipes <br>
<br>
{<br>
    title: 'Beans',<br>
    description: 'This is how to prepare beans'<br>
}<br>

<h3>Mock Response</h3>
<hr><br>
[<br{<br>
        "recipeId": "d6fe9138-6d1e-42a1-93c1-c3fdf7175d73",<br>
        "userId": "5fb6bb5f-8985-4908-925c-f0557df356f0",<br>
        "title": "Beans",<br>
        "description": "This is how to prepare beans",<br>
        "upvotes": 0,<br>
        "createdAt": "2017-10-05T04:50:51.481Z",<br>
        "updatedAt": "2017-10-05T04:50:51.481Z"<br>
    }<br>
]
<hr>

