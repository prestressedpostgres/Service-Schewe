const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');

//app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  });

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});