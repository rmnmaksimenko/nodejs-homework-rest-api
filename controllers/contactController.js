const {
  getContacts,
  getContactbyId,
  addContact,
  changeContactById,
  patchContactFavoriteById,
  deleteContactById,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 5, favorite = false } = req.query;
  if (limit > 20) limit = 20;
  if (limit < 1) limit = 1;
  if (page < 1) page = 1;
  if (favorite === 'true') favorite = true;
  const contacts = await getContacts({ page, limit, favorite }, userId);
  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactbyId(id);
  res.json({ contact, status: 'success' });
};

const postContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: ownerId } = req.user;
  await addContact({ name, email, phone, favorite }, ownerId);
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
