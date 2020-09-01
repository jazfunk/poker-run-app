const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const db = require("./queries");
const port = process.env.PORT || 5000;

// Todo: Install Morgan to log all
// HTTP Requests

app.use(express.static(__dirname + "/client/build/"));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Application Server is running on port ${port}.`);
});
