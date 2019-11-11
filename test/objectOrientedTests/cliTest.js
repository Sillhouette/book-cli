const Cli = require("../../object-oriented/cli").Cli;
const Book = require("../../object-oriented/book").Book;
const List = require("../../object-oriented/list").List;

describe("cli.js", function() {
  describe("CLI constructor", function() {
    it("should create a new CLI with proper default settings", function() {
      let cli = new Cli();
      expect(cli).to.be.an.instanceof(Cli);
    });
  });

  describe("CLI #initialize", function() {
    let cli;
    before(() => {
      cli = new Cli();
    });
    it("should initiate a new search when initialized", function() {
      let stub = sinon
        .stub(cli.userInput, "initiateSearchPrompt")
        .callsFake(() => true);
      cli.initialize();

      assert(stub.called);
      stub.restore();
    });
  });

  describe("#displaySearchResults()", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should log the correct values to console", () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = new List(eragonBook);

      cli.displaySearchResults();

      let outputs = [
        "The current search results are: \n",
        "1. Eragon and Eldest Omnibus",
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n",
        "Choose one of the following options: \n",
        "  1 - Add Eragon and Eldest Omnibus to the reading list",
        "  list - View current reading list",
        "  search - Search for a new book",
        "  exit - Exit the program"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#displayBooks(books)", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should log the correct values to console", () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks([eragonBook]);

      let outputs = [
        "1. Eragon and Eldest Omnibus",
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#displayOptions()", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should log the correct value to console", () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = new List(eragonBook);

      cli.displayOptions();

      let outputs = [
        "Choose one of the following options: \n",
        "  1 - Add Eragon and Eldest Omnibus to the reading list",
        "  list - View current reading list",
        "  search - Search for a new book",
        "  exit - Exit the program",
        "\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#displayListOptions()", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should log the correct value to console", () => {
      let spy = sinon.spy(console, "log");
      global.readingList = new List(eragonBook);

      cli.displayListOptions();

      let outputs = [
        "Choose one of the following options: \n",
        `  back - Return to previous search`,
        `  search - Search for a new book`,
        `  exit - Exit the program`,
        `\n`
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });
});
