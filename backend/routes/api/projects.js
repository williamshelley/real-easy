const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const Project = require("../../models/Project");
const validateProject = require("../../validation/project");
const { genResObj } = require("../../util/route_helpers");
const validatePositions = require("../../validation/position");

const frontendProject = projectModel => {
  let { id, owner, name, description, positions } = projectModel;
  return { id, owner, name, description, positions };
}

const validate = async (project, callback) => {
  let projectValidation = validateProject(project);
  let positionsValidation = validatePositions(project.positions);

  if (!projectValidation.isValid) {
    return genResObj(400, projectValidation.errors);
  } else if (!positionsValidation.isValid) {
    return genResObj(400, positionsValidation.errors);
  } else {
    return callback(project);
  }
}

const returnProject = (projectDoc, error) => {
  if (projectDoc) {
    return genResObj(200, frontendProject(projectDoc));
  } else {
    return genResObj(400, error);
  }
}

const returnProjectArray = (projectDocs, error) => {
  if (projectDocs) {
    return genResObj(200, projectDocs.map(p => frontendProject(p)));
  } else {
    return genResObj(400, error);
  }
}

const createProject = async project => {
  return validate(project, validProject => {
    let newProject = new Project(validProject);

    return newProject.save()
      .then(projectDoc => {
        return returnProject(projectDoc, "Could not create project");
      })
      .catch(errors => {
        return genResObj(400, errors.toLocaleString())
      });
  });
}

const editProject = async project => {
  return validate(project, validProject => {
    return Project.findByIdAndUpdate(validProject.id, validProject)
      .then(projectDoc => {
        return returnProject(projectDoc, "Could not update project");
      })
      .catch(errors => {
        return genResObj(400, errors.toLocaleString());
      });
  });
}

const getMany = async filters => {
  let searchParams = {};

  if (filters.owner || filters.user) {
    searchParams.$or = [
      { owner: filters.owner }, 
      { positions: filters.positions }
    ]
  }

  return Project.find(searchParams)
    .then(projectDocs => {
      return returnProjectArray(projectDocs, "Could not find projects");
    })
    .catch(errors => {
      return genResObj(400, errors.toLocaleString());
    });
}

const getOne = async filters => {
  let searchParams = {};

  if (filters.id) {
    searchParams._id = filters.id;
  }

  return Project.findOne(searchParams)
    .then(projectDoc => {
      return returnProject(projectDoc, "Could not find project");
    })
    .catch(errors => {
      return genResObj(400, errors.toLocaleString());
    });
}

// create a new project
router.all("/new", (req, res) => {
  createProject(req.body.project).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

// edit an existing project
router.all("/edit", (req, res) => {
  editProject(req.body.project).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

// get projects from db based on filters
router.all("/get-many", (req, res) => {
  getMany(req.body.filters).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

// get one project from db based on filters
router.all("/get-one", (req, res) => {
  getOne(req.body.filters).then(({ status, json }) => {
    return res.status(status).json(json);
  })
})

// delete an existing project
// router.all("/delete", (req, res) => {

// });

module.exports = {
  router,
  frontendProject,
  returnProject,
  returnProjectArray,
  createProject,
  editProject,
  getMany,
  getOne
};