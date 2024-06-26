const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// local mysql db connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calorieApp'
});


dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});


app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,enctype,authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

let entry = function(entry) {
  this.netcal = entry.netcal;
  this.entrydate = entry.entrydate;
};

// Registration Code
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  dbConn.query("INSERT INTO users (uname, pass) VALUES (?, ?)", [username, password], function (err, result) {
    if (err) {
      res.send({ status: 500, message: "Error registering user" });
    } else {
      const userId = result.insertId; // Get the auto-incremented userid
      res.send({ status: 200, message: "User registered successfully", userid: userId });
    }
  });
});

//Login Code
app.post('/login', (req, res) => {
  dbConn.query("SELECT * FROM users WHERE uname = ? and pass = ?", [req.body.username, req.body.password], function (err, result) {
    if (err) {

      res.send({ status: 500, message: "Invalid Details" });

    }
    else if (result.length) {
      res.send({ status: 200, data: result });
    } else {
      res.send({ status: 500, message: "Invalid Details" });
    }
  });
});

app.post('/entry', (req, res) => {
  const { userid, netcal, entrydate } = req.body;
  dbConn.query("INSERT INTO entries (userid, netcal, entrydate) VALUES (?, ?, ?)", [userid, netcal, entrydate], function (err, result) {
    if (err) {
      res.send({ status: 500, message: "Error saving entry" });
    } else {
      res.send({ status: 200, message: "Entry saved successfully" });
    }
  });
});

app.listen(5500, () => {
  console.log(`Server is listening on port 5500`);
});