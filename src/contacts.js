const fs = require("node:fs/promises");
const path = require("path");

//   Розкоментуй і запиши значення
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    console.log("Error reading contacts ", error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log("Error reading contacts ", error.message);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const removeContact = contacts.find((contact) => contact.id === contactId);
    if (!removeContact) return null;

    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), "utf-8");
    return removeContact;
  } catch (error) {
    console.log("Error reading contacts ", error.message);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), "utf-8");

    return newContact;
  } catch (error) {
    console.log("Error reading contacts ", error.message);
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
