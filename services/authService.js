const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { NotAuthorizedError, EmailInUseError, UserNotFoundError, WrongParametersError } = require('../helpers/errors');
const { sendEmail } = require('../helpers/sendEmail');
require('dotenv').config();

const { BASE_URL } = process.env;

const registration = async (email, password, subscription, avatarURL, verificationToken) => {
  const user = new User({ email, password, subscription, avatarURL, verificationToken });
  try {
    await user.save();

    const verifyEmail = {
      to: email,
      subject: 'Verification email',
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">`,
    };

    await sendEmail(verifyEmail);
  } catch (error) {
    throw new EmailInUseError('Email in use');
  }
};

const verify = async verificationToken => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new UserNotFoundError('User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });
};

const verifyResend = async email => {
  if (!email) {
    throw new WrongParametersError('missing required field email');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UserNotFoundError('User not found');
  }
  if (user.verify) {
    throw new WrongParametersError('Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verification email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">`,
  };

  await sendEmail(verifyEmail);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`Incorrect email or password`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Incorrect email or password');
  }

  if (!user.verify) {
    throw new NotAuthorizedError(`Incorrect email or password`);
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

module.exports = { registration, verify, verifyResend, login, subscriptionUpdate };
