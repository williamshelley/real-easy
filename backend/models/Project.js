const mongoose = require('mongoose');
const { PROJECT, USER } = require('../constants/model-names');
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
    ref: USER
  }
});

const ProjectSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    positions: {
      type: [PositionSchema],
      default: [],
      required: true
    },
  }, {
    timestamps: true
  });

module.exports = User = mongoose.model(PROJECT, ProjectSchema);