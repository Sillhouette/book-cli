global.sinon = require("sinon");
global.chai = require("chai");
global.expect = chai.expect;
global.spies = require("chai-spies");
global.assert = require("assert");

chai.use(spies);

global.eragonFetchResult = [
  {
    volumeInfo: {
      title: "Eragon and Eldest Omnibus",
      authors: "Christopher Paolini",
      publisher: "Random House"
    }
  }
];

global.eragonObjects = [
  {
    title: "Eragon and Eldest Omnibus",
    authors: "Christopher Paolini",
    publisher: "Random House"
  }
];

global.eragonTitles = ["Eragon and Eldest Omnibus"];
