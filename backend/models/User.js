const mongoose = require('mongoose');
const { USER } = require('../constants/model-names');
const { USER_TYPES } = require('../constants/user-auth-constants');
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;

const SMALL_MAX_LENGTH = 256;

const UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: SMALL_MAX_LENGTH
    },
    birthDate: {
      type: Date,
      required: true
    },
    about: {
      type: String,
      maxlength: SMALL_MAX_LENGTH
    },
    accountType: {
      type: String,
      default: USER_TYPES.CLIENT
    }
  }, {
    timestamps: true
  });

module.exports = User = mongoose.model(USER, UserSchema);