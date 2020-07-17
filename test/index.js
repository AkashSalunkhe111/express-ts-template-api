var Expense = require("../dist/models/Expense");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var app = require("../dist/app.js");
var ObjectId = require('mongodb').ObjectID;

chai.use(chaiHttp);

describe("/all todo", () => {
  it("it should GET all the expenses", (done) => {
    chai
      .request(app)
      .get("/api/expense")
      .end((err, res) => {
        console.log(err);

        res.should.have.status(200);
        res.body.should.have.property("success").and.to.be.eql(true);
        done();
      });
  });

  it("it should Post expense", (done) => {
    chai
      .request(app)
      .post("/api/expense")
      .send({
        user: ObjectId("5f005219d59bb24926162f5a"),
        date: "01/01/20",
        amount: 200,
        item: "table4",
        type: "misc",
      })
      .end((err, res) => {
        console.log(err);

        res.should.have.status(500);
        done();
      });
  });
});
