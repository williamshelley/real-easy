const mongoose = require('mongoose');
const { PROJECT, USER, POSITION } = require('../constants/model-names');
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
  }
});

const ProjectSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    positions: [PositionSchema]
    // positions: [{
    //   type: Schema.Types.ObjectId,
    //   ref: POSITION
    // }]
  }, {
    timestamps: true
  });

module.exports = Project = mongoose.model(PROJECT, ProjectSchema);