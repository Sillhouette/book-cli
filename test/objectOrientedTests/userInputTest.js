const UserInput = require("../../object-oriented/userInput").UserInput;
const Book = require("../../object-oriented/book").Book;
const BookFetch = require("../../object-oriented/bookFetch").BookFetch;
const List = require("../../object-oriented/list").List;
const Cli = require("../../object-oriented/cli").Cli;

/**
  Note to the reviewers:
    I was not really sure how to test the prompt initiation methods as they
    use the external prompt handles getting user input and passing it to my
    provided callback function.
**/

describe(createDescribeHeader("Object-Oriented userInput.js"), function() {
  describe(createDescribeHeader("new UserInput()"), function() {
    it(
      createItHeader("creates a new UserInput object with the correct config"),
      function() {
        let userInput = new UserInput();
        expect(userInput).to.be.an.instanceof(UserInput);
        expect(userInput.prompt.message).to.eql("");
        expect(userInput.prompt.colors).to.eql(false);
        expect(userInput.prompt.delimiter).to.eql("");
        expect(userInput.bookFetch).to.be.an.instanceof(BookFetch);
      }
    );
  });

  describe(
    createDescribeHeader("#handleOptionSelection(err, selectionObj)"),
    function() {
      before(() => {
        userInput = new UserInput();
        global.cli = new Cli();
        eragonBook = new Book(global.eragonObjects[0]);
      });
      it(
        createItHeader(
          "renders a reading list and menu options when passed 'list'"
        ),
        function() {
          let stub3 = sinon
            .stub(userInput, "initiateListOptionsPrompt")
            .callsFake(() => true);

          let spy = sinon.spy(console, "log");
          global.readingList = new List(eragonBook);

          userInput.handleOptionSelection("", { input: "list" });
          let outputs = [
            "The current reading list is as follows: \n",
            global.colors.blue("1. Eragon and Eldest Omnibus"),
            "   Author(s): Christopher Paolini",
            "   Publisher: Random House\n",
            "Choose one of the following options: \n",
            "  search - Search for a new book",
            "  exit - Exit the program"
          ];

          assertOutputs(outputs, spy);
          spy.restore();
          stub3.restore();
        }
      );

      it(
        createItHeader(
          "renders the correct options when 'list' is passed in with no books in the list"
        ),
        function() {
          let stub3 = sinon
            .stub(userInput, "initiateListOptionsPrompt")
            .callsFake(() => true);

          let spy = sinon.spy(console, "log");

          global.readingList = undefined;

          userInput.handleOptionSelection("", { input: "list" });
          let outputs = [
            "The current reading list is as follows: \n",
            "Choose one of the following options: \n",
            "  search - Search for a new book",
            "  exit - Exit the program"
          ];

          assertOutputs(outputs, spy);
          spy.restore();
          stub3.restore();
        }
      );

      it(
        createItHeader("initiates a new search when passed 'search'"),
        function() {
          let stub = sinon
            .stub(userInput, "initiateSearchPrompt")
            .callsFake(() => true);

          userInput.handleOptionSelection("", { input: "search" });

          assert(stub.called);
          stub.restore();
        }
      );

      it(
        createItHeader(
          "calls addBookToList(book) when passed an integer within the indices of the searchResults"
        ),
        function() {
          let stub2 = sinon
            .stub(userInput, "initiateListOptionsPrompt")
            .callsFake(() => true);

          global.readingList = new List();
          global.searchResults = new List(eragonBook);

          let spy = sinon.spy(global.readingList, "addBookToList");

          userInput.handleOptionSelection("", { input: "1" });

          assert(spy.calledWith(eragonBook, 0));
          expect(global.readingList).to.eql(new List(eragonBook));
          spy.restore();
          stub2.restore();
        }
      );

      it(
        createItHeader("prompts for correct input when passed invalid input"),
        function() {
          let stub2 = sinon
            .stub(userInput, "initiateOptionsPrompt")
            .callsFake(() => true);

          userInput.handleOptionSelection("", { input: "gibberish" });

          assert(stub2.called);
          stub2.restore();
        }
      );

      it(createItHeader("exits the program when passed 'exit'"), () => {
        let spy = sinon.spy(global.cli, "exit");

        userInput.handleOptionSelection("", { input: "exit" });

        assert(spy.called);
        spy.restore();
      });
    }
  );
});
