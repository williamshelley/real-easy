const { merge } = require("lodash");
const mongoose = require("mongoose");
const app = require("../server.config");
const supertest = require("supertest");
const expect = require("expect");
const User = require("../backend/models/User");
const Project = require("../backend/models/Project");
const {
  router,
  frontendProject,
  returnProject,
  returnProjectArray,
  createProject,
  editProject,
  getMany,
  getOne
} = require("../backend/routes/api/projects");

describe("User Auth", () => {
  let request, testClient, testProvider, testProject;
  const testClientEmail = "test_client@gmail.com";
  const testProviderEmail = "test_provider@gmail.com";
  const testProjObj = { 
    owner: null,
    name: "A Test Project",
    description: "This is a test project",
    positions: [
      { title: "A", description: "Job A", wage: 10, user: null },
      { title: "B", description: "Job B", wage: 1000, user: null }
    ]
  }
  
  before(async () => {
    await User.deleteOne({ email: testClientEmail });
    await User.deleteOne({ email: testProviderEmail });

    request = supertest(app);

    const password = "password";
    const password2 = password;
    const birthDate = Date();

    testClient = await (new User({
      email: testClientEmail,
      name: "Test Client",
      password, password2, birthDate
    })).save();

    testProvider = await (new User({ 
      email: testProviderEmail, 
      name: "Test Provider" ,
      password, password2, birthDate
    })).save();

  });

  after(async () => {
    await User.deleteOne({ email: testClientEmail });
    await User.deleteOne({ email: testProviderEmail });
    // mongoose.disconnect();
  });

  describe("#frontendProject", function() {
    it("filters data correctly", done => {
      let feProj = frontendProject(testProjObj);
      expect(feProj).toBeTruthy();

      expect(feProj.id).toBeFalsy();
      expect(feProj.name).toEqual(testProjObj.name);
      expect(feProj.email).toEqual(testProjObj.email);
      expect(feProj.birthDate).toEqual(testProjObj.birthDate);

      expect(feProj.garbage).toBeFalsy();

      done();
  });
  })


});