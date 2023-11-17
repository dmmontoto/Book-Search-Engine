const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = (context) => {
  const { req } = context;

  let token = req.headers.authorization || '';

  if (token) {
    token = token.split('Bearer ')[1].trim();
  }

  if (!token) {
    throw new AuthenticationError('You have no token!');
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return { user: data };
  } catch (err) {
    console.error('Invalid token');
    throw new AuthenticationError('Invalid token!');
  }
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  authMiddleware,
  signToken,
};
