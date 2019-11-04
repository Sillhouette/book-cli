const chai = require("chai");
global.expect = chai.expect;
const fs = require("file-system");
const jsdom = require("mocha-jsdom");
const path = require("path");
const babel = require("babel-core");

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, "../procedural", "books.js"),
  {
    presets: ["env"]
  }
);

const src = babelResult.code;

jsdom({
  src
});
