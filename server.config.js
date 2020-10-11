const passport = require('passport');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const users = require("./backend/routes/api/users").router;
const projects = require("./backend/routes/api/projects").router;

const app = express();

const db = require("./config/keys").mongoURI;

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

app.use(express.static("public"));

module.exports = app;