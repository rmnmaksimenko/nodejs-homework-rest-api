const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { NotAuthorizedError, EmailInUseError } = require('../helpers/errors');

const registration = async (email, password, subscription, avatarURL) => {
  const user = new User({ email, password, subscription, avatarURL });
  try {
    await user.save();
  } catch (error) {
    throw new EmailInUseError('Email in use');
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`Incorrect email or password`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Incorrect email or password');
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  return { token, user };
};

const subscriptionUpdate = async (userId, subscription) => {
  await User.findByIdAndUpdate(userId, { $set: { subscription } });
};

module.exports = { registration, login, subscriptionUpdate };
