// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');

//app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4000;

// this GET is limited to 6 entries
app.get('/', db.getRestaurants);
// app.get('/restaurants', db.getRestaurants);
app.get('/restaurants/:id', db.getRestaurantById);
app.post('/restaurants/:name', db.addRecord);
app.put('/restaurants/:id', db.updateRecord);
app.delete('/restaurants/:id', db.deleteRestaurant);

app.listen(port, () => {
  console.log(`***App running on port ${port}***`);
});

// ARTILLERY COMMANDS:
// npx artillery run artilleryTest.yml