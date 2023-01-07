const { User } = require('../db/userModel');
const { registration, login, subscriptionUpdate } = require('../services/authService');

const registrationController = async (req, res) => {
  const { email, password, subscription = 'starter' } = req.body;
  await registration(email, password, subscription);
  res.status(201).json({ email, subscription });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await login(email, password);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token: token, user: { email: user.email, subscription: user.subscription } });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.json({ message: 'logout success' });
};

const GetCurrentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const subscriptionUpdateController = async (req, res) => {
  const { subscription: newSub } = req.body;
  const { _id, subscription: oldSub } = req.user;
  await subscriptionUpdate(_id, newSub);
  res.json(`Subscription update from ${oldSub} to ${newSub}`);
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  GetCurrentUserController,
  subscriptionUpdateController,
};
