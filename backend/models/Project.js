const mongoose = require('mongoose');
const { PROJECT, USER, POSITION } = require('../constants/model-names');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    positions: [{
      type: Schema.Types.ObjectId,
      ref: POSITION
    }]
  }, {
    timestamps: true
  });

module.exports = Project = mongoose.model(PROJECT, ProjectSchema);