module.exports = (app) => {
    const contacts = require('../controllers/contact.controller.js');

    // Retrieve all Contacts
    app.get('/api/contacts', contacts.getContacts);

    // Retrieve a single Contact with contactId
    app.get('/api/contacts/:contactId', contacts.getContactById);

    // Create a new contact
    app.post('/api/contacts', contacts.addContact);

    // Update a contact with Id
    app.put('/api/contacts/:contactId', contacts.updateContact);

    // Delete all contacts
    app.delete('/api/contacts', contacts.deleteContacts);

    // Delete a contact with Id
    app.delete('/api/contacts/:contactId', contacts.delete);
}