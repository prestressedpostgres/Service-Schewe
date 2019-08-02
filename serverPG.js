const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');

//app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4000;

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/restaurants', db.getRestaurants);
app.get('/restaurants/:id', db.getRestaurantById);
app.post('/restaurants', db.addRecord);
app.put('/restaurants/:id', db.updateRecord);
app.delete('/restaurants/:id', db.deleteRestaurant);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});