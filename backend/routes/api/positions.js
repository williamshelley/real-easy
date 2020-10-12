const { Types } = require("mongoose");
const { BAD_REQUEST_STATUS } = require("../../constants/error-constants");
const Position = require("../../models/Position");
const router = require("express").Router();

const frontendPosition = position => {
  const { id, title, description, wage, user, project } = position;
  return {
    id, title, description, wage, user, project
  }
}

const findPositionsOfUser = userId => {
  return Position.find({ user: Types.ObjectId(userId) })
  .then(positions => {
    if (positions && positions.length >= 0) {
      positions = positions.map(pos => frontendPosition(pos));
      let positionsObj = {};
      positions.forEach(pos => {
        positionsObj[pos.id] = pos;
      });
      return {
        status: 200,
        json: positionsObj
      }
    } else {
      return {
        status: BAD_REQUEST_STATUS,
        json: "Could not find positions" 
      }
    }
  })
}

// RETRIEVE POSITIONS A USER IS PART OF
router.get("/:userId", (req, res) => {
  findPositionsOfUser(req.params.userId).then(resObj => {
    return res.status(resObj.status).json(resObj.json);
  });
})

module.exports = {
  router
}