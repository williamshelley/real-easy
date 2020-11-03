const { ObjectId } = require("mongoose").Types;
const { ACCEPTED, DECLINED } = require("../../constants/project_request_constants");
const Project = require("../../models/Project");
const Request = require("../../models/Request");
const router = require("express").Router();
const { genResObj } = require("../../util/route_helpers");

const frontendRequest = requestModel => {
  let { id, project, requester, recipient } = requestModel;
  return { id, project, requester, recipient };
}

const returnRequest = (requestDoc, error) => {
  if (requestDoc) {
    return genResObj(200, frontendRequest(requestDoc));
  } else {
    return genResObj(400, error);
  }
}

const createRequest = async projectRequest => {
  let newRequest = new Request(projectRequest);

  return newRequest.save()
    .then(savedRequest => {
      return returnRequest(savedRequest, "Could not save project request");
    })
    .catch(err => {
      return genResObj(400, err.toLocaleString());
    });
}

const editPosition = async ({ project, serviceProvider, position }) => {
  return Project.findOne({ _id: ObjectId(project) })
  .then(project => {
    if (project && project.owner !== serviceProvider) {
      project.positions.forEach((pos, idx) => {
        if (pos.title === position) {
          project.positions[idx].user = serviceProvider;
        }
      });
      return Project.findByIdAndUpdate(project.id, project)
        .then(projectDoc => {
          return returnProject(projectDoc, "Could not update project");
        })
        .catch(err => {
          return genResObj(400, err.toLocaleString());
        });
    } else {
      return genResObj(400, "Project could not be found");
    }
  });
}

const updateRequest = async (requestId, newStatus) => {
  return Request.findByIdAndUpdate(requestId, { status: newStatus })
    .then(requestDoc => {
      let { project, serviceProvider, position } = requestDoc;
      return editPosition({ project, serviceProvider, position });
    })
    .catch(err => {
      return genResObj(400, err.toLocaleString());
    });
}

const acceptRequest = async requestId => {
  return updateRequest(requestId, ACCEPTED);
}

const declineRequest = async requestId => {
  return declineRequest(requestId, DECLINED);
}

router.all("/new", (req, res) => {
  createRequest(req.body.projectRequest).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

router.all("/accept", (req, res) => {
  acceptRequest(req.body.requestId).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

router.all("/decline", (req, res) => {
  declineRequet(req.body.requestId).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

module.exports = {
  router
}