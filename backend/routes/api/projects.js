const router = require("express").Router();
const mongoose = require("mongoose");
const { BAD_REQUEST_STATUS } = require("../../constants/error-constants");
const Project = require("../../models/Project");
const validateProject = require("../../validation/project");

const frontendProject = projectModel => {
  let { name, description, positions } = projectModel;
  return { name, description, positions };
}

const createProject = async body => {
  let {
    errors,
    isValid
  } = validateProject(body);

  if (!isValid) {
    return {
      status: BAD_REQUEST_STATUS,
      json: errors
    }
  } else {


    const newProject = new Project(body);
    return newProject.save()
      .then(project => {

        return {
          status: 200,
          json: frontendProject(project)
        }
      })
      .catch(err => {
        return {
          status: BAD_REQUEST_STATUS,
          json: err
        }
      });
  }
}

router.get("/:projectId", (req, res) => {
  Project.findOne({ _id: mongoose.Types.ObjectId(req.params.projectId) })
  .then(project => {
    if (project) {
      return res.status(200).json(frontendProject(project));
    } else {
      return res.status(BAD_REQUEST_STATUS).json("Project does not exist");
    }
  })
  .catch(errors => {
    if (errors) {
      return res.status(BAD_REQUEST_STATUS).json(errors);
    }
  })
});

router.post("/", (req, res) => {
  createProject(req.body).then(project => {
    return res.status(project.status).json(project.json);
  });
});

router.delete("/:id", (req, res) => {

});

module.exports = {
  router
};