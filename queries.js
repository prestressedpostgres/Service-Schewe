const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'danielschewe',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

// GET all restaurants, sorted by id (ascending)
const getRestaurants = (request, response) => {
    pool.query('SELECT * FROM restaurants ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    });
  }

// GET single restaurant by id
const getRestaurantById = (request, response) => {
const id = parseInt(request.params.id)
console.log(id);
pool.query('SELECT * FROM restaurants WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
});
}

// POST new restaurant using 'name'
const addRecord = (request, response) => {
const { name } = request.body

pool.query('INSERT INTO restaurants (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Restaurant added with ID: ${result.insertId}`)
});
}

// UPDATE restaurant
const updateRecord = (request, response) => {
const id = parseInt(request.params.id)
const { name } = request.body

pool.query(
    'UPDATE restaurants SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Restaurants modified with ID: ${id}`)
    }
);
}
// DELETE restaurant by id
const deleteRestaurant = (request, response) => {
const id = parseInt(request.params.id)

pool.query('DELETE FROM restaurants WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Restaurant deleted with ID: ${id}`)
});
}

module.exports = {
  getRestaurants,
  getRestaurantById,
  addRecord,
  updateRecord,
  deleteRestaurant
}

// POSTGRES DB COMMANDS AND ACCESS INFO
// type 'psql postgres' to enter into the postgres DB
// 'restaurants' is the one with 10 million records
/*
\q | Exit psql connection
\c | Connect to a new database
\dt | List all tables
\du | List all roles
\list | List databases
\du | List all roles/users
*/

// danielschewe = superuser