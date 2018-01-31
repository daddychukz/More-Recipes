import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';
import sendResetPasswordEmail from './mailer';
import errorHandling from './HandleErrors/errorHandling';

require('dotenv').config();

const userModel = db.User;
const errors = {};

const Secret = process.env.SECRET;

/**
 * @class User
 * @classdesc creates a class User
 */
class User {
/**
   * signUp
   * @desc Registers a user to the application
   * Route: POST: '/users/signup'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static signUp(request, response) {
    const {
      Email, UserName, FullName, Password, ConfirmPassword, ImageUrl
    } = request.body;
    if (!Email || Email.trim().length === 0) {
      errors.error = { message: 'Email Field should not be Empty' };
      return response.status(406).json(errors);
    } if (!UserName || UserName.trim().length === 0) {
      errors.error = { message: 'Username Field should not be Empty' };
      return response.status(406).json(errors);
    } if (!FullName || FullName.trim().length === 0) {
      errors.error = { message: 'Fullname Field should not be Empty' };
      return response.status(406).json(errors);
    } if (!Password) {
      errors.error = { message: 'Password Field should not be Empty' };
      return response.status(406).json(errors);
    } if (Password !== ConfirmPassword) {
      errors.error = { message: 'Password Mismatch!' };
      return response.status(406).json(errors);
    }
    userModel
      .create({
        email: Email,
        fullname: FullName,
        username: UserName,
        password: Password,
        confirmPassword: ConfirmPassword,
        imageUrl: ImageUrl
      })
      .then((user) => {
        const { fullname, username, email, userId } = user;
        if (user) {
          const token = jwt.sign({
            username,
            userId,
            fullname
          }, Secret, { expiresIn: '24h' });
          response.status(201).send({
            Message: 'User created successfully',
            User: {
              fullname,
              username,
              email,
              token
            }
          });
        } else {
          response.status(404).send({
            message: 'This record does not exists!'
          });
        }
      })
      .catch((error) => {
        errorHandling.validateSignupErrors(error, response);
      });
  }

  /**
   * signIn
   * @desc Login a user to the application
   * Route: POST: '/users/signin'
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static signIn(request, response) {
    const { Email, Password } = request.body;
    if (!Email || Email.trim().length === 0) {
      return response.status(406).json({
        message: 'Email Field should not be Empty',
      });
    } else if (!Password) {
      return response.status(406).json({
        message: 'Password Field should not be Empty',
      });
    }
    userModel.findOne({
      where: {
        email: Email
      },
    })
      .then((user) => {
        const { fullname, username, userId } = user;
        if (user) {
          bcrypt.compare(Password, user.password, (error, password) => {
            if (password) {
              const token = jwt.sign({
                username,
                userId,
                fullname
              }, Secret, { expiresIn: '24h' });
              return response.status(200).send({
                message: `Welcome ${username}`,
                fullname,
                token
              });
            }
            return response.status(409).send({
              message: 'Username or password incorrect'
            });
          });
        } else {
          response.status(404).send({
            message: 'This record does not exists!'
          });
        }
      }).catch(() => response.status(404).send({
        message: 'Please register to signin'
      }));
  }

  /**
   * getUserProfile
   * @desc gets the info of a registered user
   * Route: GET: '/user/:recipeId/recipes
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static getUserProfile(request, response) {
    userModel.findOne({
      where: {
        userId: request.decoded.userId
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })
      .then((userInfo) => {
        if (userInfo) {
          response.status(200).send(userInfo);
        } else {
          response.status(404).send({
            message: 'User not found!'
          });
        }
      }).catch(() => response.status(404).send({
        message: 'User not found'
      }));
  }


  /**
   * resetPassword
   * @desc resets the password of a registered user
   * Route: POST: '/user/reset_password_request
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {object} userInfo
   */
  static resetPasswordRequest(request, response) {
    userModel.findOne({
      where: {
        email: request.body.Email
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })
      .then((userInfo) => {
        if (userInfo) {
          sendResetPasswordEmail(userInfo);
          response.status(200).json({
            message: 'Reset Password link sent successfully'
          });
        } else {
          response.status(404).json({
            message: 'User not found!'
          });
        }
      });
  }

  /**
   *
   *
   * @static
   * @param {any} Password
   * @param {any} userId
   * @param {any} response
   * @memberof User
   * @returns {object} response
   */
  static updatePassword(Password, userId, response) {
    const updateRecord = {};
    userModel.findOne({
      where: {
        userId
      }
    }).then((userInfo) => {
      if (userInfo) {
        if (Password) {
          updateRecord.password = bcrypt.hashSync(Password, bcrypt.genSaltSync(8));
          userInfo.update(updateRecord)
            .then(() => response.status(200).json({
              message: 'Password Successfuly Updated'
            }));
        }
      } else {
        response.status(401).json({ message: 'Invalid Token' });
      }
    }).catch(() => response.status(500).send({
      message: 'Internal Server Error'
    }));
  }

  /**
   * resetPassword
   * @desc resets the password of a registered user
   * Route: POST: '/user/reset-password
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {object} userInfo
   */
  static resetPassword(request, response) {
    const {
      Password, Token, OldPassword, UserId
    } = request.body;
    if (Token) {
      jwt.verify(Token, process.env.SECRET, (error, decoded) => {
        if (error) {
          response.status(401).json({ message: 'Invalid Token' });
        } else {
          User.updatePassword(Password, decoded.userId, response);
        }
      });
    } else {
      userModel.findOne({
        where: {
          userId: UserId
        },
      })
        .then((user) => {
          bcrypt.compare(OldPassword, user.password, (error, password) => {
            if (password) {
              User.updatePassword(Password, UserId, response);
            } else {
              response.status(409).send({ message: 'Incorrect User Password' });
            }
          });
        });
    }
  }

  /**
   * updateUserProfile
   * @desc updates the profile of a registered user
   * Route: POST: '/user/profile/edit
   * @param {Object} request request object
   * @param {Object} response response object
   * @returns {void}
   */
  static updateUserProfile(request, response) {
    const updateRecord = {};
    const {
      FullName,
      About,
      UserName,
      Address,
      Phone,
      Hobbies,
      imageUrl,
      publicId
    } = request.body;
    userModel.findOne({
      where: {
        userId: request.decoded.userId
      },
    }).then((userInfo) => {
      if (FullName) {
        updateRecord.fullname = FullName;
      }
      if (About) {
        updateRecord.about = About;
      }
      if (UserName) {
        updateRecord.username = UserName;
      }
      if (Address) {
        updateRecord.address = Address;
      }
      if (Phone) {
        updateRecord.phone = Phone;
      }
      if (Hobbies) {
        updateRecord.hobbies = Hobbies;
      }
      if (imageUrl) {
        updateRecord.imageUrl = imageUrl;
      }
      if (publicId) {
        updateRecord.publicUrl = publicId;
      }
      userInfo.update(updateRecord)
        .then((updatedRecord) => {
          const {
            fullname,
            about,
            username,
            address,
            hobbies,
            phone,
            imageUrl,
            publicUrl,
            email
          } = updatedRecord;
          response.status(202).send({
            fullname,
            about,
            username,
            address,
            hobbies,
            phone,
            imageUrl,
            publicUrl,
            email
          });
        });
    })
      .catch(() => response.status(404).send({
        message: 'User not found'
      }));
  }
}

export default User;
