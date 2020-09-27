const app = require("../server.config");
const supertest = require("supertest");
const expect = require("expect");

describe("User Auth", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  it("Shows homepage", async done => {
    request
    .get("/api/users")
    .expect(200)
    .expect(res => {
        console.log(res.text);
    })
    .end(done)
  });

  it("'frontendUser' filters data correctly", () => {
    
  });


  it("'backendUser' filters data correctly", () => {
    
  });

  it("'signAndSendToken' sends json object with 'Bearer' token", () => {
    
  });

  it("'signupUser' sends correct response on valid user", () => {
    
  });

  it("'loginUser' sends correct response on valid user", () => {
    
  });

  it("'authenticateSignup' sends correct response on valid user", () => {
    
  });

  it("'authenticateLogin' sends correct response on valid user", () => {
    
  });

});