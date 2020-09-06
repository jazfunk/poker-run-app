const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const morgan = require('morgan');
const usersDb = require("./users_queries");
const runsDb = require("./runs_queries");
const runAdminsDb = require("./run_admins_queries");
const handsDb = require("./hands_queries");
const handCardsDB = require("./hand_cards_queries");
const cardsDb = require("./cards_queries")
const port = process.env.PORT || 5000;
const { client, startPage } = require("./config");

// app.use(morgan('combined'));

app.use(express.static(__dirname + client));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/users", usersDb.getUsers);
app.get("/api/usersraw", usersDb.getRawUsers);
app.get("/api/fullnames", usersDb.getNameIdList);
app.get("/api/users/:id", usersDb.getUserById);
app.post("/api/users", usersDb.createUser);
app.put("/api/users/:id", usersDb.updateUser);
app.delete("/api/users/:id", usersDb.deleteUser);

app.get("/api/runs", runsDb.getRuns);
app.get("/api/runs/:id", runsDb.getRunById);
app.post("/api/runs", runsDb.createRun);
app.put("/api/runs/:id", runsDb.updateRun);
app.delete("/api/runs/:id", runsDb.deleteRun);

app.get("/api/runadmin", runAdminsDb.getRunAdmins);
app.get("/api/runadmin/:id", runAdminsDb.getRunAdminById);
app.get("/api/runadminsbyrun/:id", runAdminsDb.getRunAdminsByRun)
app.post("/api/runadmin", runAdminsDb.createRunAdmin);
app.put("/api/runadmin/:id", runAdminsDb.updateRunAdmin);
app.delete("/api/runadmin/:id", runAdminsDb.deleteRunAdmin);


app.get("/api/hands", handsDb.getAllHands);
app.get("/api/hands/:id", handsDb.getHandById);
app.get("/api/handsuser/:id", handsDb.getHandsByUserId);
app.post("/api/hands", handsDb.createHand);
app.put("/api/hands/:id", handsDb.updateHand);
app.delete("/api/hands/:id", handsDb.deleteHand);

app.get("/api/handcards", handCardsDB.getAllHandCards);
app.get("/api/handcards/:id", handCardsDB.getHandCardById);
app.post("/api/handcards", handCardsDB.createHandCard);
app.put("/api/handcards/:id", handCardsDB.updateHandCard);
app.delete("/api/handcards/:id", handCardsDB.deleteHandCard);

app.get("/api/usershand/:id/", handsDb.getAllUserHands);
app.get("/api/usershand/:id/:hand_id", handsDb.getUserHand);

app.get("/api/cards", cardsDb.getCards);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + client + startPage));
});

app.listen(port, () => {
  console.log(`Poker Run API Server is running on port ${port}.`);
});
