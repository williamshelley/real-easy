const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { PROJECT, USER, REQUEST } = require("../constants/model-names");
const { PENDING } = require("../constants/project_request_constants");
const { ObjectId } = Schema.Types;

const RequestSchema = new Schema({
  project: {
    type: ObjectId,
    ref: PROJECT,
    required: true
  },
  position: {
    type: ObjectId,
    required: true
  },
  requester: {
    type: ObjectId,
    ref: USER,
    required: true
  },
  recipient: { // it will be project owner if requester is not project owner
    type: ObjectId,
    ref: USER,
    required: true
  },
  serviceProvider: {
    type: ObjectId,
    ref: USER,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: PENDING
  }
});

RequestSchema.index({ requester: 1, recipient: 1 }, { unique: true });

module.exports = Request = mongoose.model(REQUEST, RequestSchema);