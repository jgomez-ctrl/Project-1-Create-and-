//Jason Gomez Project 1
//testing git updating 
//testing third line for git commits from ps in vscode

const express = require('express'); //import express
const app = express();              //create app instance
const port = 3000;                  //define port number to run on

// Middleware 
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Sample data
let users = [
    { id: 1, fName: 'John', lName: 'Smith' },
    { id: 2, fname: 'Samantah', lName: 'Doe' }
];

// Routes

//
//GET
//
//get requests for all  users
app.get('/api/users', (req, res) => {
    res.json(users);
});

//
//POST
//
//create new user, add to array of users
app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.json(newUser);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(searchUser => searchUser.id == req.params.id);
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(searchUser => searchUser.id == req.params.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

























/* console.log("Hello World >.>"); */

/* // Setup
const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Add support for incoming JSON entities
app.use(express.json());

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Get all
app.get('/api/items', (req, res) => {
  res.json({ message: 'fetch all items' });
});

// Get one
app.get('/api/items/:itemId', (req, res) => {
  res.json({ message: `get user with identifier: ${req.params.itemId}` });
});

// Add new
// This route expects a JSON object in the body, e.g. { "firstName": "Peter", "lastName": "McIntyre" }
app.post('/api/items', (req, res) => {
  // MUST return HTTP 201
  res.status(201).json({ message: `added a new item: ${req.body.firstName} ${req.body.lastName}` });
});

// Edit existing
// This route expects a JSON object in the body, e.g. { "id": 123, "firstName": "Peter", "lastName": "McIntyre" }
app.put('/api/items/:itemId', (req, res) => {
  res.json({
    message: `updated item with identifier: ${req.params.itemId} to ${req.body.firstName} ${req.body.lastName}`,
  });
});

// Delete item
app.delete('/api/items/:itemId', (req, res) => {
  res.status(200).json({ message: `deleted user with identifier: ${req.params.itemId}` });
});

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send('Resource not found');
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
  console.log('Ready to handle requests on port ' + HTTP_PORT);
}); */