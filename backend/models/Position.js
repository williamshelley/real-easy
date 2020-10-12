
const mongoose = require('mongoose');
const { USER, POSITION, PROJECT } = require('../constants/model-names');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  wage: {
    type: Number,
    min: 1,
    max: 1000000
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER,
    default: null
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: PROJECT
  }
});

module.exports = Position = mongoose.model(POSITION, PositionSchema);