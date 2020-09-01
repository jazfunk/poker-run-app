const { response, request } = require("express");
const { user, host, db, pw, pg_port } = require("./config")

const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "jktitgqp",
//   host: "lallah.db.elephantsql.com",
//   database: "jktitgqp",
//   password: "7eJQWDJlYXDVyDBt4kkeLd7s7R1IxlUQ",
//   port: 5432,
// });
const pool = new Pool({
  user: user,
  host: host,
  database: db,
  password: pw,
  port: pg_port,
});

// GET All Users Endpoint
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// GET Single User by Id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// POST a new user
const createUser = (req, res) => {
  const { first_name, last_name, email, password, is_admin } = req.body;

  pool.query(
    "INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, email, password, is_admin],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

// PUT updated data in an existing user
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, password, is_admin } = req.body;

  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, is_admin = $5 WHERE id = $6",
    [first_name, last_name, email, password, is_admin, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID:  ${id}`);
    }
  );
};

// DELETE a user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE ID = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID:  ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
