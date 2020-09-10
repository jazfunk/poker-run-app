const { pool } = require("../data_access");

// Get All Runs Endpoint
// async/await - check out a client
const getRuns = async (req, res) => {
  return pool.connect().then(async (client) => {
    try {
      const runsReturned = await client.query(
        "SELECT * FROM runs ORDER BY id ASC"
      );
      client.release();
      return runsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Get Single Run by Id Endpoint
// async/await - check out a client
const getRunById = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const runReturned = await client.query(
        "SELECT * FROM runs WHERE id = $1",
        [id]
      );
      client.release();
      return runReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// POST a new Run Endpoint
// async/await - check out a client
const createRun = async (body) => {
  return pool.connect().then(async (client) => {
    const { run_name, run_description, run_date, owner_id } = body;
    try {
      const runCreated = await client.query(
        "INSERT INTO runs (run_name, run_description, run_date, owner_id) VALUES ($1, $2, $3, $4)",
        [run_name, run_description, run_date, owner_id]
      );
      client.release();
      return runCreated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// PUT update data in an existing Run Endpoint
// async/await - check out a client
const updateRun = async (id, body) => {
  return pool.connect().then(async (client) => {
    const { run_name, run_description, run_date, owner_id } = body;
    try {
      const runUpdated = await client.query(
        "UPDATE runs SET run_name = $1, run_description = $2, run_date = $3, owner_id = $4 WHERE id = $5",
        [run_name, run_description, run_date, owner_id, id]
      );
      client.release();
      return runUpdated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// DELETE a run Endpoint
// async/await - check out a client
const deleteRun = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const runDeleted = await client.query("DELETE FROM runs WHERE id = $1", [
        id,
      ]);
      client.release();
      return runDeleted.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

module.exports = {
  getRuns,
  getRunById,
  createRun,
  updateRun,
  deleteRun,
};
