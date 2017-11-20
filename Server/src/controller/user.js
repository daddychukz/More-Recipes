import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

require('dotenv').config();

const userModel = db.User;
const favoriteModel = db.Favorite;
const errors = {};

const Secret = process.env.SECRET;

/**
 * @class User
 *@classdesc creates a class User
 */
class User {
/**
   * signUp
   * @desc Registers a user to the application
   * Route: POST: '/users/signup'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static signUp(req, res) {
    if (!req.body.Email || req.body.Email.trim().length === 0) {
      return res.status(406).json({
        message: 'Email Field should not be Empty',
      });
    } else if (!req.body.UserName || req.body.UserName.trim().length === 0) {
      return res.status(406).json({
        message: 'Username Field should not be Empty',
      });
    } else if (!req.body.FullName || req.body.FullName.trim().length === 0) {
      return res.status(406).json({
        message: 'Username Field should not be Empty',
      });
    } else if (!req.body.Password) {
      return res.status(406).json({
        message: 'Password Field should not be Empty',
      });
    } else if (req.body.Password !== req.body.ConfirmPassword) {
      return res.status(406).json({
        message: 'Password Mismatch!',
      });
    }
    userModel
      .create({
        email: req.body.Email,
        fullname: req.body.FullName,
        username: req.body.UserName,
        password: req.body.Password,
        confirmPassword: req.body.ConfirmPassword
      })
      .then(user => res.status(201).send({
        Message: 'User created successfully',
        User: {
          fullname: user.fullname,
          username: user.username,
          email: user.email
        }
      }))
      .catch((err) => {
        if (err.errors[0].message === 'username must be unique') {
          errors.error = { message: 'username already exists' };
        }
        if (err.errors[0].message === 'email must be unique') {
          errors.error = { message: 'email already exists' };
        }
        if (err.errors[0].message === 'Enter a Valid Email') {
          errors.err = { message: 'not an email' };
        }
        if (!errors.error) {
          errors.error = { message: err.errors[0].message };
        }
        res.status(409).json(errors); // {error, data: req.body}
      });
  }

  /**
   * signIn
   * @desc Login a user to the application
   * Route: POST: '/users/signin'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static signIn(req, res) {
    if (!req.body.Email || req.body.Email.trim().length === 0) {
      return res.status(406).json({
        message: 'Email Field should not be Empty',
      });
    } else if (!req.body.Password) {
      return res.status(406).json({
        message: 'Password Field should not be Empty',
      });
    }
    userModel.findOne({
      where: {
        email: req.body.Email
      },
    })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.Password, user.password, (err, response) => {
            if (response) {
              const token = jwt.sign({
                username: user.username,
                userId: user.userId,
                fullname: user.fullname
              }, Secret, { expiresIn: '24h' });
              return res.status(200).send({
                message: `Welcome ${user.username}`,
                fullname: user.fullname,
                token });
            }
            return res.status(409).send({ message: 'Username or password incorrect' });
          });
        } else {
          res.status(404).send({
            message: 'This record does not exists!'
          });
        }
      });
  }

  /**
   * addFavorites
   * @desc adds a recipe to users favorites
   * Route: POST: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static addFavorites(req, res) {
    if (!req.body.Category || req.body.Category.trim().length === 0) {
      return res.status(406).json({
        message: 'Category Field should not be Empty',
      });
    }
    favoriteModel
      .findOrCreate({ where: {
        userId: req.decoded.userId,
        recipeId: req.params.recipeID },
      defaults: { category: req.body.Category } })
      .spread(() => {
        favoriteModel.findOne({
          where: {
            userId: req.decoded.userId,
            recipeId: req.params.recipeID
          }
        })
          .then((prevFavorite) => {
            if (prevFavorite) {
              prevFavorite.destroy();
            }
          });
        res.send({
          message: 'Recipe removed from your favorites'
        });
      })
      .catch(() => favoriteModel.findOne({
        where: {
          userId: req.decoded.userId,
          recipeId: req.params.recipeID
        }
      }).then((favorite) => {
        res.send({
          message: 'Recipe added to your favorites',
          favorite
        });
      })
      );
  }

  /**
   * retrieveFavorites
   * @desc gets all favorites added by a user
   * Route: GET: '/users/:userID/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static retrieveFavorites(req, res) {
    favoriteModel
      .all({
        where: {
          userId: req.decoded.userId
        },
        include: [{
          model: db.Recipe
        }],
        attributes: {
          exclude: ['id', 'updatedAt']
        }
      })
      .then((recipe) => {
        if (recipe) {
          res.status(200).send({
            favoriteRecipe: recipe
          });
        } else {
          res.status(404).send({
            message: 'Record not Found!'
          });
        }
      })
      .catch(() => res.status(400).send({
        message: 'Record not found for this User!'
      }));
  }

  /**
   * getSingleFavorite
   * @desc gets one favorited recipe
   * Route: GET: '/user/:recipeId/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static getSingleFavorite(req, res) {
    favoriteModel
      .findOne({
        where: {
          userId: req.decoded.userId,
          recipeId: req.params.recipeID
        },
        attributes: {
          exclude: ['id', 'updatedAt']
        }
      })
      .then((recipe) => {
        if (recipe) {
          res.status(200).send({
            favorite: recipe
          });
        } else {
          res.status(404).send({
            message: 'Record not Found!'
          });
        }
      })
      .catch(() => res.status(400).send({
        message: 'Record not found for this User!'
      }));
  }
}

export default User;
