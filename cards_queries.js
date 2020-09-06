const { pool } = require("./data_access");


// // async/await - check out a client
const getCards = async (req, res) => {
  pool.connect().then(async (client) => {
    try {
      const cardsReturned = await client.query(
        "SELECT id, card_face, card_suit, card_value, card_font FROM cards ORDER BY id ASC"
      );
      client.release();
      // console.log(cardsReturned.rows);
      res.json(cardsReturned.rows);
    } catch (err) {
      client.release();
      console.log(err.stack);
      return [];
    }
  });
};



// // GET All cards Endpoint
// const getCards = (req, res) => {
//   pool.query("SELECT id, card_face, card_suit, card_value, card_font FROM cards ORDER BY id ASC", (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// };

module.exports = {
  getCards,
}