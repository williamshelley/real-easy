const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../../models/User")
const keys = require('../../../config/keys');
const validateSignupInput = require('../../validation/signup');
const validateSigninInput = require('../../validation/signin');

router.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    handle: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = {
                id: user.id,
                handle: user.handle
              };

              jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 3600
              }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const {
    errors,
    isValid
  } = validateSigninInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // const handle = req.body.handle;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    // handle,
    email
  }).then(user => {
    if (!user) {
      errors.handle = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          handle: user.handle
        };

        jwt.sign(payload, keys.secretOrKey, {
          expiresIn: 3600
        }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

module.exports = router;