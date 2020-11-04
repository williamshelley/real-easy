const passport = require('passport');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const users = require("./backend/routes/api/users").router;
const projects = require("./backend/routes/api/projects").router;
const requests = require("./backend/routes/api/requests").router;

const app = express();

const db = require("./config/keys").mongoURI;

// move this connection to another file
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/projects", projects)
app.use("/api/requests", requests)

app.use(express.static("public"));

module.exports = app;