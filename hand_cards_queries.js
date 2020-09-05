const { pool } = require("./data_access");
// const { response, request } = require("express");
// const { user, host, db, pw, pg_port } = require("./config")

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: user,
//   host: host,
//   database: db,
//   password: pw,
//   port: pg_port,
// });

// Get All Hand cards Endpoint Endpoint
const getAllHandCards = (req, res) => {
  pool.query("SELECT * FROM hand_cards ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

// Get Single Hand Card by Id Endpoint
const getHandCardById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM hand_cards WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

// POST a new hand card Endpoint
const createHandCard = (req, res) => {
  const { hand_id, card_id } = req.body;

  pool.query(
    "INSERT INTO hand_cards (hand_id, card_id) VALUES ($1, $2)",
    [hand_id, card_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Hand Card added with ID:  ${result.insertId}`);
    }
  );
};

// PUT update data in an existing hand card Endpoint
const updateHandCard = (req, res) => {
  const id = parseInt(req.params.id);
  const { hand_id, card_id } = req.body;

  pool.query(
    "UPDATE hand_cards SET hand_id = $1, card_id = $2 WHERE id = $3",
    [hand_id, card_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Hand Card modified`);
    }
  );
};

// DELETE a hand card Endpoint
const deleteHandCard = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM hand_cards WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Hand Card deleted`);
  });  
};

module.exports = {
  getAllHandCards,
  getHandCardById,
  createHandCard,
  updateHandCard,
  deleteHandCard,
}