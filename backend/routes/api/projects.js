const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const Project = require("../../models/Project");
const validateProject = require("../../validation/project");
const { genResObj } = require("../../util/route_helpers");
const validatePositions = require("../../validation/position");

const frontendProject = projectModel => {
  let { id, owner, name, description, positions } = projectModel;
  // positions = positions.map(pos => Types.ObjectId(pos.id));
  // positions = positions ? positions : [];
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

// const createProject = async body => {
//   let {
//     errors,
//     isValid
//   } = validateProject(body);

//   if (!isValid) {
//     return {
//       status: BAD_REQUEST_STATUS,
//       json: errors
//     }
//   } else {
//     let newPositions = [];
//     body.positions.forEach(position => {
//       newPositions.push(new Position(position))
//     });

//     let newProject = new Project(body);
//     newProject.positions = [];
//     return newProject.save()
//     .then(project => {
//       // give positions correct project id
//       newPositions = newPositions.map(p => {
//         p.project = project.id;
//         return p;
//       });

//       return Position.insertMany(newPositions)
//       .then(positions => {
//         newProject.positions = positions.map(pos => pos.id);
        
//         return newProject.save()
//         .then(updatedPro => {
//           return frontendProject(updatedPro)
//             .then(pro => {
//               return {
//                 status: 200,
//                 json: pro
//               }
//             });
//         })
//         .catch(err => {
//           return {
//             status: BAD_REQUEST_STATUS,
//             json: err.errors
//           }
//         });
//       })
//     })
//   }
// }

// const editProject = async project => {
//   let {
//     errors,
//     isValid
//   } = validateProject(project);


//   if (!isValid) {
//     return {
//       status: BAD_REQUEST_STATUS,
//       json: errors
//     }
//   } else {
//     return Project.findOne({ _id: Types.ObjectId(project.id) })
//       .then(projectModel => {

//         let { name, description, positions, deletePositions } = project;

//         if (name) { projectModel.name = name; }

//         if (description) { projectModel.description = description; }

//         if (positions && positions.length > 0) {
//           let newPositions = [];
//           positions.forEach(p => {
//             if (!p.id) { newPositions.push(p); }
//           });

//           return Position.insertMany(newPositions)
//             .then(positionModels => { 
//               return Position.deleteMany({ _id: { 
//                 $in: deletePositions.map(p => Types.ObjectId(p)) 
//               }}).then(() => {
                
//                 projectModel.positions = projectModel.positions.concat(positionModels.map(p => p.id));

//                 return projectModel.save()
//                 .then(pro => {
//                   return {
//                     status: 200,
//                     json: frontendProject(pro)
//                   }
//                 })
//                 .catch(err => { 
//                   return { status: BAD_REQUEST_STATUS, json: err };
//                  });
//               });
//             })
//         } else {
//           return projectModel.save()
//           .then(pro => {
//             return {
//               status: 200,
//               json: frontendProject(pro)
//             }
//           })
//           .catch(err => { 
//             return { status: BAD_REQUEST_STATUS, json: err };
//            });
//         }
//       });
//   }
// }

// router.get("/:projectId", (req, res) => {
//   Project.findOne({ _id: Types.ObjectId(req.params.projectId) })
//   .then(async project => {
//     if (project) {
//       return res.status(200).json(await frontendProject(project));
//     } else {
//       return res.status(BAD_REQUEST_STATUS).json("Project does not exist");
//     }
//   })
//   .catch(errors => {
//     if (errors) {
//       return res.status(BAD_REQUEST_STATUS).json(errors);
//     }
//   })
// });

// router.post("/edit", (req, res) => {
//   editProject(req.body).then(project => {
//     return res.status(project.status).json(project.json);
//   });
// });



// // gets all projects a user has participated in
// router.get("/users/:userId", (req, res) => {
//   debugger;
//   Position.find({ user: Types.ObjectId(req.params.userId) })
//   .then(positions => {
//     positions = positions.map(p => p.id);
//     Project.find({ positions: { $in: positions }})
//     .then(projects => {
      
//       projects = projects.map(p => frontendProject(p));

//       let projectsObj = {};
//       projects.forEach(p => {
//         projectsObj[p.id] = p;
//       });

//       res.status(200).json(projectsObj);
//     })
//     .catch(err => res.status(BAD_REQUEST_STATUS).json(err))
//   })
//   .catch(err => res.status(BAD_REQUEST_STATUS).json(err));
// });

// create a new project
router.all("/new", (req, res) => {
  createProject(req.body.project).then(({ status, json }) => {
    return res.status(status).json(json);
  });
});

// edit an existing project
router.all("/edit", (req, res) => {
  editProject(req.body.project).then(({ status, json }) => {
    return res.status(status).json(json)
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
  router
};