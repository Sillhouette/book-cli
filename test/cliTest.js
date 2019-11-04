const sinon = require("sinon");
const helpers = require("./helpers");
const chai = require("chai");
const spies = require("chai-spies");
const assert = require("assert");
const prompt = require("prompt");
const Cli = require("../object-oriented/cli").Cli;

chai.use(spies);

describe("cli.js", function() {
  describe("CLI constructor", function() {
    it("should create a new CLI proper default settings", function() {
      let cli = new Cli();
      expect(cli).to.be.an.instanceof(Cli);
      expect(cli.baseURL).to.equal(
        "https://www.googleapis.com/books/v1/volumes?"
      );
      expect(cli.maxResults).to.equal("maxResults=5&");
      expect(cli.queryStructure).to.equal("q=");
    });

    it("should create a new CLI proper settings", function() {
      let cli = new Cli(10);
      expect(cli).to.be.an.instanceof(Cli);
      expect(cli.baseURL).to.equal(
        "https://www.googleapis.com/books/v1/volumes?"
      );
      expect(cli.maxResults).to.equal("maxResults=10&");
      expect(cli.queryStructure).to.equal("q=");
    });
  });

  describe("CLI #initialize", function() {
    let cli;
    before(() => {
      cli = new Cli();
    });
    it("should initiate a new search when initialized", function() {
      let stub = sinon.stub(cli, "initiateSearchPrompt").callsFake(() => true);
      cli.initialize();

      assert(stub.called);
      stub.restore();
    });
  });
});
