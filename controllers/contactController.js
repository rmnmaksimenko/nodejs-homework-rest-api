const {
  getContacts,
  getContactbyId,
  addContact,
  changeContactById,
  patchContactFavoriteById,
  deleteContactById,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactbyId(id);
  res.json({ contact, status: 'success' });
};

const postContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  await addContact({ name, email, phone, favorite });
  res.json({ status: 'success' });
};

const changeContactByIdController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;
  await changeContactById(id, { name, email, phone, favorite });
  res.json({ status: 'success' });
};

const patchContactFavoriteByIdController = async (req, res) => {
  const { favorite } = req.body;
  const { id } = req.params;
  await patchContactFavoriteById(id, { favorite });
  res.json({ status: 'success' });
};

const deleteContactByIdController = async (req, res) => {
  const { id } = req.params;
  await deleteContactById(id);
  res.json({ status: 'success' });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  postContactController,
  changeContactByIdController,
  patchContactFavoriteByIdController,
  deleteContactByIdController,
};
