const { pool } = require("./data_access");

// async/await - check out a client
// Get All Hands Endpoint
const getAllHands = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const handsReturned = await client.query(
        "SELECT * FROM hands ORDER BY id ASC"
      );
      client.release();
      res.json(handsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // GET All Hands Endpoint
// const getAllHands = (req, res) => {
//   pool.query("SELECT * FROM hands ORDER BY id ASC", (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// };

// GET Single Hand by Id Endpoint
// async/await - check out a client
const getHandById = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    try {
      const handReturned = await client.query(
        "SELECT * FROM hands WHERE id = $1",
        [id]
      );
      client.release();
      res.json(handReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // GET Single Hand by Id Endpoint
// const getHandById = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("SELECT * FROM hands WHERE id = $1", [id], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// };

// GET Hands by user id Endpoint
// async/await - check out a client
const getHandsByUserId = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    try {
      const handsReturned = await client.query(
        "SELECT * FROM hands WHERE user_id = $1 ORDER by hand_number",
        [id]
      );
      client.release();
      res.json(handsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // GET Hands by user id Endpoint
// const getHandsByUserId = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("SELECT * FROM hands WHERE user_id = $1 ORDER by hand_number", [id], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// };

// POST a new hand Endpoint
// async/await - check out a client
const createHand = async (req, res) => {
  pool.connect().then(async (client) => {
    const { user_id, run_id, hand_rank, hand_number } = req.body;
    try {
      const handCreated = await client.query(
        "INSERT INTO hands (user_id, run_id, hand_rank, hand_number) VALUES ($1, $2, $3, $4)",
        [user_id, run_id, hand_rank, hand_number]
      );
      client.release();
      res.json(handCreated.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // POST a new hand Endpoint
// const createHand = (req, res) => {
//   const { user_id, run_id, hand_rank, hand_number } = req.body;

//   pool.query(
//     "INSERT INTO hands (user_id, run_id, hand_rank, hand_number) VALUES ($1, $2, $3, $4)",
//     [user_id, run_id, hand_rank, hand_number],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.status(201).send(`Hand added with ID: ${result.insertId}`);
//     }
//   );
// };

// PUT updated data in an existing hand Endpoint
// async/await - check out a client
const updateHand = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    const { user_id, run_id, hand_rank, hand_number } = req.body;
    try {
      const handUpdated = await client.query(
        "UPDATE hands SET user_id = $1, run_id = $2, hand_rank = $3, hand_number = $4 WHERE id = $5",
        [user_id, run_id, hand_rank, hand_number, id]
      );
      client.release();
      res.json(handUpdated.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // PUT updated data in an existing hand Endpoint
// const updateHand = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { user_id, run_id, hand_rank, hand_number } = req.body;

//   pool.query(
//     "UPDATE hands SET user_id = $1, run_id = $2, hand_rank = $3, hand_number = $4 WHERE id = $5",
//     [user_id, run_id, hand_rank, hand_number, id],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).send(`Hand modified`);
//     }
//   );
// };

// DELETE a hand Endpoint
// async/await - check out a client
const deleteHand = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    try {
      const handDeleted = await client.query(
        "DELETE FROM hands WHERE ID = $1",
        [id]
      );
      client.release();
      res.json(handDeleted.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // DELETE a hand Endpoint
// const deleteHand = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("DELETE FROM hands WHERE ID = $1", [id], (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).send(`Hand deleted`);
//   });
// };

// GET Users hands by user.id, hand_cards.id
// async/await - check out a client
const getUserHand = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);
    const hand_id = parseInt(req.params.hand_id);

    const selectStatement =
      "SELECT users.first_name, users.last_name, hands.hand_rank, hands.hand_number, hand_cards.hand_id, hand_cards.card_id, cards.card_face, cards.card_suit, cards.card_value ";
    const fromJoinStatement =
      "FROM users INNER JOIN hands ON users.id = hands.user_id INNER JOIN hand_cards ON hand_cards.hand_id = hands.id INNER JOIN cards ON cards.id = hand_cards.card_id ";
    const whereStatement = "WHERE users.id = $1 AND hand_cards.hand_id = $2 ORDER BY cards.card_face, cards.card_suit";

    try {
      const userHandReturned = await client.query(
        `${selectStatement}${fromJoinStatement}${whereStatement}`,
        [id, hand_id]
      );
      client.release();
      res.json(userHandReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // GET Users hands by user.id, hand_cards.id
// const getUserHand = (req, res) => {
//   const id = parseInt(req.params.id);
//   const hand_id = parseInt(req.params.hand_id);

//   const selectStatement =
//     "SELECT users.first_name, users.last_name, hands.hand_rank, hands.hand_number, hand_cards.hand_id, hand_cards.card_id, cards.card_face, cards.card_suit, cards.card_value ";
//   const fromJoinStatement =
//     "FROM users INNER JOIN hands ON users.id = hands.user_id INNER JOIN hand_cards ON hand_cards.hand_id = hands.id INNER JOIN cards ON cards.id = hand_cards.card_id ";
//   const whereStatement = "WHERE users.id = $1 AND hand_cards.hand_id = $2";

//   pool.query(
//     `${selectStatement}${fromJoinStatement}${whereStatement}`,
//     [id, hand_id],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(result.rows);
//     }
//   );
// };

// GET Users hands by user.id
// async/await - check out a client
const getAllUserHands = async (req, res) => {
  pool.connect().then(async (client) => {
    const id = parseInt(req.params.id);

    const selectStatement =
      "SELECT users.first_name, users.last_name, hands.hand_rank, hands.hand_number, hand_cards.hand_id, hand_cards.card_id, cards.card_face, cards.card_suit, cards.card_value ";
    const fromJoinStatement =
      "FROM users INNER JOIN hands ON users.id = hands.user_id INNER JOIN hand_cards ON hand_cards.hand_id = hands.id INNER JOIN cards ON cards.id = hand_cards.card_id ";
    const whereStatement =
      "WHERE users.id = $1 ORDER BY hands.id, hands.hand_number, cards.card_face, cards.card_suit";
    try {
      const handsReturned = await client.query(
        `${selectStatement}${fromJoinStatement}${whereStatement}`,
        [id]
      );
      client.release();
      res.json(handsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};
// // GET Users hands by user.id
// const getAllUserHands = (req, res) => {
//   const id = parseInt(req.params.id);

//   const selectStatement =
//     "SELECT users.first_name, users.last_name, hands.hand_rank, hands.hand_number, hand_cards.hand_id, hand_cards.card_id, cards.card_face, cards.card_suit, cards.card_value ";
//   const fromJoinStatement =
//     "FROM users INNER JOIN hands ON users.id = hands.user_id INNER JOIN hand_cards ON hand_cards.hand_id = hands.id INNER JOIN cards ON cards.id = hand_cards.card_id ";
//   const whereStatement =
//     "WHERE users.id = $1 ORDER BY hands.id, hands.hand_number, cards.card_face, cards.card_suit";

//   pool.query(
//     `${selectStatement}${fromJoinStatement}${whereStatement}`,
//     [id],
//     (error, result) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(result.rows);
//     }
//   );
// };

// SELECT
//     users.first_name,
//     users.last_name,
//     hands.hand_rank,
//     hands.hand_number,
// 	hand_cards.hand_id,
//     hand_cards.card_id,
//     cards.card_face,
//     cards.card_suit,
//     cards.card_value
// FROM
//     users INNER JOIN hands ON
//         users.id = hands.user_id
//     INNER JOIN hand_cards ON
//         hand_cards.hand_id = hands.id
//     INNER JOIN cards ON
//         cards.id = hand_cards.card_id
// WHERE
//     users.id = '2'
// 	AND hand_cards.hand_id = '8'

module.exports = {
  getAllHands,
  getHandById,
  getHandsByUserId,
  createHand,
  updateHand,
  deleteHand,
  getUserHand,
  getAllUserHands,
};
