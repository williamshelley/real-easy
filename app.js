const passport = require('passport');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const users = require("./backend/routes/api/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);

app.use(express.static("public"));


const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));