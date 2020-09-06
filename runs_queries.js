const { pool } = require("./data_access");

// // async/await - check out a client
const getRuns = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const runsReturned = await client.query(
        "SELECT * FROM runs ORDER BY id ASC"
      );
      client.release();
      res.json(runsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};


// // Get All Runs Endpoint
// const getRuns = (req, res) => {
//   pool.query("SELECT * FROM runs ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// Get Single Run by Id Endpoint
const getRunById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM runs WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// POST a new Run Endpoint
const createRun = (req, res) => {
  const { run_name, run_description, run_date, owner_id } = req.body;

  pool.query(
    "INSERT INTO runs (run_name, run_description, run_date, owner_id) VALUES ($1, $2, $3, $4)",
    [run_name, run_description, run_date, owner_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Run added with ID:  ${result.insertId}`);
    }
  );
};

// PUT update data in an existing Run Endpoint
const updateRun = (req, res) => {
  const id = parseInt(req.params.id);
  const { run_name, run_description, run_date, owner_id } = req.body;

  pool.query(
    "UPDATE runs SET run_name = $1, run_description = $2, run_date = $3, owner_id = $4 WHERE id = $5",
    [run_name, run_description, run_date, owner_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Run modified with ID:  ${id}`);
    }
  );
};

// DELETE a run Endpoint
const deleteRun = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM runs WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID:  ${id}`);
  });  
};

module.exports = {
  getRuns,
  getRunById,
  createRun,
  updateRun,
  deleteRun,
}