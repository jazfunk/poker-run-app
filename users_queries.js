const { pool } = require("./data_access");

// pool.on("error", (err, client) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

// GET All Users Endpoint
// // async/await - check out a client
const getUsers = async (req, res) => {
  return pool.connect().then(async (client) => {
    try {
      const usersReturned = await client.query(
        "SELECT first_name, last_name, email FROM users ORDER BY id ASC"
      );
      client.release();
      return usersReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// GET RAW ALL Users Endpoint
// async/await - check out a client
const getRawUsers = async () => {
  return pool.connect().then(async (client) => {
    try {
      const usersReturned = await client.query(
        "SELECT id, first_name, last_name, email, created_at FROM users ORDER BY id ASC"
      );
      client.release();
      return usersReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Check if user password exists Endpoint
// async/await - check out a client
const checkUser = async (email) => {
  return pool.connect().then(async (client) => {
    try {
      const userReturned = await client.query(
        "SELECT id, CONCAT(first_name , ' ' , last_name) AS full_name, email, password FROM users WHERE email = $1",
        [email]
      );
      client.release();
      return userReturned;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Get All Users Name & Id only Endpoint
// async/await - check out a client
const getNameIdList = async () => {
  return pool.connect().then(async (client) => {
    try {
      const nameIdReturned = await client.query(
        "SELECT CONCAT(first_name , ' ' , last_name) AS full_name, id FROM users ORDER BY last_name, first_name"
      );
      client.release();
      return nameIdReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// GET Single User by Id Endpoint
// async/await - check out a client
const getUserById = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const userReturned = await client.query(
        "SELECT first_name, last_name, email FROM users WHERE id = $1",
        [id]
      );
      client.release();
      return userReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// POST a new user Endpoint
// async/await - check out a client
const createUser = async (body) => {
  return pool.connect().then(async (client) => {
    const { first_name, last_name, email, password } = body;
    try {
      const userCreated = await client.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
        [first_name, last_name, email, password]
      );
      client.release();
      return userCreated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// PUT updated data in an existing user Endpoint
const updateUser = async (id, body) => {
  return pool.connect().then(async (client) => {
    const { first_name, last_name, email, password } = body;
    try {
      const updatedUser = await client.query(
        "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5",
        [first_name, last_name, email, password, id]
      );
      client.release();
      return updatedUser.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// DELETE a user Endpoint
const deleteUser = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const deletedUser = await client.query(
        "DELETE FROM users WHERE ID = $1",
        [id]
      );
      client.release();
      return deletedUser.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

module.exports = {
  checkUser,
  getUsers,
  getRawUsers,
  getNameIdList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
