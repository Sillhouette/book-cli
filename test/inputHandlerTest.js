const inputHandler = require("../procedural/inputHandler");

describe("inputHandler.js", function() {
  describe("#handleOptionSelection(err, selectionObj)", function() {
    it("should display readingList and options when passed 'list'", function() {
      let stub3 = sinon
        .stub(inputHandler, "initiateListOptionsPrompt")
        .callsFake(() => true);

      let spy = sinon.spy(console, "log");
      global.readingList = global.eragonObjects;

      inputHandler.handleOptionSelection("", { input: "list" });
      assert(spy.calledWith("The current reading list is: \n"));
      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      assert(spy.calledWith("Choose one of the following options: \n"));
      assert(spy.calledWith("  search - Search for a new book"));
      assert(spy.calledWith("  exit - Exit the program"));

      spy.restore();
      stub3.restore();
    });

    it("should initiate a new search when passed 'search'", function() {
      let stub = sinon
        .stub(inputHandler, "initiateSearchPrompt")
        .callsFake(() => true);

      global.readingList = global.eragonObjects;

      inputHandler.handleOptionSelection("", { input: "search" });

      assert(stub.called);
      stub.restore();
    });

    it("should call addBookToList(book) when passed an integer", function() {
      let stub2 = sinon
        .stub(inputHandler, "initiateOptionsPrompt")
        .callsFake(() => true);

      let spy = sinon.spy(inputHandler.cli, "addBookToList");
      global.readingList = [];
      global.searchResults = global.eragonObjects;

      inputHandler.handleOptionSelection("", { input: "1" });

      assert(spy.calledWith(0));
      expect(global.readingList).to.eql(global.eragonObjects);
      spy.restore();
      stub2.restore();
    });

    it("should call initiateOptionsPrompt when passed invalid selections", function() {
      let stub2 = sinon
        .stub(inputHandler, "initiateOptionsPrompt")
        .callsFake(() => true);

      inputHandler.handleOptionSelection("", { input: "gibberish" });

      assert(stub2.called);
      stub2.restore();
    });

    it("should exit the program when passed 'exit'", () => {
      let spy = sinon.spy(console, "log");

      inputHandler.handleOptionSelection("", { input: "exit" });

      assert(spy.calledWith("Thanks for using Book CLI \n"));
      spy.restore();
    });
  });

  describe("#handleListOptionSelection(err, selectionObj)", function() {
    it("should initiate a new search when passed 'search'", function() {
      let stub = sinon
        .stub(inputHandler, "initiateSearchPrompt")
        .callsFake(() => true);

      inputHandler.handleListOptionSelection("", { input: "search" });
      assert(stub.called);
      stub.restore();
    });

    it("should call initiateListOptionsPrompt when passed invalid selections", function() {
      let stub3 = sinon
        .stub(inputHandler, "initiateListOptionsPrompt")
        .callsFake(() => true);

      inputHandler.handleListOptionSelection("", { input: "gibberish" });

      assert(stub3.called);
      stub3.restore();
    });

    it("should exit the program when passed 'exit'", () => {
      let spy = sinon.spy(console, "log");

      inputHandler.handleListOptionSelection("", { input: "exit" });

      assert(spy.calledWith("Thanks for using Book CLI \n"));
      spy.restore();
      process.stdin.destroy();
    });
  });
});
