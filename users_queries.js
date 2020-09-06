const { pool } = require("./data_access");

// pool.on("error", (err, client) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });



// Change all methods to use this technique:

// // async/await - check out a client
const getUsersNew = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const usersReturned = await client.query(
        "SELECT first_name, last_name, email FROM users ORDER BY id ASC"
      );
      client.release();
      // console.log(usersReturned.rows);
      res.json(usersReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// GET All Users Endpoint
const getUsers = (req, res) => {
  pool.query(
    "SELECT first_name, last_name, email FROM users ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};



// // async/await - check out a client
// GET RAW ALL Users Endpoint
const getRawUsers = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const usersReturned = await client.query(
        "SELECT id, first_name, last_name, email, created_at FROM users ORDER BY id ASC"
      );
      client.release();
      res.json(usersReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// // GET RAW ALL Users Endpoint
// const getRawUsers = (req, res) => {
//   pool.query(
//     "SELECT id, first_name, last_name, email, created_at FROM users ORDER BY id ASC",
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(results.rows);
//     }
//   );
// };

// Get All Users Name & Id only Endpoint
const getNameIdList = (req, res) => {
  pool.query(
    "SELECT CONCAT(first_name , ' ' , last_name) AS full_name, id FROM users ORDER BY last_name, first_name",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// GET Single User by Id Endpoint
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT first_name, last_name, email FROM users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// POST a new user Endpoint
const createUser = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, email, password],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

// PUT updated data in an existing user Endpoint
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, password } = req.body;

  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5",
    [first_name, last_name, email, password, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID:  ${id}`);
    }
  );
};

// DELETE a user Endpoint
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
  getUsersNew,
  getUsers,
  getRawUsers,
  getNameIdList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
