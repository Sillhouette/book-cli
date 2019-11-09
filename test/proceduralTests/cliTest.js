const cli = require("../../procedural/cli");

describe("bookCli.js", function() {
  describe("#initialize()", function() {
    it("should log the welcome message to console", () => {
      let spy = sinon.spy(console, "log");

      cli.initialize();

      const outputs = [
        "Welcome to the procedural version of book cli",
        "\nPlease enter the name of the book you would like to find:"
      ];

      assertOutputs(outputs, spy);

      spy.restore();
    });
  });

  describe("#displaySearchResults()", function() {
    it("should log the search results to console", () => {
      let spy = sinon.spy(console, "log");

      global.searchResults = eragonObjects;

      cli.displaySearchResults();

      const outputs = [
        "The current search results are: \n",
        "1. Eragon and Eldest Omnibus",
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];

      assertOutputs(outputs, spy);

      spy.restore();
    });

    it("should log the search results and a message to the console", () => {
      let spy = sinon.spy(console, "log");

      global.searchResults = eragonObjects;

      cli.displaySearchResults(
        "Added Eragon and Eldest Omnibus to the reading list."
      );

      const outputs = [
        "The current search results are: \n",
        "1. Eragon and Eldest Omnibus",
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n",
        "Added Eragon and Eldest Omnibus to the reading list."
      ];

      assertOutputs(outputs, spy);

      spy.restore();
    });
  });

  describe("#displayBooks(emptyBooks)", function() {
    it("should log `There are no books...` console", () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks([]);

      const outputs = ["There are no books in this list yet.\n"];
      assertOutputs(outputs, spy);
      spy.restore();
    });

    it("should log a book to the console", () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks(global.eragonObjects);

      const outputs = [
        "1. Eragon and Eldest Omnibus",
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];
      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#displayOptions()", function() {
    it("should log the correct options to the console with one book in the reading list", () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = global.eragonObjects;
      global.readingList = [];
      cli.displayOptions();

      const outputs = [
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

    it("should log the correct options to the console when a book is already in the reading list", () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = global.eragonObjects;
      global.readingList = global.eragonObjects;
      cli.displayOptions();

      const outputs = [
        "Choose one of the following options: \n",
        "  \u2713 - Add Eragon and Eldest Omnibus to the reading list",
        "  list - View current reading list",
        "  search - Search for a new book",
        "  exit - Exit the program",
        "\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#displayList()", function() {
    it("should log the reading list to the console", () => {
      let spy = sinon.spy(console, "log");

      cli.displayList();

      const outputs = [
        "The current reading list is: \n",
        "1. Eragon and Eldest Omnibus",
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#displayListOptions()", function() {
    it("should log the reading list options to the console with one book in the reading list", () => {
      let spy = sinon.spy(console, "log");
      global.readingList = [global.eragonObjects];
      cli.displayListOptions();

      const outputs = [
        "Choose one of the following options: \n",
        "  back - Return to previous search",
        "  search - Search for a new book",
        "  exit - Exit the program",
        "\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe("#exit()", function() {
    it("should log the exit message to the console", () => {
      let spy = sinon.spy(console, "log");

      cli.exit();

      const outputs = ["Thanks for using Book CLI \n"];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });
});
