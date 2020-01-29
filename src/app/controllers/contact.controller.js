const Contact = require('../models/contact.model.js');

// Create and Save a new Contact
exports.addContact = (req, res) => {
    // Validate request
    if(!req.body.firstname) {
        return res.status(400).send({
            message: "Invalid input"
        });
    }

    // Create a Contact
    const contact = new Contact({
        firstname: req.body.firstname || "Untitled Contact", 
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    });

    // Save Contact in the database
    contact.save()
    .then(data => {
        res.status(201).send({data, message: "Successfully added new contact"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Contact."
        });
    });
};



// Retrieve and return all contacts from the database.
exports.getContacts = (req, res) => {
    Contact.find()
    .then(contacts => {
        res.send({contacts, message: "Successfully returned contacts"});
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Bad request."
        });
    });
};

// Find a single contact with a contactId
exports.getContactById = (req, res) => {
    Contact.findById(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found"
            });            
        }
        res.send({contact, message: "Contact found"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: "Bad request"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving contact with id " + req.params.contactId
        });
    });
};

// Update a contact identified by the contactId in the request
exports.updateContact = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Contact content can not be empty"
        });
    }

    // Find contact and update it with the request body
    Contact.findByIdAndUpdate(req.params.contactId, {
        firstname: req.body.firstname || "Untitled Contact", 
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    }, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found" 
            });
        }
        res.send({contact, message: "Successfully updated contact"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: "Invalid input"
            });                
        }
        return res.status(500).send({
            message: "Error updating contact with id " + req.params.contactId
        });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    Contact.findByIdAndRemove(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found"
            });
        }
        res.send({contact, message: "Successfully deleted contacts"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(400).send({
                message: "Bad request"
            });                
        }
        return res.status(500).send({
            message: "Could not delete contact with id " + req.params.contactId
        });
    });
};


// Delete all contacts
exports.deleteContacts = (req, res) => {
    Contact.find()
    .then(contacts => {
        res.send({contacts, message: "Successfully deleted all contacts"});
        Contact.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Bad request."
        });
    });
};

exports.destroy = function(req, res, next) {
    Contact.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );
};