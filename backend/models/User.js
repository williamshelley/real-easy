const mongoose = require('mongoose');
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
    type: {
      type: String
    }
  }, {
    timestamps: true
  });

module.exports = User = mongoose.model("User", UserSchema);