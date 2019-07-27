const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

// GET all users, sorted by id
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    });
  }

// GET single user by id
const getUserById = (request, response) => {
const id = parseInt(request.params.id)

pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
});
}

// POST new user using 'name'
const createUser = (request, response) => {
const { name } = request.body

pool.query('INSERT INTO users (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
    throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
});
}

// UPDATE user
const updateUser = (request, response) => {
const id = parseInt(request.params.id)
const { name } = request.body

pool.query(
    'UPDATE users SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
    if (error) {
        throw error
    }
    response.status(200).send(`User modified with ID: ${id}`)
    }
);
}
// DELETE user by id
const deleteUser = (request, response) => {
const id = parseInt(request.params.id)

pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
});
}

module.exports = {
getUsers,
getUserById,
createUser,
updateUser,
deleteUser
}