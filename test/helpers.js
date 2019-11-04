const chai = require("chai");
global.expect = chai.expect;
const fs = require("file-system");
const jsdom = require("mocha-jsdom");
const path = require("path");
const babel = require("babel-core");
const babel2 = require("@babel/core");

const babelResultBooks = babel.transformFileSync(
  path.resolve(__dirname, "../procedural", "books.js"),
  {
    presets: ["env"]
  }
);

const babelResultBook = babel2.transformFileSync(
  path.resolve(__dirname, "../object-oriented", "book.js"),
  {
    presets: ["@babel/env"]
  }
);

const babelResultCli = babel2.transformFileSync(
  path.resolve(__dirname, "../object-oriented", "cli.js"),
  {
    presets: ["@babel/env"]
  }
);

const src = babelResultBooks.code;
const src1 = babelResultBook.code;
const src2 = babelResultCli.code;

jsdom({
  src,
  src1,
  src2
});
