const { pool } = require("../data_access");

// pool.on("error", (err, client) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

// async/await - check out a client
// Get All Hands Endpoint
const getAllHands = async (req, res) => {
  return pool.connect().then(async (client) => {
    try {
      const handsReturned = await client.query(
        "SELECT * FROM hands ORDER BY id ASC"
      );
      client.release();
      return handsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// GET Single Hand by Id Endpoint
// async/await - check out a client
const getHandById = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const handReturned = await client.query(
        "SELECT * FROM hands WHERE id = $1",
        [id]
      );
      client.release();
      return handReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// GET Hands by user id Endpoint
// async/await - check out a client
const getHandsByUserId = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const handsReturned = await client.query(
        "SELECT * FROM hands WHERE user_id = $1 ORDER by hand_number",
        [id]
      );
      client.release();
      return handsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// POST a new hand Endpoint "/api/hands"
// async/await - check out a client
const createHand = async (body) => {
  return pool.connect().then(async (client) => {
    const { user_id, run_id, hand_rank, hand_number } = body;
    try {
      const handCreated = await client.query(
        "INSERT INTO hands (user_id, run_id, hand_rank, hand_number) VALUES ($1, $2, $3, $4)",
        [user_id, run_id, hand_rank, hand_number]
      );
      client.release();
      return handCreated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// PUT updated data in an existing hand Endpoint
// async/await - check out a client
const updateHand = async (id, body) => {
  return pool.connect().then(async (client) => {
    const { user_id, run_id, hand_rank, hand_number } = body;
    try {
      const handUpdated = await client.query(
        "UPDATE hands SET user_id = $1, run_id = $2, hand_rank = $3, hand_number = $4 WHERE id = $5",
        [user_id, run_id, hand_rank, hand_number, id]
      );
      client.release();
      return handUpdated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// DELETE a hand Endpoint
// async/await - check out a client
const deleteHand = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const handDeleted = await client.query(
        "DELETE FROM hands WHERE ID = $1",
        [id]
      );
      client.release();
      return handDeleted.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};


// Joined Queries
// GET Users hands by user.id, hand_cards.id
// async/await - check out a client
const getUserHand = async (id, hand_id) => {
  return pool.connect().then(async (client) => {
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
      return userHandReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// GET Users hands by user.id
// async/await - check out a client
const getAllUserHands = async (id) => {
  return pool.connect().then(async (client) => {    
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
      return handsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};


// GET joined full_name, run_name
// async/await - check out a client
const getHandsNameRun = async () => {
  return pool.connect().then(async (client) => {
    const selectStatement =
    "SELECT hands.id, CONCAT(users.first_name , ' ' , users.last_name) AS full_name, runs.run_name, hands.hand_rank, hands.hand_number, hands.created_at ";
    const fromJoinStatement =
    "FROM users INNER JOIN hands ON users.id = hands.user_id INNER JOIN runs ON runs.id = hands.run_id ";    
    const orderByStatement = 
    "ORDER BY runs.id, users.last_name, users.first_name, hands.hand_number";

    try {
      const joinedHandsReturned = await client.query(
        `${selectStatement}${fromJoinStatement}${orderByStatement}`
      );
      client.release();
      return joinedHandsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

module.exports = {
  getAllHands,
  getHandById,
  getHandsByUserId,
  createHand,
  updateHand,
  deleteHand,
  getUserHand,
  getAllUserHands,
  getHandsNameRun,
};
