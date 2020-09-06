const { pool } = require("./data_access");

// // async/await - check out a client
const getRunAdmins = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const runAdminsReturned = await client.query(
        "SELECT * FROM run_admins ORDER BY id ASC"
      );
      client.release();
      res.json(runAdminsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// // Get All Run Admins Endpoint
// const getRunAdmins = (req, res) => {
//   pool.query("SELECT * FROM run_admins ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };




// REWRITE ALL OF THESE TO USE ASYNC/AWAIT

// Get Single Run Admin by Id Endpoint Endpint
const getRunAdminById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM run_admins WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// POST a new Run Admin Endpoint
const createRunAdmin = (req, res) => {
  const { user_id, run_id, admin_role } = req.body;

  pool.query(
    "INSERT INTO run_admins (user_id, run_id, admin_role) VALUES ($1, $2, $3)",
    [user_id, run_id, admin_role],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Run Admin added`);
    }
  );
};

// PUT update data in existing run admin Endpint
const updateRunAdmin = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, run_id, admin_role } = req.body;

  pool.query(
    "UPDATE run_admins SET user_id = $1, run_id = $2, admin_role = $3 WHERE id = $4",
    [user_id, run_id, admin_role, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Run Admin modified with ID:  ${id}`);
    }
  );
};

// DELETE a run admin Endpint
const deleteRunAdmin = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM run_admins WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID:  ${id}`);
  });
};

// Joined Queries
const getRunAdminsByRun = (req, res) => {
  const id = parseInt(req.params.id);

  const selectStatement =
    "SELECT CONCAT(users.first_name , ' ' , users.last_name) AS full_name, runs.run_description, run_admins.admin_role, run_admins.created_at ";
  const fromJoinStatement =
    "FROM users INNER JOIN run_admins ON users.id = run_admins.user_id INNER JOIN runs ON runs.id = run_admins.run_id ";
  const whereStatement = "WHERE  runs.id = $1";

  pool.query(
    `${selectStatement}${fromJoinStatement}${whereStatement}`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};

// SELECT CONCAT(users.first_name , ' ' , users.last_name) AS full_name, runs.run_description, run_admins.admin_role, run_admins.created_at
// FROM users INNER JOIN run_admins ON users.id = run_admins.user_id INNER JOIN runs ON runs.id = run_admins.run_id
// WHERE  runs.id = '1'

// SELECT
// 	CONCAT(users.first_name , ' ' , users.last_name) AS full_name,
// 	runs.run_description,
// 	run_admins.admin_role,
// 	run_admins.created_at
// FROM
// 	users INNER JOIN run_admins ON
// 		users.id = run_admins.user_id
// 	INNER JOIN runs ON
// 		runs.id = run_admins.run_id
// WHERE
// 	runs.id = '1'

module.exports = {
  getRunAdmins,
  getRunAdminById,
  createRunAdmin,
  updateRunAdmin,
  deleteRunAdmin,
  getRunAdminsByRun,
};
