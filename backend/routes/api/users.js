const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../../models/User")
const keys = require('../../../config/keys');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const { BAD_REQUEST_STATUS } = require('../../constants/error-constants');
const { TOKEN_EXPIRE_TIME, SALT_LENGTH } = require('../../constants/user-auth-constants');
const { Types } = require('mongoose');

const USER_EXISTS_MESSAGE = "User already exists";
const NOT_USER_EXISTS_MESSAGE = "User does not exist";
const BAD_PASSWORD_MESSAGE = "Invalid Password";

const frontendUser = user => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    birthDate: user.birthDate,
    about: user.about,
    accountType: user.accountType
  }
}

const backendUser = user => {
  let data = frontendUser(user);
  data.email = user.email;
  data.password = user.password;
  return data;
}

const signAndSendToken = (res, payload) => {
  jwt.sign(payload, keys.secretOrKey, {
    expiresIn: TOKEN_EXPIRE_TIME
  }, (err, token) => {
    res.json({
      success: true,
      token: "Bearer " + token
    });
  });
}

// callback is run after user is saved to db, defaults to sending response to server
const signupUser = ({ res, user, callback }) => {
  const defaultCallback = user => {
    let payload = frontendUser(user);
    signAndSendToken(res, payload);
  }
  callback = callback ? callback : defaultCallback;

  bcrypt.genSalt(SALT_LENGTH, (_, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { throw err; }
      user.password = hash;
      user.save()
        .then(callback)
        .catch(err => res.status(BAD_REQUEST_STATUS).json(err));
    });
  });
}

const loginUser = ({ res, password, user, errors = {} }) => {
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      let payload = frontendUser(user);
      signAndSendToken(res, payload);
    } else {
      errors.password = BAD_PASSWORD_MESSAGE;
      return res.status(BAD_REQUEST_STATUS).json(errors);
    }
  });
}


// separate request from backend request
// instead of passing req/res, just pass in data
const authenticateSignup = (req, res) => {
  let {
    errors,
    isValid
  } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(BAD_REQUEST_STATUS).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = USER_EXISTS_MESSAGE;
      return res.status(BAD_REQUEST_STATUS).json(errors);
    } else {
      const newUser = new User(backendUser(req.body));
      signupUser({ res, user: newUser });
    }
  });
}

const authenticateLogin = (req, res) => {
  let {
    errors,
    isValid
  } = validateLoginInput(req.body);
  
  if (!isValid) {
    return res.status(BAD_REQUEST_STATUS).json(errors);
  }

  let { email, password } = req.body;

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = NOT_USER_EXISTS_MESSAGE;
      return res.status(BAD_REQUEST_STATUS).json(errors);
    }

    loginUser({ res, password, user, errors });
  });
}

const buildSearchParams = filters => {
  let searchParams = {};

  const { name } = filters;
  if (name && name.length > 0) {
    searchParams.name = { $regex: name, $options: 'i' };
  }

  return Object.keys(searchParams).length > 0 ? searchParams : undefined;
}

const findUsers = (req, res) => {
  let { filters } = req.body;

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

const findUser = (req, res) => {
  let { userId } = req.params;

  User.findOne({ _id: Types.ObjectId(userId) })
    .then(user => {
      if (user) {
        return res.json(frontendUser(user ));
      } else {
        return res.status(BAD_REQUEST_STATUS).json(NOT_USER_EXISTS_MESSAGE);
      }
    })
    .catch(errors => {
      if (errors) {
        return res.status(BAD_REQUEST_STATUS).json(errors);
      }
    });
}

// RETRIEVE USERS WITH FILTERS
router.post("/", (req, res) => {
  findUsers(req, res);
});

// RETRIEVE ONE USER WITH ID
router.get("/:userId", (req, res) => {
  findUser(req, res);
});

// SIGN UP USER
router.post("/signup", (req, res) => {
  authenticateSignup(req, res);
});


// LOG IN USER
router.post("/login", (req, res) => {
  authenticateLogin(req, res);
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
  signAndSendToken,
  signupUser,
  loginUser,
  authenticateSignup,
  authenticateLogin,
};