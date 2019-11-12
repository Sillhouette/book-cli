const cli = require("../../procedural/cli");

describe(createDescribeHeader("Procedural cli.js"), function() {
  describe(createDescribeHeader("#initialize()"), function() {
    it(createItHeader("renders the welcome message"), () => {
      let spy = sinon.spy(console, "log");

      cli.initialize();

      const outputs = [
        "Welcome to the procedural version of Book Cli",
        "\nPlease enter the name of the book you would like to find"
      ];

      assertOutputs(outputs, spy);

      spy.restore();
    });
  });

  describe(createDescribeHeader("#displaySearchResults()"), function() {
    it(createItHeader("renders the search results"), () => {
      let spy = sinon.spy(console, "log");

      global.searchResults = eragonObjects;

      cli.displaySearchResults();

      const outputs = [
        "The current search results are: \n",
        global.colors.blue("1. Eragon and Eldest Omnibus"),
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];

      assertOutputs(outputs, spy);

      spy.restore();
    });

    it(
      createItHeader(
        "renders the search results and a message when passed a message"
      ),
      () => {
        let spy = sinon.spy(console, "log");

        global.searchResults = eragonObjects;

        cli.displaySearchResults(
          "Added Eragon and Eldest Omnibus to the reading list."
        );

        const outputs = [
          "The current search results are: \n",
          global.colors.blue("1. Eragon and Eldest Omnibus"),
          "   Author(s): Christopher Paolini",
          "   Publisher: Random House\n",
          "Added Eragon and Eldest Omnibus to the reading list."
        ];

        assertOutputs(outputs, spy);

        spy.restore();
      }
    );
  });

  describe(createDescribeHeader("#displayBooks()"), function() {
    it(
      createItHeader("renders `There are no books...` when passed no books"),
      () => {
        let spy = sinon.spy(console, "log");

        cli.displayBooks([]);

        const outputs = ["There are no books in this list yet.\n"];
        assertOutputs(outputs, spy);
        spy.restore();
      }
    );

    it(createItHeader("renders books when passed an array of books"), () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks(global.eragonObjects);

      const outputs = [
        global.colors.blue("1. Eragon and Eldest Omnibus"),
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];
      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe(createDescribeHeader("#displayOptions()"), function() {
    it(
      createItHeader(
        "renders the correct options with one book in the reading list"
      ),
      () => {
        let spy = sinon.spy(console, "log");
        global.searchResults = global.eragonObjects;
        global.proceduralReadingList = [];
        cli.displayOptions();

        const outputs = [
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
      }
    );

    it(
      createItHeader(
        "renders the correct options when called with a book that's already in the reading list"
      ),
      () => {
        let spy = sinon.spy(console, "log");
        global.searchResults = global.eragonObjects;
        global.proceduralReadingList = global.eragonObjects;
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

  describe(createDescribeHeader("#displayList()"), function() {
    it(createItHeader("renders the reading list"), () => {
      let spy = sinon.spy(console, "log");

      cli.displayList();

      const outputs = [
        "The current reading list is: \n",
        global.colors.blue("1. Eragon and Eldest Omnibus"),
        "   Author(s): Christopher Paolini",
        "   Publisher: Random House\n"
      ];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });

  describe(createDescribeHeader("#displayListOptions()"), function() {
    it(createItHeader("renders the reading list options"), () => {
      let spy = sinon.spy(console, "log");
      global.proceduralReadingList = [global.eragonObjects];
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

  describe(createDescribeHeader("#exit()"), function() {
    it(createItHeader("renders the exit message"), () => {
      let spy = sinon.spy(console, "log");

      cli.exit();

      const outputs = ["Thanks for using the procedural Book CLI! \n"];

      assertOutputs(outputs, spy);
      spy.restore();
    });
  });
});
