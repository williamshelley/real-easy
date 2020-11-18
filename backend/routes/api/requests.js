const { ObjectId } = require("mongoose").Types;
const { ACCEPTED, DECLINED } = require("../../constants/project_request_constants");
const Project = require("../../models/Project");
const Request = require("../../models/Request");
const router = require("express").Router();
const { genResObj } = require("../../util/route_helpers");
const { returnProject } = require("./projects");

const frontendRequest = requestModel => {
  let { id, project, requester, recipient, status } = requestModel;
  return { id, project, requester, recipient, status };
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
        if (pos._id.toString() === position.toString()) {
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
      if (newStatus === DECLINED) { serviceProvider = null; }
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
  return updateRequest(requestId, DECLINED);
}

const returnRequestArray = (requestDocs, error) => {
  if (requestDocs) {
    return genResObj(200, requestDocs.map(r => frontendRequest(r)));
  } else {
    return genResObj(400, error);
  }
}

const getProjectRequests = async projectId => {
  return Request.find({ project: projectId })
    .then(requestDocs => {
      return returnRequestArray(requestDocs, "Could not find requests for this project");
    })
    .catch(errors => {
      return genResObj(400, errors.toLocaleString());
    })
}

const deleteRequest = async requestId => {
  return Request.deleteOne({ _id: ObjectId(requestId) })
    .then(result => {
      return genResObj(200, result);
    })
    .catch(errors => {
      return genResObj(400, errors.toLocaleString());
    })
}

router.all("/get-project-requests", (req, res) => {
  getProjectRequests(req.body.projectId).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

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
  declineRequest(req.body.requestId).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

router.all("/delete", (req, res) => {
  deleteRequest(req.body.requestId).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

module.exports = {
  router
}