const { pool } = require("./data_access");
// const { response, request } = require("express");
// const { user, host, db, pw, pg_port } = require("./config");

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: user,
//   host: host,
//   database: db,
//   password: pw,
//   port: pg_port,
// });

// GET All cards Endpoint
const getCards = (req, res) => {
  pool.query("SELECT id, card_face, card_suit, card_value, card_font FROM cards ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

module.exports = {
  getCards,
}