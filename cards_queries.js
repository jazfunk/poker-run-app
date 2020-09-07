const { pool } = require("./data_access");

// GET All cards Endpoint
// async/await - check out a client
const getCards = async (req, res) => {
  return pool.connect().then(async (client) => {
    try {
      const cardsReturned = await client.query(
        "SELECT id, card_face, card_suit, card_value, card_font FROM cards ORDER BY id ASC"
      );
      client.release();
      return cardsReturned.rows;
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};

module.exports = {
  getCards,
}