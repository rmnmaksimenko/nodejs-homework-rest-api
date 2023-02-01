const { User } = require('../db/userModel');
const { registration, login, subscriptionUpdate, verify, verifyResend } = require('../services/authService');
const gravatar = require('gravatar');
var Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const registrationController = async (req, res) => {
  const { email, password, subscription = 'starter' } = req.body;
  const avatarURL = gravatar.url(email);
  const verificationCode = uuidv4();
  await registration(email, password, subscription, avatarURL, verificationCode);
  res.status(201).json({ email, subscription });
};

const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await verify(verificationToken);
  res.json({ message: 'Verify success' });
};

const verifyResendController = async (req, res) => {
  const { email } = req.body;
  await verifyResend(email);
  res.json({ message: 'Verification email sent' });
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

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  await Jimp.read(tempUpload)
    .then(picture => {
      return picture.resize(250, 250).write(tempUpload);
    })
    .catch(err => {
      console.error(err);
    });
  const newFileName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, newFileName);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
module.exports = {
  registrationController,
  verifyController,
  verifyResendController,
  loginController,
  logoutController,
  GetCurrentUserController,
  subscriptionUpdateController,
  updateAvatar,
};
