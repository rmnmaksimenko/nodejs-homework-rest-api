const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  registrationController,
  loginController,
  logoutController,
  GetCurrentUserController,
  subscriptionUpdateController,
  updateAvatar,
} = require('../../controllers/authControler');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { subscriptionValidation } = require('../../middlewares/validationMiddleware');
const { upload } = require('../../middlewares/uploadMiddleware');

router.post('/signup', asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.get('/current', authMiddleware, asyncWrapper(GetCurrentUserController));
router.patch('/', authMiddleware, subscriptionValidation, asyncWrapper(subscriptionUpdateController));
router.patch('/avatars', authMiddleware, upload.single('avatar'), asyncWrapper(updateAvatar));

module.exports = { authRouter: router };
