const express = require('express');
const db = require('./database/db.js');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

// app.get('/restaurants/:name', (req, res) => {
//   db.findById(res.send.bind(res));
//   db.load(res.send.bind(res));
//   res.send(console.log('loaded Zagat information'));
// });

// GET
app.get('/restaurants/:id', (req, res) => {
  db.findById(parseInt(req.params.id), (response) => {
    res.status(200).send(response);
  })
});

// POST
app.post('/restaurants/post/:name', (req, res) => {
  db.save(req.body);
  res.send(console.log('posted to Zagat database'));
});

// PUT
app.put('/restaurants/', (req, res) => {
  // some functionality here
  res.send(console.log('database updated'));
});

app.delete('/restaurants/:name', (req, res) => {
  db.remove({id:req.params.id});
  res.send(console.log('record deleted'));
});

// app.get('/restaurant', (req, res) => {
//   console.log(req)
//   db.nearby(req.query, res.send.bind(res))
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

// to test artillery, enter the following into the command line: npx artillery run artilleryTest.yml
