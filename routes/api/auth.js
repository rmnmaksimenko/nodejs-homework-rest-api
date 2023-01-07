const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  registrationController,
  loginController,
  logoutController,
  GetCurrentUserController,
  subscriptionUpdateController,
} = require('../../controllers/authControler');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { subscriptionValidation } = require('../../middlewares/validationMiddleware');

router.post('/signup', asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.get('/current', authMiddleware, asyncWrapper(GetCurrentUserController));
router.patch('/', authMiddleware, subscriptionValidation, asyncWrapper(subscriptionUpdateController));

module.exports = { authRouter: router };
