const { pool } = require("./data_access");

// Get All Hand cards Endpoint Endpoint
// async/await - check out a client
const getAllHandCards = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const handsCardsReturned = await client.query(
        "SELECT * FROM hand_cards ORDER BY id ASC"
      );
      client.release();
      res.json(handsCardsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // Get All Hand cards Endpoint Endpoint
// const getAllHandCards = (req, res) => {
//   pool.query("SELECT * FROM hand_cards ORDER BY id ASC", (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// };

// Get Single Hand Card by Id Endpoint
// async/await - check out a client
const getHandCardById = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    try {
      const handCardsReturned = await client.query(
        "SELECT * FROM hand_cards WHERE id = $1",
        [id]
      );
      client.release();
      res.json(handCardsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // Get Single Hand Card by Id Endpoint
// const getHandCardById = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("SELECT * FROM hand_cards WHERE id = $1", [id], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// };

// POST a new hand card Endpoint
// async/await - check out a client
const createHandCard = async (req, res) => {
  pool.connect().then(async (client) => {
    const { hand_id, card_id } = req.body;
    try {
      const handCardCreated = await client.query(
        "INSERT INTO hand_cards (hand_id, card_id) VALUES ($1, $2)",
        [hand_id, card_id]
      );
      client.release();
      res.json(handCardCreated.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // POST a new hand card Endpoint
// const createHandCard = (req, res) => {
//   const { hand_id, card_id } = req.body;

//   pool.query(
//     "INSERT INTO hand_cards (hand_id, card_id) VALUES ($1, $2)",
//     [hand_id, card_id],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.status(201).send(`Hand Card added with ID:  ${result.insertId}`);
//     }
//   );
// };

// PUT update data in an existing hand card Endpoint
// async/await - check out a client
const updateHandCard = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    const { hand_id, card_id } = req.body;
    try {
      const handCardUpdated = await client.query(
        "UPDATE hand_cards SET hand_id = $1, card_id = $2 WHERE id = $3",
    [hand_id, card_id, id]
      );
      client.release();
      res.json(handCardUpdated.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // PUT update data in an existing hand card Endpoint
// const updateHandCard = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { hand_id, card_id } = req.body;

//   pool.query(
//     "UPDATE hand_cards SET hand_id = $1, card_id = $2 WHERE id = $3",
//     [hand_id, card_id, id],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).send(`Hand Card modified`);
//     }
//   );
// };

// DELETE a hand card Endpoint
// async/await - check out a client
const deleteHandCard = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    try {
      const handCardDeleted = await client.query(
        "DELETE FROM hand_cards WHERE id = $1", [id]
      );
      client.release();
      res.json(handCardDeleted.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // DELETE a hand card Endpoint
// const deleteHandCard = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("DELETE FROM hand_cards WHERE id = $1", [id], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).send(`Hand Card deleted`);
//   });
// };

module.exports = {
  getAllHandCards,
  getHandCardById,
  createHandCard,
  updateHandCard,
  deleteHandCard,
};
