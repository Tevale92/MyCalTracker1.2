const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// local mysql db connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calorieApp'
});

// testing db connections
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

// access control for node.js between script.js and server.js 
// (not certain abt this, this was in a tutorial and when I took it out of my code to see what id does, no requests worked, so prob important)
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,enctype,authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Registration Code
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  dbConn.query("INSERT INTO users (uname, pass) VALUES (?, ?)", [username, password], function (err, result) {
    if (err) {
      res.send({ status: 500, message: "Error registering user" });
    } else {
      const userId = result.insertId;
      res.send({ status: 200, message: "User registered successfully", userid: userId });
    }
  });
});

//Login Code
app.post('/login', (req, res) => {
  dbConn.query("SELECT * FROM users WHERE uname = ? and pass = ?", [req.body.username, req.body.password], function (err, result) {
    if (err) {
      res.send({ status: 500, message: "Invalid Details" });
    } else if (result.length) {
      const userId = result[0].userid;
      res.send({ status: 200, data: result, userid: userId });
    } else {
      res.send({ status: 500, message: "Invalid Details" });
    }
  });
});

// save entry code
app.post('/entry', (req, res) => {
  const { userid, netcal, calconsumed, calburned } = req.body;
  if (!userid || !netcal || !calconsumed || !calburned) {
    res.send({ status: 500, message: "userid, netcal, calconsumed, and calburned are required" });
    return;
  }
  dbConn.query("INSERT INTO entries (userid, netcal, calconsumed, calburned) VALUES (?, ?, ?, ?)", [userid, netcal, calconsumed, calburned], function (err, result) {
    if (err) {
      res.send({ status: 500, message: err });
    } else {
      res.send({ status: 200, message: "Entry saved successfully" });
    }
  });
});

// get all entries code
app.get('/entries', (req, res) => {
  const userid = req.query.userid;
  dbConn.query("SELECT netcal, calconsumed, calburned, entrydate FROM entries WHERE userid = ?", [userid], function (err, result) {
    if (err) {
      res.send({ status: 500, message: err });
    } else {
      res.send({ status: 200, data: result });
    }
  });
});

// delete all entries code
app.get('/reset', (req, res) => {
  const userid = req.query.userid;
  dbConn.query("DELETE FROM entries WHERE userid = ?", [userid], function(err, result) {
    if (err) {
      res.send({ status: 500, message: err });
    } else {
      res.send({ status: 200, message: "Entries deleted successfully", data: [] });
    }
  });
});

app.listen(5500, () => {
  console.log(`Server is listening on port 5500`);
});