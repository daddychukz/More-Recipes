import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.SECRET;
const Auth = {
  // function to authenticate access to users with a token
  verify(req, res, next) {
    const token = req.headers.authorization;
    // const token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
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
};

export default Auth;
