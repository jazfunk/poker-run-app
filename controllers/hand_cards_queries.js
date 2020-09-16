const { pool } = require("../data_access");

// Get All Hand cards Endpoint Endpoint
// async/await - check out a client
const getAllHandCards = async (req, res) => {
  return pool.connect().then(async (client) => {
    try {
      const handsCardsReturned = await client.query(
        "SELECT * FROM hand_cards ORDER BY id ASC"
      );
      client.release();
      return handsCardsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Get Single Hand Card by Id Endpoint
// async/await - check out a client
const getHandCardById = async (id) => {
  return pool.connect().then(async (client) => {
    try {
      const handCardsReturned = await client.query(
        "SELECT * FROM hand_cards WHERE id = $1",
        [id]
      );
      client.release();
      return handCardsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// POST a new hand card Endpoint
// async/await - check out a client
const createHandCard = async (body) => {
  pool.connect().then(async (client) => {
    const { hand_id, card_id } = body;
    try {
      const handCardCreated = await client.query(
        "INSERT INTO hand_cards (hand_id, card_id) VALUES ($1, $2)",
        [hand_id, card_id]
      );
      client.release();
      return handCardCreated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// POST entire hand of cards from Array Endpoint
// async/await - check out a client
const createHandCardFromArray = async (body) => {
  pool.connect().then(async (client) => {
    const newHandCards = body;
    newHandCards.forEach(async (card) => {
      const { hand_id, card_id } = card;
      try {
        const handCardCreated = await client.query(
          "INSERT INTO hand_cards (hand_id, card_id) VALUES ($1, $2)",
          [hand_id, card_id]
        );
        return handCardCreated.rows;
      } catch (err) {
        client.release();
        console.log(err.stack);
        return [];
      }
    });
    client.release();
  });
};

// PUT update data in an existing hand card Endpoint
// async/await - check out a client
const updateHandCard = async (id, body) => {
  pool.connect().then(async (client) => {
    const { hand_id, card_id } = body;
    try {
      const handCardUpdated = await client.query(
        "UPDATE hand_cards SET hand_id = $1, card_id = $2 WHERE id = $3",
        [hand_id, card_id, id]
      );
      client.release();
      return handCardUpdated.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// DELETE a hand card Endpoint
// async/await - check out a client
const deleteHandCard = async (id) => {
  pool.connect().then(async (client) => {
    try {
      const handCardDeleted = await client.query(
        "DELETE FROM hand_cards WHERE id = $1",
        [id]
      );
      client.release();
      return handCardDeleted.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

// Joined Queries
// Get all raw and joined hand_cards table data
const getAllHandCardsNameFaceSuit = async (id) => {
  return pool.connect().then(async (client) => {
    const selectStatement =
      "SELECT hand_cards.id, hands.user_id, CONCAT(users.first_name , ' ' , users.last_name) AS full_name, hand_cards.hand_id, hands.hand_number, hand_cards.card_id, cards.card_face, cards.card_suit, cards.card_value, hand_cards.created_at ";
    const fromJoinStatement =
      "FROM hand_cards INNER JOIN hands ON hand_cards.hand_id = hands.id INNER JOIN users ON users.id = hands.user_id INNER JOIN cards ON cards.id = hand_cards.card_id ";
    const orderByStatement =
      "ORDER BY users.id, hand_cards.hand_id, hands.id, hand_cards.card_id";

    try {
      const handCardsFullReturned = await client.query(
        `${selectStatement}${fromJoinStatement}${orderByStatement}`
      );
      client.release();
      return handCardsFullReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

module.exports = {
  getAllHandCards,
  getHandCardById,
  createHandCard,
  createHandCardFromArray,
  updateHandCard,
  deleteHandCard,
  getAllHandCardsNameFaceSuit,
};

// "SELECT hand_cards.id, users.id, CONCAT(users.first_name , ' ' , users.last_name) AS full_name, hand_cards.hand_id, hands.hand_number, hand_cards.card_id, cards.card_face, cards.card_suit, hand_cards.created_at ";
// "FROM hand_cards INNER JOIN hands ON hand_cards.hand_id = hands.id INNER JOIN users ON users.id = hands.user_id INNER JOIN cards ON cards.id = hand_cards.card_id ";
// "ORDER BY users.id, hand_cards.hand_id, hands.id, hand_cards.card_id";

// SELECT
// 	hand_cards.id,
// 	hands.user_id,
//     CONCAT(users.first_name , ' ' , users.last_name) AS full_name,
//     hand_cards.hand_id,
// 	hands.hand_number,
// 	hand_cards.card_id,
// 	cards.card_face,
// 	cards.card_suit,
// 	hand_cards.created_at
// FROM
//     hand_cards INNER JOIN hands ON
//         hand_cards.hand_id = hands.id
//     INNER JOIN users ON
//         users.id = hands.user_id
// 	INNER JOIN cards ON
// 		cards.id = hand_cards.card_id
// ORDER BY
// 	users.id, hand_cards.hand_id, hands.id, hand_cards.card_id
