const { pool } = require("../data_access");

// Get All Run Admins Endpoint
// async/await - check out a client
const getRunAdmins = async (req, res) => {
  return pool.connect().then(async (client) => {
    try {
      const runAdminsReturned = await client.query(
        "SELECT * FROM run_admins ORDER BY id ASC"
      );
      client.release();
      return runAdminsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Get Single Run Admin by Id Endpoint Endpint
// async/await - check out a client
const getRunAdminById = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const runAdminReturned = await client.query(
        "SELECT * FROM run_admins WHERE id = $1",
        [id]
      );
      client.release();
      return runAdminReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// POST a new Run Admin Endpoint
// async/await - check out a client
const createRunAdmin = async (body) => {
  return pool.connect().then(async (client) => {
    const { user_id, run_id, admin_role } = body;
    try {
      const runAdminCreated = await client.query(
        "INSERT INTO run_admins (user_id, run_id, admin_role) VALUES ($1, $2, $3)",
        [user_id, run_id, admin_role]
      );
      client.release();
      return runAdminCreated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// PUT update data in existing run admin Endpint
// async/await - check out a client
const updateRunAdmin = async (id, body) => {
  return pool.connect().then(async (client) => {
    const { user_id, run_id, admin_role } = body;
    try {
      const runAdminUpdated = await client.query(
        "UPDATE run_admins SET user_id = $1, run_id = $2, admin_role = $3 WHERE id = $4",
        [user_id, run_id, admin_role, id]
      );
      client.release();
      return runAdminUpdated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// DELETE a run admin Endpint
// async/await - check out a client
const deleteRunAdmin = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const runAdminDeleted = await client.query(
        "DELETE FROM run_admins WHERE id = $1",
        [id]
      );
      client.release();
      return runAdminDeleted.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Joined Queries
// async/await - check out a client
const getRunAdminsByRun = async (id) => {
  return pool.connect().then(async (client) => {
    const selectStatement =
      "SELECT CONCAT(users.first_name , ' ' , users.last_name) AS full_name, runs.run_description, run_admins.admin_role, run_admins.created_at ";
    const fromJoinStatement =
      "FROM users INNER JOIN run_admins ON users.id = run_admins.user_id INNER JOIN runs ON runs.id = run_admins.run_id ";
    const whereStatement = "WHERE  runs.id = $1";

    try {
      const runAdminsReturned = await client.query(
        `${selectStatement}${fromJoinStatement}${whereStatement}`,
        [id]
      );
      client.release();
      return runAdminsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

const getRunAdminFullRun = async (id) => {
  return pool.connect().then(async (client) => {
    const selectStatement =
      "";
    const fromJoinStatement =
      "";

    try {
      const runAdminsReturned = await client.query(
        `${selectStatement}${fromJoinStatement}`,
        [id]
      );
      client.release();
      return runAdminsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

const getAllRunAdminNameRun = async (id) => {
  return pool.connect().then(async (client) => {
    const selectStatement =
    "SELECT run_admins.id, run_admins.user_id, CONCAT(users.first_name , ' ' , users.last_name) AS full_name, run_admins.run_id, runs.run_name, run_admins.admin_role, run_admins.created_at ";
    const fromJoinStatement =
    "FROM run_admins INNER JOIN users ON run_admins.user_id = users.id INNER JOIN runs ON runs.id = run_admins.run_id ";
    const orderByStatement = 
    "ORDER BY users.last_name, users.first_name, run_admins.user_id";

    try {
      const runAdminsReturned = await client.query(
        `${selectStatement}${fromJoinStatement}${orderByStatement}`
      );
      client.release();
      return runAdminsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};



// "SELECT run_admins.id, run_admins.user_id, CONCAT(users.first_name , ' ' , users.last_name) AS full_name, run_admins.run_id, runs.run_name, run_admins.admin_role, run_admins.created_at ";
// "FROM run_admins INNER JOIN users ON run_admins.user_id = users.id INNER JOIN runs ON runs.id = run_admins.run_id ";
// "ORDER BY users.last_name, users.first_name, run_admins.user_id";


// SELECT
// 	run_admins.id,
// 	run_admins.user_id,
//     CONCAT(users.first_name , ' ' , users.last_name) AS full_name,
//     run_admins.run_id,
// 	runs.run_name,
// 	run_admins.admin_role,
// 	run_admins.created_at
// FROM
//     run_admins INNER JOIN users ON
//         run_admins.user_id = users.id
//     INNER JOIN runs ON
//         runs.id = run_admins.run_id
// ORDER BY
// 	users.last_name, users.first_name, run_admins.user_id






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
  getRunAdminFullRun,
  getAllRunAdminNameRun,
};
