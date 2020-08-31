const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const port = 3000
let port = process.env.PORT || 5000
const path = require('path')
const db = require('./queries')

// Todo: Install Morgan

// app.use(express.static(__dirname + "/client/build"));
app.use(express.static("/client/build"));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
  // res.json({ info: 'Poker Run API using React, Node, Express, and Postgres' })
})

app.listen(port, () => {
  console.log(`Application Server is running on port ${port}.`)
})