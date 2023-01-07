var jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
  const { authorization: auth = '' } = req.headers;
  const [tokenType, token] = auth.split(' ');
  if (!token) {
    next(new NotAuthorizedError('Please, provide a token'));
  }
  if (tokenType !== 'Bearer') {
    next(new NotAuthorizedError('Not authorized'));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const userExists = await User.findById(user._id);
    if (!userExists || !userExists.token || String(token) !== String(userExists.token)) {
      next(new NotAuthorizedError('Not authorized'));
    }
    req.token = token;
    req.user = userExists;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Not authorized'));
  }
};

module.exports = { authMiddleware };
