import jwt from 'jsonwebtoken';

require('dotenv').config();

const Secret = process.env.SECRET;
const Auth = {
  // function to authenticate access to users with a token
  verify(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, Secret, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: 'You do not have Permission to this Page' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No token provided' });
    }
  },

  checkMailToken(req, res) {
    jwt.verify(req.body.token, process.env.SECRET, (err) => {
      if (err) {
        res.status(401).json({ message: 'You do not have Permission to this Page' });
      } else {
        // if everything is good, save to request for use in other routes
        res.json({ message: 'all good' });
      }
    });
  }
};

export default Auth;
