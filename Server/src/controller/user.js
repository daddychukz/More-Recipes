import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';
import sendResetPasswordEmail from './mailer';
import errorHandling from './HandleErrors/errorHandling';

require('dotenv').config();

const UserModel = db.User;
const errors = {};

const Secret = process.env.SECRET;

/**
 * @class User
 * @classdesc creates a class User
 */
class User {
/**
   * @description Registers a user to the application
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {void}
   */
  static signUp(request, response) {
    const {
      email, userName, fullName, password, confirmPassword, imageUrl
    } = request.body;
    if (!email || email.trim().length === 0) {
      errors.error = { message: 'Email Field should not be Empty' };
      return response.status(406).json(errors);
    } if (!userName || userName.trim().length === 0) {
      errors.error = { message: 'Username Field should not be Empty' };
      return response.status(406).json(errors);
    } if (!fullName || fullName.trim().length === 0) {
      errors.error = { message: 'Fullname Field should not be Empty' };
      return response.status(406).json(errors);
    } if (!password) {
      errors.error = { message: 'Password Field should not be Empty' };
      return response.status(406).json(errors);
    } if (password !== confirmPassword) {
      errors.error = { message: 'Password Mismatch!' };
      return response.status(406).json(errors);
    }
    UserModel
      .create({
        email,
        fullname: fullName,
        username: userName,
        password,
        confirmPassword,
        imageUrl
      })
      .then((user) => {
        const { fullname, username, userId, imageUrl, publicUrl } = user;
        if (user) {
          const token = jwt.sign({
            username,
            userId,
            fullname,
            imageUrl,
            publicUrl
          }, Secret, { expiresIn: '24h' });
          response.status(201).send({
            message: 'User created successfully',
            user: {
              fullname,
              username,
              email,
              token
            }
          });
        }
      })
      .catch((error) => {
        errorHandling.validateSignupErrors(error, response);
      });
  }

  /**
   * @description Login a user to the application
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} user
   */
  static signIn(request, response) {
    const { email, password } = request.body;
    if (!email || email.trim().length === 0) {
      return response.status(406).json({
        message: 'Email Field should not be Empty',
      });
    } else if (!password) {
      return response.status(406).json({
        message: 'Password Field should not be Empty',
      });
    }
    UserModel.findOne({
      where: {
        email
      },
    })
      .then((user) => {
        const {
          fullname,
          username,
          userId,
          imageUrl,
          publicUrl
        } = user;
        if (user) {
          bcrypt.compare(password, user.password, (error, decoded) => {
            if (decoded) {
              const token = jwt.sign({
                username,
                userId,
                fullname,
                imageUrl,
                publicUrl
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
        }
      }).catch(() => response.status(404).send({
        message: 'Please register to signin'
      }));
  }

  /**
   * @description gets the info of a registered user
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} user details
   */
  static getUserProfile(request, response) {
    UserModel.findOne({
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
        }
      }).catch(() => response.status(404).send({
        message: 'User not found'
      }));
  }


  /**
   * @desc resets the password of a registered user
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {void}
   */
  static resetPasswordRequest(request, response) {
    UserModel.findOne({
      where: {
        email: request.body.email
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
   * @description updates user password
   *
   * @param {any} password
   * @param {any} userId
   * @param {any} response HTTP response object
   *
   * @returns {object} response
   */
  static updatePassword(password, userId, response) {
    const updateRecord = {};
    UserModel.findOne({
      where: {
        userId
      }
    }).then((userInfo) => {
      if (userInfo) {
        if (password) {
          updateRecord.password = bcrypt
            .hashSync(password, bcrypt.genSaltSync(8));
          userInfo.update(updateRecord)
            .then(() => response.status(200).json({
              message: 'Password Successfuly Updated'
            }));
        }
      }
    }).catch(() => response.status(500).send({
      message: 'Internal Server Error'
    }));
  }

  /**
   * @desc resets the password of a registered user
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {object} userInfo
   */
  static resetPassword(request, response) {
    const {
      password, token, oldPassword, userId
    } = request.body;
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          response.status(401).json({ message: 'Unauthorized' });
        } else {
          User.updatePassword(password, decoded.userId, response);
        }
      });
    } else {
      UserModel.findOne({
        where: {
          userId
        },
      })
        .then((user) => {
          bcrypt.compare(oldPassword, user.password, (error, decoded) => {
            if (decoded) {
              User.updatePassword(password, userId, response);
            } else {
              response.status(409).send({ message: 'Incorrect User Password' });
            }
          });
        }).catch(() =>
          response.status(401).json({ message: 'Unauthorized' }));
    }
  }

  /**
   * @desc updates the profile of a registered user
   *
   * @param {Object} request HTTP request object
   * @param {Object} response HTTP response object
   *
   * @returns {object} updated user profile
   */
  static updateUserProfile(request, response) {
    const updateRecord = {};
    const {
      fullName,
      about,
      userName,
      address,
      phone,
      hobbies,
      imageUrl,
      publicId
    } = request.body;
    UserModel.findOne({
      where: {
        userId: request.decoded.userId
      },
    }).then((userInfo) => {
      if (fullName) {
        updateRecord.fullname = fullName;
      }
      if (about) {
        updateRecord.about = about;
      }
      if (userName) {
        updateRecord.username = userName;
      }
      if (address) {
        updateRecord.address = address;
      }
      if (phone) {
        updateRecord.phone = phone;
      }
      if (hobbies) {
        updateRecord.hobbies = hobbies;
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
            userId,
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
            userId,
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
