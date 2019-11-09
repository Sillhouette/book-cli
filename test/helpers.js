global.sinon = require("sinon");
global.chai = require("chai");
global.expect = chai.expect;
global.spies = require("chai-spies");
global.assert = require("assert");

chai.use(spies);
