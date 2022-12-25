const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactPath, { encoding: 'utf-8' });
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await listContacts();
  const result = data.filter(contact => contact.id === contactId);
  return result;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const contactIndex = data.findIndex(item => item.id === contactId);
  if (contactIndex === -1) {
    return false;
  }
  data.splice(contactIndex, 1);
  fs.writeFile(contactPath, JSON.stringify(data, null, 2), 'utf-8');
  return true;
};

const addContact = async body => {
  const data = await listContacts();
  const id = uuidv4();
  const { name, email, phone } = body;
  const contact = { id, name, email, phone };
  data.push(contact);
  fs.writeFile(contactPath, JSON.stringify(data, null, 2), 'utf-8');
  return contact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const { name, email, phone } = body;
  let result = null;
  data.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      result = contact;
    }
  });
  if (result !== null) {
    fs.writeFile(contactPath, JSON.stringify(data, null, 2), 'utf-8');
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
