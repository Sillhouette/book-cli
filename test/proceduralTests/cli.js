const cli = require("../../procedural/cli");

describe("bookCli.js", function() {
  describe("#displayBooks(books)", function() {
    it("should log the correct values to console", () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks(global.eragonObjects);

      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      spy.restore();
    });
  });

  describe("#displayOptions()", function() {
    it("should log the correct value to console", () => {
      let spy = sinon.spy(console, "log");
      global.searchResults = global.eragonObjects;
      global.readingList = [];
      cli.displayOptions();

      assert(spy.calledWith("Choose one of the following options: \n"));
      assert(
        spy.calledWith(
          "  1 - Add Eragon and Eldest Omnibus to the reading list"
        )
      );
      assert(spy.calledWith("  list - View current reading list"));
      assert(spy.calledWith("  search - Search for a new book"));
      assert(spy.calledWith("  exit - Exit the program"));
      assert(spy.calledWith("\n"));
      spy.restore();
    });
  });
});
