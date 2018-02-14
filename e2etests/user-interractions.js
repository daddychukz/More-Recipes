module.exports = {
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .windowMaximize()
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .pause(3000)
      .assert.containsText('#signIn', 'Signin')
      .assert.containsText('#signUp', 'Signup')
      .assert.containsText('#logo', 'More-Recipes')
      .assert.attributeContains('#signIn', 'role', 'button')
      .assert.attributeContains('#signUp', 'role', 'button')
      .assert.containsText('.card-body', 'Log Into Your Account')
      .assert.elementPresent('form')
      .pause(1000);
  },

  'it should not signin a user who has not registered': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a#signIn')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[value=Login]')
      .setValue('input[name=email]', 'John@yahoo.com')
      .setValue('input[name=password]', 'John123')
      .click('input[value=Login]')
      .pause(3000)
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast').text.to.equal('Please register to signin');
    browser.pause(1000);
  },

  'Does not sign user up without filling appropriate fields': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a#signUp')
      .assert.elementPresent('input[name=fullName]')
      .assert.elementPresent('input[name=userName]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=confirmPassword]')
      .assert.elementPresent('input[value=Register]')
      .click('a#signUp')
      .waitForElementVisible('#signup-form', 5000)
      .setValue('input[name=fullName]', 'John Doe')
      .setValue('input#email', 'john@yahoo.com')
      .setValue('input#password', 'John123')
      .setValue('input[name=confirmPassword]', 'John12')
      .click('input[value=Register]')
      .pause(3000)
      .assert.urlEquals('http://localhost:8080/')
      .pause(1000);
  },

  'user gets error when signup field is not properly field': (browser) => {
    browser
      .refresh()
      .click('a#signUp')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a#signUp')
      .assert.elementPresent('input[name=fullName]')
      .assert.elementPresent('input[name=userName]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=confirmPassword]')
      .assert.elementPresent('input[value=Register]')
      .click('a#signUp')
      .waitForElementVisible('#signup-form', 5000)
      .setValue('input[name=fullName]', 'John Doe')
      .setValue('input[name=userName]', 'Johnny')
      .setValue('input#email', 'john@yahoo.com')
      .setValue('input#password', 'John123')
      .setValue('input[name=confirmPassword]', 'John12')
      .click('input[value=Register]')
      .pause(3000)
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast').text.to.equal('Passwords do not match');
    browser.pause(1000);
  },

  'it registers a user and redirect to recipe box': (browser) => {
    browser
      .refresh()
      .click('a#signUp')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a#signUp')
      .assert.elementPresent('input[name=fullName]')
      .assert.elementPresent('input[name=userName]')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('input[name=confirmPassword]')
      .assert.elementPresent('input[value=Register]')
      .setValue('input[name=fullName]', 'John Doe')
      .setValue('input[name=userName]', 'Johnny')
      .setValue('input#email', 'john@yahoo.com')
      .setValue('input#password', 'John123')
      .setValue('input[name=confirmPassword]', 'John123')
      .pause(1000)
      .click('input[value=Register]')
      .pause(3000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .expect.element('#Fname').text.to.equal('John Doe');
    browser.pause(1000);
  },

  'cannot add recipe without title or description': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#addRecipe')
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('textarea[name=description]', 'Awesome recipe')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .pause(1000);
  },

  'user can add a recipe to recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .refresh()
      .click('a#addRecipe')
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Jollof Rice')
      .setValue('textarea[name=description]', 'Awesome recipe')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .pause(1000);
  },

  'user cannot add duplicate recipe titles': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#addRecipe')
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Jollof Rice')
      .setValue('textarea[name=description]', 'Awesome recipe')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast')
      .text
      .to
      .equal('You already have a recipe with this Title');
    browser.pause(1000);
  },

  'user can add a second recipe to recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .refresh()
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Yam & Stew')
      .setValue('textarea[name=description]', 'Super cool')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .pause(1000);
  },

  'user can add a third recipe to recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#addRecipe')
      .pause(1000)
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Egusi')
      .setValue('textarea[name=description]', 'Super cool')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .pause(1000);
  },

  'user can add a fourth recipe to recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#addRecipe')
      .pause(1000)
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Egg Sauce')
      .setValue('textarea[name=description]', 'Super cool')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .pause(1000);
  },

  'user can add a fifth recipe to recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#addRecipe')
      .pause(1000)
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Potatoes')
      .setValue('textarea[name=description]', 'Super cool')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .pause(1000);
  },

  'user can add a sixthrecipe to recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#addRecipe')
      .pause(1000)
      .waitForElementVisible('#recipe-form', 5000)
      .assert.urlEquals('http://localhost:8080/add-recipe')
      .setValue('input[name=title]', 'Bread & Tea')
      .setValue('textarea[name=description]', 'Super cool')
      .pause(2000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .pause(1000);
  },

  'user can search for a recipe in recipe box': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .assert.urlEquals('http://localhost:8080/recipe-box')
      .setValue('input#search', 'Yam')
      .pause(2000)
      .expect.element('#recipe-title').text.to.equal('Yam & Stew');
    browser
      .pause(1000);
  },

  'user can view a recipe': (browser) => {
    browser
      .assert.containsText('#logo', 'More-Recipes')
      .click('a#recipe-title')
      .pause(1000)
      .assert.urlContains('http://localhost:8080/recipe/')
      .waitForElementVisible('#display', 5000)
      .expect.element('#desc').text.to.equal('Super cool');
    browser.expect.element('img').to.have
      .attribute(
        'src',
        'http://res.cloudinary.com/chuks-andela32/image/upload/c_scale,dpr_auto,h_200,w_300/home_gipmmy.jpg'
      );
    browser.pause(1000);
  },

  'user can upvote a recipe': (browser) => {
    browser
      .assert.attributeContains('a.btn-sm', 'title', 'Upvote')
      .assert.urlContains('http://localhost:8080/recipe/')
      .click('a#upvote')
      .pause(2000)
      .expect.element('span[title=Upvotes]').text.to.equal(1);
    browser
      .expect.element('.toast').text.to.equal('You upvoted this recipe');
    browser.pause(1000);
  },

  'user can downvote a recipe': (browser) => {
    browser
      .assert.attributeContains('#downvote', 'title', 'Downvote')
      .assert.urlContains('http://localhost:8080/recipe/')
      .click('a#downvote')
      .pause(2000)
      .expect.element('span[title=Downvotes]').text.to.equal(1);
    browser
      .expect.element('span[title=Upvotes]').text.to.equal(0);
    browser
      .expect.element('.toast').text.to.equal('You downvoted this recipe');
    browser.pause(1000);
  },

  'user can remove downvote': (browser) => {
    browser
      .assert.attributeContains('#downvote', 'title', 'Downvote')
      .assert.urlContains('http://localhost:8080/recipe/')
      .click('a#downvote')
      .pause(2000)
      .expect.element('span[title=Downvotes]').text.to.equal(0);
    browser
      .expect.element('span[title=Upvotes]').text.to.equal(0);
    browser
      .expect.element('.toast').text.to.equal('You downvoted this recipe');
    browser.pause(1000);
  },

  'user can favorite a recipe': (browser) => {
    browser
      .assert.attributeContains('#favorite', 'title', 'Favorite')
      .assert.urlContains('http://localhost:8080/recipe/')
      .click('a#favorite')
      .pause(1000)
      .setValue('input[name=category]', 'Breakfast')
      .pause(1000)
      .click('input[value="Add To Favorites"]')
      .pause(2000)
      .assert.cssClassNotPresent('#favIcon', 'fa fa-2x fa-star-o')
      .expect.element('.toast').text.to.equal('Recipe added to your favorites');
    browser.pause(1000);
  },

  'user can add review to a recipe': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/recipe/')
      .setValue('textarea[name=review]', 'cool stuff!')
      .pause(2000)
      .click('button[type=submit]')
      .pause(5000)
      .expect.element('#fullname').text.to.equal('John Doe');
    browser
      .expect.element('#user-review').text.to.equal('cool stuff!');
    browser
      .expect.element('.toast').text.to.equal('Review Successfully added');
    browser.pause(1000);
  },

  'user can remove a recipe from favorites': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/recipe')
      .click('i#my-favorite')
      .waitForElementVisible('.table', 1000)
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/my-favorite')
      .click('a#deleteFav')
      .pause(2000)
      .assert.containsText('td', 'None');
    browser
      .expect.element('#favCount').text.to.equal(0);
    browser
      .expect.element('.toast')
      .text.to.equal('Recipe removed from your favorites');
    browser.pause(1000);
  },

  'user can edit a recipe he/she created': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/my-favorite')
      .click('i#my-recipe')
      .waitForElementVisible('.table', 2000)
      .assert.urlEquals('http://localhost:8080/my-recipe')
      .click('a[title=Edit]')
      .pause(1000)
      .setValue('input[name=title]', ' Sauce')
      .pause(1000)
      .click('button[type=submit]')
      .pause(3000)
      .expect.element('#title').text.to.equal('Bread & Tea Sauce');
    browser
      .expect.element('.toast').text.to.equal('Recipe Updated Successfully');
    browser.pause(1000);
  },

  'user can delete a recipe he/she created': (browser) => {
    browser
      .assert.urlEquals('http://localhost:8080/my-recipe')
      .click('a[title=Delete]')
      .pause(500)
      .click('#delete')
      .pause(3000)
      .expect.element('#title').text.to.equal('Potatoes');
    browser
      .expect.element('.toast')
      .text.to.equal('Recipe (Bread & Tea Sauce) deleted successfully');
    browser.pause(1000);
  },

  'user can edit his/her profile': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/my-recipe')
      .click('i#my-profile')
      .assert.urlEquals('http://localhost:8080/my-profile')
      .refresh()
      .click('i.drop')
      .pause(1000)
      .click('a#profile-edit')
      .waitForElementVisible('#profileModal', 1000)
      .pause(2000)
      .setValue('input[name=fullName]', ' Mark')
      .setValue('input[name=phone]', '8088017115')
      .pause(2000)
      .click('button[type=submit]')
      .pause(3000)
      .expect.element('#Fname').text.to.equal('John Doe Mark');
    browser
      .expect.element('#phone').text.to.equal(' 08088017115');
    browser
      .expect.element('.toast')
      .text.to.equal('Profile updated successfully');
    browser.pause(1000);
  },

  'user cannot change his/her password with wrong oldpassword': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/my-profile')
      .click('a.password')
      .pause(1000)
      .click('a#profile-edit')
      .waitForElementVisible('#changePassword', 1000)
      .pause(2000)
      .setValue('input[name=oldPassword]', 'John1233')
      .setValue('input[name=newPassword]', 'johnny')
      .setValue('input[name=confirmPassword]', 'johnny')
      .pause(2000)
      .click('input[type=button]')
      .pause(3000)
      .expect.element('.toast').text.to.equal('Incorrect User Password');
    browser.pause(1000);
  },

  'user cannot change password with wrong confirm password': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/my-profile')
      .click('a.password')
      .pause(1000)
      .click('a#profile-edit')
      .waitForElementVisible('#changePassword', 1000)
      .pause(2000)
      .setValue('input[name=oldPassword]', 'John123')
      .setValue('input[name=newPassword]', 'johnny')
      .setValue('input[name=confirmPassword]', 'johnnny')
      .pause(2000)
      .click('input[type=button]')
      .pause(3000)
      .expect.element('.toast').text.to.equal('Passwords do not match');
    browser.pause(1000);
  },

  'user can change his/her password': (browser) => {
    browser
      .assert.urlContains('http://localhost:8080/my-profile')
      .click('a.password')
      .pause(1000)
      .click('a#profile-edit')
      .waitForElementVisible('#changePassword', 1000)
      .pause(2000)
      .setValue('input[name=oldPassword]', 'John123')
      .setValue('input[name=newPassword]', 'johnny')
      .setValue('input[name=confirmPassword]', 'johnny')
      .pause(2000)
      .click('input[type=button]')
      .pause(3000)
      .expect.element('.toast').text.to.equal('Password Successfuly Updated');
    browser.pause(1000);
  },

  'it logs out a user': (browser) => {
    browser
      .refresh()
      .assert.containsText('#logo', 'More-Recipes')
      .click('i.drop')
      .pause(1000)
      .click('a.logOut')
      .pause(3000)
      .assert.urlEquals('http://localhost:8080/')
      .pause(1000)
      .end();
  },
};
