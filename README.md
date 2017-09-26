# MORE-RECIPES
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they 
have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on 
More-Recipes and  get feedback in form of reviews and votes from other users who explore that 
recipe. Users can also keep a list of their favorite recipes on the application. 

<b>View App Here</b> https://hello-books.herokuapp.com

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
      <td>/api/recipes</td>
      <td>Creates New Recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes/:recipeID</td>
      <td>Retieve a single recipe</td>
  </tr>
  
  <tr>
      <td>DELETE</td>
      <td>/api/recipes/:recipeID</td>
      <td>Delete a recipe</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/recipes/:recipeID<bookId></td>
      <td>Modify Recipe information</td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/recipes/:recipeID/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
</table>

<h2>Recipe</h2
<hr>

<h3>Create</h3>
<hr>
To add a new Recipe, make a <b>POST</b> request to the end-point /api/recipes

<h4>Request</h4>
<b>POST:</b> /api/recipes <br>
<br>
{<br>
    'id': 1,
    'Title': 'Jollof Beans',
    'Description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.'
}<br>

<h3>Mock Response</h3>
<hr><br>
{<br>
    "Message": "Recipe successfully added",
    "recipes": [
        {
            "id": 1,
            "Title": "Jollof Beans",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.",
            "Upvotes": 0
        }
    ]
}
<hr>

<h3>Review</h3>
<hr>
To add a review to a Recipe, make a <b>POST</b> request to the end-point /api/recipes/:recipeID/reviews

<h4>Request</h4>
<b>POST:</b> /api/recipes/1/reviews <br>
<br>
{<br>
    'Title': 'Jollof Beans',
    'Username': 'Chuks',
    'Review': 'Great Stuff'
}<br>

<h3>Mock Response</h3>
<hr><br>
{<br>
    "Message": "Review added",
    "reviews": [
        {
            "Title": "Jollof Beans",
            "Username": "Chuks",
            "Review": "Great Stuff"
        }
    ],
    "Error": false
}
<hr>

<h3>Upvote</h3>
<hr>
To Upvote a Recipe, make a <b>PUT</b> request to the end-point /api/recipes/:recipeID/upvote

<h4>Request</h4>
<b>PUT:</b> /api/recipes/1/upvote <br>
<br>
{<br>
    'Username': 'Chuks'
}<br>

<h3>Mock Response</h3>
<hr><br>
{<br>
    "Message": "Jollof Beans has received an upvote by Chuks",
    "recipes": [
        {
            "id": 1,
            "Title": "Jollof Beans",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, blanditiis voluptas. Culpa omnis amet sequi iste aperiam possimus impedit inventore.",
            "Upvotes": 1
        },
    ],
    "Error": false
}
