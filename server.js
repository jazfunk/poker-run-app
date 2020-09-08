const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const usersDb = require("./users_queries");
const runsDb = require("./runs_queries");
const runAdminsDb = require("./run_admins_queries");
const handsDb = require("./hands_queries");
const handCardsDb = require("./hand_cards_queries");
const cardsDb = require("./cards_queries");
const port = process.env.PORT || 5000;
const { client, startPage } = require("./config");

// const morgan = require("morgan");
// app.use(morgan('combined'));

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.static(__dirname + client));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Add to each
// I would add a try/catch around it though.
// If it works do the res.send(),
// otherwise do a res.status(500).send(err) s
// o you are returning a 500 error.

// USERS API ENDPOINTS*************************************************************

app.get("/api/users", async (req, res) => res.send(await usersDb.getUsers()));
app.get("/api/usersraw", async (req, res) =>
  res.send(await usersDb.getRawUsers())
);
app.get("/api/fullnames", async (req, res) =>
  res.send(await usersDb.getNameIdList())
);
app.get("/api/users/:id", async (req, res) =>
  res.send(await usersDb.getUserById(req.params.id))
);

// app.post("/api/users", async (req, res) => res.send(await usersDb.createUser(req.body)));
app.post("/api/users", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    usersDb
      .createUser({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
      })
      .then((data) => {
        if (data) {
          res.redirect("/home");
        }
      });
  });
});

app.put("/api/users/:id", async (req, res) =>
  res.send(await usersDb.updateUser(req.params.id, req.body))
);

app.delete("/api/users/:id", async (req, res) =>
  res.send(await usersDb.deleteUser(req.params.id))
);

app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;
  usersDb
    .checkUser(email)
    .then((user) => {
      if (user.rows < 1) {
        res.send("-1")
      } else {
        bcrypt.compare(password, user.rows[0].password, (err, result) => {
          if (result == true) {
            const user_id = user.rows[0].id;
            res.send(`${user_id}`)
          } else {
            res.send("0");
          }
        });
      }
    });
});

// RUNS API ENDPOINTS*************************************************************

app.get("/api/runs", async (req, res) => res.send(await runsDb.getRuns()));
app.get("/api/runs/:id", async (req, res) =>
  res.send(await runsDb.getRunById(req.params.id))
);
app.post("/api/runs", async (req, res) =>
  res.send(await runsDb.createRun(req.body))
);
app.put("/api/runs/:id", async (req, res) =>
  res.send(await runsDb.updateRun(req.params.id, req.body))
);
app.delete("/api/runs/:id", async (req, res) =>
  res.send(await runsDb.deleteRun(req.params.id))
);

// RUN_ADMIN API ENDPOINTS*************************************************************

app.get("/api/runadmin", async (req, res) =>
  res.send(await runAdminsDb.getRunAdmins())
);
app.get("/api/runadmin/:id", async (req, res) =>
  res.send(await runAdminsDb.getRunAdminById(req.params.id))
);
app.get("/api/runadminsbyrun/:id", async (req, res) =>
  res.send(await runAdminsDb.getRunAdminsByRun(req.params.id))
);
app.post("/api/runadmin", async (req, res) =>
  res.send(await runAdminsDb.createRunAdmin(req.body))
);
app.put("/api/runadmin/:id", async (req, res) =>
  res.send(await runAdminsDb.updateRunAdmin(req.params.id, req.body))
);
app.delete("/api/runadmin/:id", async (req, res) =>
  res.send(await runAdminsDb.deleteRunAdmin(req.params.id))
);

// Hands API ENDPOINTS*************************************************************

app.get("/api/hands", async (req, res) =>
  res.send(await handsDb.getAllHands())
);
app.get("/api/hands/:id", async (req, res) =>
  res.send(await handsDb.getHandById(req.params.id))
);
app.get("/api/handsuser/:id", async (req, res) =>
  res.send(await handsDb.getHandsByUserId(req.params.id))
);
app.post("/api/hands", async (req, res) =>
  res.send(await handsDb.createHand(req.body))
);
app.put("/api/hands/:id", async (req, res) =>
  res.send(await handsDb.updateHand(req.params.id, req.body))
);
app.delete("/api/hands/:id", async (req, res) =>
  res.send(await handsDb.deleteHand(req.params.id))
);

// Hand_Cards API ENDPOINTS*************************************************************

app.get("/api/handcards", async (req, res) =>
  res.send(await handCardsDb.getAllHandCards())
);
app.get("/api/handcards/:id", async (req, res) =>
  res.send(await handCardsDb.getHandCardById(req.params.id))
);
app.post("/api/handcards", async (req, res) =>
  res.send(await handCardsDb.createHandCard(req.body))
);
app.put("/api/handcards/:id", async (req, res) =>
  res.send(await handCardsDb.updateHandCard(req.params.id, req.body))
);
app.delete("/api/handcards/:id", async (req, res) =>
  res.send(await handCardsDb.deleteHandCard(req.params.id))
);

// Misc API ENDPOINTS*************************************************************

app.get("/api/usershand/:id/", async (req, res) =>
  res.send(await handsDb.getAllUserHands(req.params.id))
);
app.get("/api/usershand/:id/:hand_id", async (req, res) =>
  res.send(await handsDb.getUserHand(req.params.id, req.params.hand_id))
);

app.get("/api/dashboard", async (req, res) => {
  const dashboardData = {
    users: await usersDb.getRawUsers(),
    hands: await handsDb.getAllHands(),
    handCards: await handCardsDb.getAllHandCards(),
    runs: await runsDb.getRuns(),
    runAdmins: await runAdminsDb.getRunAdmins(),
    cards: await cardsDb.getCards(),
  };
  res.send(dashboardData);
});

app.get("/api/cards", async (req, res) => res.send(await cardsDb.getCards()));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + client + startPage));
});

app.listen(port, () => {
  console.log(`Poker Run API Server is running on port ${port}.`);
});
