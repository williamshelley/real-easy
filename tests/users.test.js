const { merge } = require("lodash");
const app = require("../server.config");
const supertest = require("supertest");
const expect = require("expect");
const User = require("../backend/models/User");
const { frontendUser, backendUser, signupUser } = require("../backend/routes/api/users");
const mongoose = require("mongoose");

describe("User Auth", () => {
  let request, testUser;
  const testUserEmail = "test_user@gmail.com";
  let newUser = { email:  "signup_tester@gmail.com" };
  
  before(async () => {
    await User.deleteOne({ email: testUserEmail });
    await User.deleteOne({ email: newUser.email });

    request = supertest(app);
    let email = testUserEmail;

    if (!testUser) {
      let name = "Signup Tester";
      let password = "password";
      let password2 = "password";
      let birthDate = Date();
      let accountType = "CLIENT";

      testUser = { name, email, birthDate, password, password2, accountType };

      await signupUser({ 
        user: new User(backendUser(testUser)), 
        callback: () => {}, // do nothing instead of send response
      });

      newUser = merge({}, newUser, { name, birthDate, password, password2, accountType });
    }

  });

  after(async () => {
    await User.deleteOne({ email: testUser.email });
    await User.deleteOne({ email: newUser.email });
    mongoose.disconnect();
  });

  describe("#frontendUser", function() {
    it("'frontendUser' filters data correctly", done => {
      let feUser = frontendUser(testUser);
      expect(feUser).toBeTruthy();

      expect(feUser.id).toEqual(testUser.id);
      expect(feUser.name).toEqual(testUser.name);
      expect(feUser.email).toEqual(testUser.email);
      expect(feUser.birthDate).toEqual(testUser.birthDate);

      expect(feUser.password).toBeFalsy();

      done();
    });
  })

  describe("#backendUser", function() {
    it("'backendUser' filters data correctly", done => {
      let beUser = backendUser(testUser);
      expect(beUser).toBeTruthy();

      expect(beUser.id).toEqual(testUser.id);
      expect(beUser.name).toEqual(testUser.name);
      expect(beUser.email).toEqual(testUser.email);
      expect(beUser.birthDate).toEqual(testUser.birthDate);
      expect(beUser.password).toEqual(testUser.password);

      done();
    });
  });

  describe("POST /api/users/signup", function() {
    it("User can sign up and sends correct response on valid user", done => {
      request
      .post("/api/users/signup")
      .send(newUser)
      .expect(200)
      .expect(res => {
        let { success, token } = res.body;
        let bearer = "Bearer";
        expect(success).toBe(true);
        expect(token.slice(0, bearer.length)).toEqual(bearer);
      })
      .end(done);
    });
  });

  describe("POST /api/users/login", function() {
    it("User can log in and sends correct response on valid user", done => {
      request
      .post("/api/users/login")
      .send(testUser)
      .expect(200)
      .expect(res => {
        let { success, token } = res.body;
        let bearer = "Bearer";
        expect(success).toBe(true);
        expect(token.slice(0, bearer.length)).toEqual(bearer);
      })
      .end(done);
    });
  })

});