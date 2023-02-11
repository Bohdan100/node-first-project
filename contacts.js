const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(path.resolve(contactsPath), "utf8");
    const parcedContacts = JSON.parse(contacts);

    return parcedContacts;
  } catch {
    (err) => console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(path.resolve(contactsPath), "utf8");
    const parcedContacts = JSON.parse(contacts);

    const contactItem = parcedContacts.find(
      (contact) => Number(contact.id) === Number(contactId)
    );

    if (!contactItem) {
      return null;
    }

    return contactItem;
  } catch {
    (err) => console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(path.resolve(contactsPath), "utf8");
    const parcedContacts = JSON.parse(contacts);

    const newContacts = parcedContacts.filter(
      (contact) => Number(contact.id) !== Number(contactId)
    );
    const contactsList = JSON.stringify(newContacts);
    await fs.writeFile(path.resolve(contactsPath), contactsList, "utf8");

    const indexRemoteContact = parcedContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexRemoteContact === -1) {
      return null;
    }
    return parcedContacts[indexRemoteContact];
  } catch {
    (err) => console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: `${Math.floor(Math.random() * 1000)}`,
    name,
    email,
    phone,
  };

  const contacts = await fs.readFile(path.resolve(contactsPath), "utf8");
  const parsedContacts = JSON.parse(contacts);
  parsedContacts.push(newContact);
  const newContacts = JSON.stringify(parsedContacts);
  await fs.writeFile(path.resolve(contactsPath), newContacts, "utf8");
  return parsedContacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
