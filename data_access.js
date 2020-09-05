const { user, host, db, pw, pg_port } = require("./config");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: user,
  host: host,
  database: db,
  password: pw,
  port: pg_port,
});

module.exports = {
  pool,
}