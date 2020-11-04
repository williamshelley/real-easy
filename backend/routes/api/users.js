const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../../models/User")
const keys = require('../../../config/keys');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const { TOKEN_EXPIRE_TIME, SALT_LENGTH } = require('../../constants/user-auth-constants');
const { Types } = require('mongoose');
const { genResObj } = require('../../util/route_helpers');

const frontendUser = user => {
  let { id, name, email, birthDate, about, accountType } = user;
  return { id, name, email, birthDate, about, accountType };
}

const backendUser = user => {
  let data = frontendUser(user);
  data.email = user.email;
  data.password = user.password;
  return data;
}

const signToken = user => {
  let token = jwt.sign(user, keys.secretOrKey, { expiresIn: TOKEN_EXPIRE_TIME });
  return "Bearer " + token;
}

const validateSignup = async (user, successCallback) => {
  let userValidation = validateSignupInput(user);
  if (!userValidation.isValid) {
    return genResObj(400, userValidation.errors);
  } else {
    return successCallback(user);
  }
}

const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword).then(isMatch => {
    return isMatch;
  });
}

const login = async userCredentials => {

  // check if user exists
  return User.findOne({ email: userCredentials.email })
    .then(userDoc => {
      if (userDoc) {
        let validation = validateLoginInput(userCredentials);
        let { password } = userCredentials;
        if (validation.isValid) {
            return verifyPassword(password, userDoc.password).then(validPassword => {
              if (validPassword) {
                let token = signToken(frontendUser(userDoc));
                return genResObj(200, { success: true, token });
              } else {
                return genResObj(400, { credentials: "Invalid credentials"});
              }
          })
        } else {
          return genResObj(400, validation.errors);
        }

      } else {
        return genResObj(400, { credentials: "Invalid credentials" });
      }

    })
    .catch(error => {
      return genResObj(400, error.toLocaleString());
    });
}

const signup = async userCredentials => {
  return validateSignup(userCredentials, validUser => {
    return User.findOne({ email: validUser.email }).then(userDoc => {
      // return 400 status if the user already exists
      if (userDoc) {
        return genResObj(400, { credentials: "User already exists" });
      } else {
        return bcrypt.genSalt(SALT_LENGTH).then(salt => {
          // create user model and generate hashed password
          let user = new User(validUser);
          return bcrypt.hash(user.password, salt).then(hash => {
            // set hashed password to be password saved in db
            user.password = hash;
            return user.save().then(savedUser => {
                // generate response object for the saved user (same as login)
                if (savedUser) {
                  let token = signToken(frontendUser(savedUser));
                  return genResObj(200, { success: true, token });
                } else {
                  return genResObj(400, "Unable to save user");
                }
              })
              .catch(error => {
                return genResObj(400, error.toLocaleString());
              });
          })
          .catch(err => {
            return genResObj(400, err.toLocaleString());
          });
        });
      }
    })
  })
}

const buildSearchParams = filters => {
  let searchParams = {};

  const { name } = filters;
  if (name && name.length > 0) {
    searchParams.name = { $regex: name, $options: 'i' };
  }

  return Object.keys(searchParams).length > 0 ? searchParams : undefined;
}

const findUsers = (filters, res) => {
  const searchParams = buildSearchParams(filters);

  let responseObj = {};

  if (searchParams) {
    User.find(searchParams).then(users => {
      if (users) {
        users.forEach(user => {
          let fe = frontendUser(user);
          responseObj[fe.id] = fe;
        });
      }
      
      return res.json(responseObj);
    });
  } else {
    res.json(responseObj);
  }
}

const findUser = (userId, res) => {
  User.findOne({ _id: Types.ObjectId(userId) })
    .then(user => {
      if (user) {
        return res.json(frontendUser(user ));
      } else {
        return res.status(400).json("User could not be found");
      }
    })
    .catch(errors => {
      return res.status(400).json(errors);
    });
}

router.all("/login", (req, res) => {
  login(req.body.user).then(({ status, json }) => {
    return res.status(status).json(json);
  })
})

router.all("/signup", (req, res) => {
  signup(req.body.user).then(({ status, json }) => {
    return res.status(status).json(json);
  })
});

// RETRIEVE USERS WITH FILTERS
router.post("/", (req, res) => {
  findUsers(req.body.filters, res);
});

// RETRIEVE ONE USER WITH ID
router.get("/:userId", (req, res) => {
  findUser(req.params.userId, res);
});



// GET CURRENT USER
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json(frontendUser(req.user));
})

module.exports = {
  router,
  frontendUser,
  backendUser,
  signup
};