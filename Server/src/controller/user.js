import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';
import paginate from '../services/paginate';
import { sendResetPasswordEmail } from './mailer';

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
        confirmPassword: req.body.ConfirmPassword,
        imageUrl: req.body.imageUrl
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
        },
        attributes: {
          exclude: ['id']
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

  /**
   * getUserProfile
   * @desc gets the info of a registered user
   * Route: GET: '/user/:recipeId/recipes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static getUserProfile(req, res) {
    userModel.findOne({
      where: {
        userId: req.decoded.userId
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })
      .then((userInfo) => {
        if (userInfo) {
          res.status(200).send(
            userInfo
          );
        } else {
          res.status(404).send({
            message: 'User not found!'
          });
        }
      });
  }


  /**
   * resetPassword
   * @desc resets the password of a registered user
   * Route: POST: '/user/reset_password_request
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {object} userInfo
   */
  static resetPasswordRequest(req, res) {
    userModel.findOne({
      where: {
        email: req.body.Email
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })
      .then((userInfo) => {
        if (userInfo) {
          sendResetPasswordEmail(userInfo);
          res.status(200).json(
            {}
          );
        } else {
          res.status(404).json({
            message: 'User not found!'
          });
        }
      });
  }

  /**
   * resetPassword
   * @desc resets the password of a registered user
   * Route: POST: '/user/reset_password_request
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {object} userInfo
   */
  static resetPassword(req, res) {
    const { Password, Token } = req.body;
    const updateRecord = {};
    jwt.verify(Token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        userModel.findOne({
          where: {
            userId: decoded.userId
          }
        }).then((userInfo) => {
          if (userInfo) {
            if (Password) {
              updateRecord.password = bcrypt.hashSync(Password, bcrypt.genSaltSync(8));
            }
            userInfo.update(updateRecord)
              .then(() => res.json({
                message: 'update successful'
              }));
          } else {
            res.status(404).json({ message: 'Invalid Token' });
          }
        });
      }
    });
  }


  /**
   * updateUserProfile
   * @desc updates the profile of a registered user
   * Route: POST: '/user/profile/edit
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */
  static updateUserProfile(req, res) {
    const updateRecord = {};
    userModel.findOne({
      where: {
        userId: req.decoded.userId
      },
    }).then((userInfo) => {
      if (req.body.FullName) {
        updateRecord.fullname = req.body.FullName;
      }
      if (req.body.About) {
        updateRecord.about = req.body.About;
      }
      if (req.body.UserName) {
        updateRecord.username = req.body.UserName;
      }
      if (req.body.Address) {
        updateRecord.address = req.body.Address;
      }
      if (req.body.Phone) {
        updateRecord.phone = req.body.Phone;
      }
      if (req.body.Hobbies) {
        updateRecord.hobbies = req.body.Hobbies;
      }
      if (req.body.imageUrl) {
        updateRecord.imageUrl = req.body.imageUrl;
      }
      if (req.body.publicId) {
        updateRecord.publicUrl = req.body.publicId;
      }
      userInfo.update(updateRecord)
        .then(updatedRecord => res.send({
          fullname: updatedRecord.fullname,
          about: updatedRecord.about,
          username: updatedRecord.username,
          address: updatedRecord.address,
          hobbies: updatedRecord.hobbies,
          phone: updatedRecord.phone,
          imageUrl: updatedRecord.imageUrl,
          publicUrl: updatedRecord.publicUrl
        }));
    })
      .catch(() => res.status(404).send({
        message: 'User not found'
      }));
  }

  /**
   * Search favorite recipes by a user in the application
   * @method
   * @memberof User
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} searchString response object
   * @returns {function} Express middleware function that search
   * users and sends response to client
   */
  static searchUserFavorites(req, res) {
    const { limit, offset, searchString } = req.query;
    return favoriteModel.findAndCountAll({
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['createdAt', 'DESC']],
      where: {
        $and: [
          {
            userId: req.decoded.userId,
          },
          {
            category: {
              $iLike: `%${searchString}%`
            }
          }
        ]
      },
      include: [{
        model: db.Recipe
      }],
      attributes: {
        exclude: ['updatedAt'],
      }
    })
      .then((recipeSearchResult) => {
        if (recipeSearchResult.count === 0) {
          res.status(404).json({
            message: 'Recipe not Found!'
          });
        } else {
          const pagination = paginate({
            limit,
            offset,
            totalCount: recipeSearchResult.count,
            pageSize: recipeSearchResult.rows.length
          });
          res.status(200).json({
            pagination,
            totalCount: recipeSearchResult.count,
            searchResult: recipeSearchResult.rows
          });
        }
      })
      .catch(err => res.status(400).json({
        message: 'Recipe not Found',
        err
      }));
  }
}

export default User;
