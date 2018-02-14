import jwt from 'jsonwebtoken';

require('dotenv').config();

const Secret = process.env.SECRET;

/**
   * @description auth method serves  as middleware for authentication
   * it verifies token.
   *
   * @function auth
   *
   * @param {object} req HTTP request
   * @param {object} res HTTP response
   * @param {function} next
   *
   * @returns { object } response message object
   */
const Auth = {
  // function to authenticate access to users with a token
  verify(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, Secret, (err, decoded) => {
        if (err) {
          res.status(401).send({
            message: 'You do not have Permission to this Page'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  },

  checkMailToken(req, res) {
    jwt.verify(req.body.token, process.env.SECRET, (err) => {
      if (err) {
        res.status(401).json({
          message: 'You do not have Permission to this Page'
        });
      } else {
        res.json({ message: 'all good' });
      }
    });
  }
};

export default Auth;
