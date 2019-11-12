const Cli = require("../../object-oriented/cli").Cli;
const Book = require("../../object-oriented/book").Book;
const List = require("../../object-oriented/list").List;

describe(createDescribeHeader("Object-Oriented cli.js"), function() {
  describe(createDescribeHeader("CLI constructor"), function() {
    it(
      createItHeader("should create a new CLI with proper default settings"),
      function() {
        let cli = new Cli();
        expect(cli).to.be.an.instanceof(Cli);
      }
    );
  });

  describe(createDescribeHeader("CLI #initialize"), function() {
    let cli;
    before(() => {
      cli = new Cli();
    });
    it(
      createItHeader("should initiate a new search when initialized"),
      function() {
        let stub = sinon
          .stub(cli.userInput, "initiateSearchPrompt")
          .callsFake(() => true);
        cli.initialize();

        assert(stub.called);
        stub.restore();
      }
    );
  });

  describe(createDescribeHeader("#displaySearchResults()"), function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it(createItHeader("should log the correct values to console"), () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = new List(eragonBook);

      cli.displaySearchResults();

      let outputs = [
        "The current search results are: \n",
        global.colors.blue("1. Eragon and Eldest Omnibus"),
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n",
        "Choose one of the following options: \n",
        `  ${global.colors.blue("1")} - Add ${global.colors.blue(
          "Eragon and Eldest Omnibus"
        )} to the reading list`,
        "  list - View current reading list",
        "  search - Search for a new book",
        "  exit - Exit the program"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe(createDescribeHeader("#displayBooks(books)"), function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it(createItHeader("should log the correct values to console"), () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks([eragonBook]);

      let outputs = [
        global.colors.blue("1. Eragon and Eldest Omnibus"),
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe(createDescribeHeader("#displayOptions()"), function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it(createItHeader("should log the correct value to console"), () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = new List(eragonBook);

      cli.displayOptions();

      let outputs = [
        "Choose one of the following options: \n",
        `  ${global.colors.blue("1")} - Add ${global.colors.blue(
          "Eragon and Eldest Omnibus"
        )} to the reading list`,
        "  list - View current reading list",
        "  search - Search for a new book",
        "  exit - Exit the program",
        "\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
    it(
      createItHeader(
        "should log the correct options to the console when a book is already in the reading list"
      ),
      () => {
        let spy = sinon.spy(console, "log");
        global.searchResults = new List(eragonBook);
        global.readingList = new List(eragonBook);
        cli.displayOptions();

        const outputs = [
          "Choose one of the following options: \n",
          global.colors.green(
            "  \u2713 - Add Eragon and Eldest Omnibus to the reading list"
          ),
          "  list - View current reading list",
          "  search - Search for a new book",
          "  exit - Exit the program",
          "\n"
        ];

        assertOutputs(outputs, spy);
        spy.restore();
      }
    );
  });

  describe(createDescribeHeader("#displayListOptions()"), function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it(createItHeader("should log the correct value to console"), () => {
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
