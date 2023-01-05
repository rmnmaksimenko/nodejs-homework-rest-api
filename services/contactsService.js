const { Contact } = require('../db/contactModel');
const { WrongParametersError } = require('../helpers/errors');

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};
const getContactbyId = async id => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Contact id ${id} not found`);
  }
  return contact;
};
const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};
const changeContactById = async (id, { name, email, phone, favorite }) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Contact id ${id} not found`);
  }
  await Contact.findByIdAndUpdate(id, { $set: { name, email, phone, favorite } });
};
const patchContactFavoriteById = async (id, { favorite }) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Contact id ${id} not found`);
  }
  if (typeof favorite !== 'boolean') {
    throw new WrongParametersError('missing field favorite');
  }
  await Contact.findByIdAndUpdate(id, { $set: { favorite } });
};
const deleteContactById = async id => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Contact id ${id} not found`);
  }
  await Contact.findByIdAndRemove(id);
};

module.exports = {
  getContacts,
  getContactbyId,
  addContact,
  changeContactById,
  patchContactFavoriteById,
  deleteContactById,
};
