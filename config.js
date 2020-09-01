if (process.env.ENVIRONMENT === "DEV") {
  const dotenv = require("dotenv");
  dotenv.config();
}

module.exports = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  db: process.env.PG_DATABASE,
  pw: process.env.PG_PASSWORD,
  pg_port: process.env.PG_PORT,
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  client: process.env.CLIENT_URL,
  startPage: process.env.CLIENT_START,
};
