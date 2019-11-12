const inputHandler = require("../../procedural/inputHandler");

// Prompt module handles users entering empty input
// Could not find a way to craft tests to confirm with but
// Manual testing shows everything works as expected

describe(createDescribeHeader("Procedural inputHandler.js"), function() {
  describe(
    createDescribeHeader("#handleOptionSelection(err, selectionObj)"),
    function() {
      it(
        createItHeader(
          "should display readingList and options when passed 'list'"
        ),
        function() {
          let stub3 = sinon
            .stub(inputHandler, "initiateListOptionsPrompt")
            .callsFake(() => true);

          let spy = sinon.spy(console, "log");
          global.proceduralReadingList = global.eragonObjects;

          inputHandler.handleOptionSelection("", { input: "list" });

          const outputs = [
            "The current reading list is: \n",
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
        createItHeader("should initiate a new search when passed 'search'"),
        function() {
          let stub = sinon
            .stub(inputHandler, "initiateSearchPrompt")
            .callsFake(() => true);

          global.proceduralReadingList = global.eragonObjects;

          inputHandler.handleOptionSelection("", { input: "search" });

          assert(stub.called);
          stub.restore();
        }
      );

      it(
        createItHeader(
          "should call addBookToList(book) when passed an integer"
        ),
        function() {
          let stub2 = sinon
            .stub(inputHandler, "initiateOptionsPrompt")
            .callsFake(() => true);

          let spy = sinon.spy(inputHandler.listHandler, "addBookToList");
          global.proceduralReadingList = [];
          global.searchResults = global.eragonObjects;

          inputHandler.handleOptionSelection("", { input: "1" });

          assert(spy.calledWith(0));
          expect(global.proceduralReadingList).to.eql(global.eragonObjects);
          spy.restore();
          stub2.restore();
        }
      );

      //Testing for invalid input
      it(
        createItHeader(
          "should call initiateOptionsPrompt when passed invalid selections"
        ),
        function() {
          let stub2 = sinon
            .stub(inputHandler, "initiateOptionsPrompt")
            .callsFake(() => true);

          inputHandler.handleOptionSelection("", { input: "gibberish" });

          assert(stub2.called);
          stub2.restore();
        }
      );

      //Testing for invalid input
      it(
        createItHeader(
          "should call initiateOptionsPrompt when passed invalid selections"
        ),
        function() {
          let stub2 = sinon
            .stub(inputHandler, "initiateOptionsPrompt")
            .callsFake(() => true);

          inputHandler.handleOptionSelection("", { input: "gadsgasfgEAGS" });

          assert(stub2.called);
          stub2.restore();
        }
      );

      it(createItHeader("should exit the program when passed 'exit'"), () => {
        let spy = sinon.spy(console, "log");

        inputHandler.handleOptionSelection("", { input: "exit" });

        assert(spy.calledWith("Thanks for using the procedural Book CLI! \n"));
        spy.restore();
      });
    }
  );

  describe(
    createDescribeHeader("#handleListOptionSelection(err, selectionObj)"),
    function() {
      it(
        createItHeader("should initiate a new search when passed 'search'"),
        function() {
          let stub = sinon
            .stub(inputHandler, "initiateSearchPrompt")
            .callsFake(() => true);

          inputHandler.handleListOptionSelection("", { input: "search" });
          assert(stub.called);
          stub.restore();
        }
      );

      it(
        createItHeader(
          "should call initiateListOptionsPrompt when passed invalid selections"
        ),
        function() {
          let stub3 = sinon
            .stub(inputHandler, "initiateListOptionsPrompt")
            .callsFake(() => true);

          inputHandler.handleListOptionSelection("", { input: "gibberish" });

          assert(stub3.called);
          stub3.restore();
        }
      );

      //Testing for invalid input
      it(
        createItHeader(
          "should call initiateListOptionsPrompt when passed invalid selections"
        ),
        function() {
          let stub3 = sinon
            .stub(inputHandler, "initiateListOptionsPrompt")
            .callsFake(() => true);

          inputHandler.handleListOptionSelection("", {
            input: "asregaewgasdefvaewgv"
          });

          assert(stub3.called);
          stub3.restore();
        }
      );

      it(createItHeader("should exit the program when passed 'exit'"), () => {
        let spy = sinon.spy(console, "log");

        inputHandler.handleListOptionSelection("", { input: "exit" });
        assert(spy.calledWith("Thanks for using the procedural Book CLI! \n"));
        spy.restore();
      });
    }
  );
});
