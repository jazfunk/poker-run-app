const { response, request } = require("express");
const { user, host, db, pw, pg_port } = require("./config");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: user,
  host: host,
  database: db,
  password: pw,
  port: pg_port,
});

// GET All Hands Endpoint
const getAllHands = (req, res) => {
  pool.query("SELECT * FROM hands ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

// GET Single Hand by Id Endpoint
const getHandById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM hands WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

// POST a new hand Endpoint
const createHand = (req, res) => {
  const { user_id, run_id, hand_rank, hand_number } = req.body;

  pool.query(
    "INSERT INTO hands (user_id, run_id, hand_rank, hand_number) VALUES ($1, $2, $3, $4)",
    [user_id, run_id, hand_rank, hand_number],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Hand added with ID: ${result.insertId}`);
    }
  );
};

// PUT updated data in an existing hand Endpoint
const updateHand = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, run_id, hand_rank, hand_number } = req.body;

  pool.query(
    "UPDATE hands SET user_id = $1, run_id = $2, hand_rank = $3, hand_number = $4 WHERE id = $5",
    [user_id, run_id, hand_rank, hand_number, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Hand modified`);
    }
  );
};

// DELETE a hand Endpoint
const deleteHand = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM hands WHERE ID = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Hand deleted`);
  });
};

module.exports = {
  getAllHands,
  getHandById,
  createHand,
  updateHand,
  deleteHand,
}
