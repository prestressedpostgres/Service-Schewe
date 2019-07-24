const express = require('express');
const db = require('./database/db.js')
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./client/dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

app.post('/', (req, res) => {
  db.save(req.body)
  res.send(console.log('posted to Zagat database'))
})

app.get('/api/cities', (req, res) => {
  db.load(res.send.bind(res));
});

app.get('/restaurant', (req, res) => {
  console.log(req)
  db.nearby(req.query, res.send.bind(res))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

