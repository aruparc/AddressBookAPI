# Instructions for Running the Addressbook API

### 1. MongoDB
 
First make sure you have a local MongoDB instance installed and running on the default port 27017. If you by any chance encounter the following error:   

```
en: IllegalOperation: Attempted to create a lock file on a read-only directory: /data/db, terminating
2020-01-29T09:14:45.094-0500 I CONTROL  [initandlisten] now exiting
2020-01-29T09:14:45.094-0500 I CONTROL  [initandlisten] shutting down with code:100
```
please make sure you have a directory set in C:/data/db on Windows or /data/db on Linux or Mac. 

If you are still unable to run MongoDB, please run MongoDB as an administrator ('Run as Admin' or 'sudo mongod').

### 2. Running the Server

Having a local MongoDB instance running on port 27017 is an absolute prerequisite, otheriwise the server.js file won't be able to run successfully.

After getting MongoDB to run, please navigate within the Assignment3/AddressBook/src directory and type the following command:

```
node server.js
```

The server runs on port 8080, as specified by the documentation given to us. 

### 3. Testing the API

Please use Postman to test the API endpoints, as there is no front end web interface built to send and receive data.
The endpoints as specified are:

```
GET /api/contacts   -> Get all contacts
GET /api/contacts/:id   -> Get contact by id
POST  /api/contacts   -> Add a new contact
PUT /api/contacts/:id   -> Update a contact by id
DELETE  /api/contacts   -> Delete all existing contacts
DELETE  /api/contacts/:id   ->Delete a single contact by id
```

### Acknowledgements
Special thanks to Rajeev Singh on Callicoder.
This API was adapted from the tutorial he presents on Callicoder, 
and can be found here: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
