const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const usersDb = require("./models/users_queries");
const runsDb = require("./models/runs_queries");
const runAdminsDb = require("./models/run_admins_queries");
const handsDb = require("./models/hands_queries");
const handCardsDb = require("./models/hand_cards_queries");
const cardsDb = require("./models/cards_queries");
const port = process.env.PORT || 5000;
const { client, startPage, saltRounds } = require("./config");
const bcrypt = require("bcrypt");

const morgan = require("morgan");
app.use(morgan('combined'));

app.use(express.static(__dirname + client));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// USERS API ENDPOINTS*************************************************************

app.get("/api/users", async (req, res) => {
  try {
    res.send(await usersDb.getUsers());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/usersraw", async (req, res) => {
  try {
    res.send(await usersDb.getRawUsers());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/fullnames", async (req, res) => {
  try {
    res.send(await usersDb.getNameIdList());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    res.send(await usersDb.getUserById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/users", (req, res) => {
  try {
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
            res.status(200).send("User Created");
          }
        });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    res.send(await usersDb.updateUser(req.params.id, req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    res.send(await usersDb.deleteUser(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    usersDb.checkUser(email).then((user) => {
      if (user.rows < 1) {
        res.send("-1");
      } else {
        bcrypt.compare(password, user.rows[0].password, (err, result) => {
          if (result == true) {
            const user_id = user.rows[0].id;
            res.send(`${user_id}`);
          } else {
            res.send("0");
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// RUNS API ENDPOINTS*************************************************************

app.get("/api/runs", async (req, res) => {
  try {
    res.send(await runsDb.getRuns());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/runs/:id", async (req, res) => {
  try {
    res.send(await runsDb.getRunById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/runs", async (req, res) => {
  try {
    res.send(await runsDb.createRun(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/runs/:id", async (req, res) => {
  try {
    res.send(await runsDb.updateRun(req.params.id, req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/runs/:id", async (req, res) => {
  try {
    res.send(await runsDb.deleteRun(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

// RUN_ADMIN API ENDPOINTS*************************************************************

app.get("/api/runadmin", async (req, res) => {
  try {
    res.send(await runAdminsDb.getRunAdmins());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/runadmin/:id", async (req, res) => {
  try {
    res.send(await runAdminsDb.getRunAdminById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/runadminsbyrun/:id", async (req, res) => {
  try {
    res.send(await runAdminsDb.getRunAdminsByRun(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/runadmin", async (req, res) => {
  try {
    res.send(await runAdminsDb.createRunAdmin(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/runadmin/:id", async (req, res) => {
  try {
    res.send(await runAdminsDb.updateRunAdmin(req.params.id, req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/runadmin/:id", async (req, res) => {
  try {
    res.send(await runAdminsDb.deleteRunAdmin(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

// Hands API ENDPOINTS*************************************************************

app.get("/api/hands", async (req, res) => {
  try {
    res.send(await handsDb.getAllHands());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/hands/:id", async (req, res) => {
  try {
    res.send(await handsDb.getHandById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/handsuser/:id", async (req, res) => {
  try {
    res.send(await handsDb.getHandsByUserId(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/hands", async (req, res) => {
  try {
    res.send(await handsDb.createHand(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/hands/:id", async (req, res) => {
  try {
    res.send(await handsDb.updateHand(req.params.id, req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/hands/:id", async (req, res) => {
  try {
    res.send(await handsDb.deleteHand(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

// Hand_Cards API ENDPOINTS*************************************************************

app.get("/api/handcards", async (req, res) => {
  try {
    res.send(await handCardsDb.getAllHandCards());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/handcards/:id", async (req, res) => {
  try {
    res.send(await handCardsDb.getHandCardById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/handcards", async (req, res) => {
  try {
    res.send(await handCardsDb.createHandCard(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/handcards/:id", async (req, res) => {
  try {
    res.send(await handCardsDb.updateHandCard(req.params.id, req.body));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/handcards/:id", async (req, res) => {
  try {
    res.send(await handCardsDb.deleteHandCard(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

// Misc API ENDPOINTS*************************************************************

app.get("/api/usershand/:id/", async (req, res) => {
  try {
    res.send(await handsDb.getAllUserHands(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/usershand/:id/:hand_id", async (req, res) => {
  try {
    res.send(await handsDb.getUserHand(req.params.id, req.params.hand_id));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const dashboardData = {
      users: await usersDb.getRawUsers(),
      hands: await handsDb.getHandsNameRun(),
      handCards: await handCardsDb.getAllHandCardsNameFaceSuit(),
      runs: await runsDb.getRuns(),
      runAdmins: await runAdminsDb.getAllRunAdminNameRun(),
      cards: await cardsDb.getCards(),
    };
    res.send(dashboardData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/cards", async (req, res) => {
  try {
    res.send(await cardsDb.getCards());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + client + startPage));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Poker Run API Server is running on port ${port}.`);
});
