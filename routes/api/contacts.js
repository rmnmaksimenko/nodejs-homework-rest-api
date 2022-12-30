const { contactValidation } = require('../../middlewares/validationMiddleware');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // res.json(await listContacts());
});

router.get('/:contactId', async (req, res, next) => {
  // const { contactId } = req.params;
  // const result = await getContactById(contactId);
  // if (result.length === 0) {
  //   return res.status(404).json({ message: `Not found` });
  // }
  // res.json(await getContactById(contactId));
});

router.post('/', contactValidation, async (req, res, next) => {
  // const body = req.body;
  // res.json(await addContact(body));
});

router.delete('/:contactId', async (req, res, next) => {
  // const { contactId } = req.params;
  // const result = await removeContact(contactId);
  // if (result === false) {
  //   return res.status(400).json({ message: `Contact id ${contactId} not found` });
  // }
  // res.json({ message: 'contact deleted' });
});

router.put('/:contactId', contactValidation, async (req, res, next) => {
  // const { contactId } = req.params;
  // const body = req.body;
  // const result = await updateContact(contactId, body);
  // if (result === null) {
  //   return res.status(400).json({ message: `Contact id ${contactId} not found` });
  // }
  // res.json(result);
});

module.exports = router;
