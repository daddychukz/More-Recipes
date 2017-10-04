import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

const User = db.User;
const Favorites = db.Favorites;

const secret = 'andelabootcampcycle27';

/* Register a User */
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

/* sign into the App */
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
              isAdmin: user.isAdmin
            }, secret, { expiresIn: '24h' });
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

/* Add favorites */
const addFavorites = (req, res) => Favorites
  .create({
    userId: req.body.userID,
    recipeId: req.params.recipeID,
    category: req.body.category
  })
  .then(favorite => res.status(201).send({
    favorite
  }))
  .catch(err => res.status(400).send(err));

/* Retrieve favorites */
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
