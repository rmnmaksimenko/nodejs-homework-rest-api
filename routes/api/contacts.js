const { contactValidation } = require('../../middlewares/validationMiddleware');
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

router.get('/', asyncWrapper(getContactsController));
router.get('/:id', asyncWrapper(getContactByIdController));
router.post('/', contactValidation, asyncWrapper(postContactController));
router.put('/:id', contactValidation, asyncWrapper(changeContactByIdController));
router.patch('/:id/favorite', contactValidation, asyncWrapper(patchContactFavoriteByIdController));
router.delete('/:id', asyncWrapper(deleteContactByIdController));

module.exports = { contactsRouter: router };
