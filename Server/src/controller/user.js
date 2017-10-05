import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

require('dotenv').config();

const User = db.User;
const Favorites = db.Favorites;


const secret = process.env.SECRET;

/**
   * signUp
   * @desc Registers a user to the application
   * Route: POST: '/users/signup'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const signUp = (req, res) => User
  .create({
    fullName: req.body.fullname,
    email: req.body.email,
    sex: req.body.sex,
    userName: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  })
  .then(user => res.status(201).send({
    user
  }))
  .catch(err => res.status(400).send(err));

/**
   * signIn
   * @desc Login a user to the application
   * Route: POST: '/users/signin'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const signIn = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      Message: 'Email Field should not be Empty',
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      Message: 'Password Field should not be Empty',
    });
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({
              username: user.userName,
              userId: user.userId
            }, secret, { expiresIn: 86400 });
            return res.status(200).send({
              message: `Welcome ${user.userName}`,
              token });
          }
          return res.status(400).send({ message: 'Username or password incorrect' });
        });
      } else {
        res.status(404).send({
          message: 'This record does not exists!'
        });
      }
    });
};

/**
   * addFavorites
   * @desc adds a recipe to users favorites
   * Route: POST: '/recipes/:recipeID'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const addFavorites = (req, res) => {
  Favorites
    .findOrCreate({ where: {
      userId: req.decoded.userId,
      recipeId: req.params.recipeID },
    defaults: { category: req.body.category } })
    .spread((favorite) => {
      res.status(201).send({
        favorite
      });
    })
    .catch(err => res.status(404).send(err));
};

/**
   * retrieveFavorites
   * @desc gets all favorites added by a user
   * Route: GET: '/users/:userID/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object}
   */

const retrieveFavorites = (req, res) => {
  Favorites
    .findOne({
      where: {
        userId: req.params.userID
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
      message: 'User not Found'
    }));
};


export default {
  signUp,
  signIn,
  addFavorites,
  retrieveFavorites
};
