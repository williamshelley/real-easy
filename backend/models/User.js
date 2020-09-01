const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
  }, {
    timestamps: true
  });

module.exports = User = mongoose.model("User", UserSchema);