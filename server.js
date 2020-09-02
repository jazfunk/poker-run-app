const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const usersDb = require("./queries");
const runsDb = require("./runqueries");
const port = process.env.PORT || 5000;
const { client, startPage } = require("./config");

// Todo: Install Morgan to log all HTTP Requests

app.use(express.static(__dirname + client));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/users", usersDb.getUsers);
app.get("/fullnames", usersDb.getNameIdList);
app.get("/users/:id", usersDb.getUserById);
app.post("/users", usersDb.createUser);
app.put("/users/:id", usersDb.updateUser);
app.delete("/users/:id", usersDb.deleteUser);

app.get("/runs", runsDb.getRuns);
app.get("/runs/:id", runsDb.getRunById);
app.post("/runs", runsDb.createRun);
app.put("/runs/:id", runsDb.updateRun);
app.delete("/runs/:id", runsDb.deleteRun);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + client + startPage));
});

app.listen(port, () => {
  console.log(`Poker Run API Server is running on port ${port}.`);
});
