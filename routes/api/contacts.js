const { contactValidation, updateValidation, favoriteValidation } = require('../../middlewares/validationMiddleware');
const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  changeContactByIdController,
  patchContactFavoriteByIdController,
  deleteContactByIdController,
} = require('../../controllers/contactController');
const { authMiddleware } = require('../../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/', asyncWrapper(getContactsController));
router.get('/:id', asyncWrapper(getContactByIdController));
router.post('/', contactValidation, asyncWrapper(postContactController));
router.put('/:id', updateValidation, asyncWrapper(changeContactByIdController));
router.patch('/:id/favorite', favoriteValidation, asyncWrapper(patchContactFavoriteByIdController));
router.delete('/:id', asyncWrapper(deleteContactByIdController));

module.exports = { contactsRouter: router };
