const listHandler = require("../../procedural/listHandler");

describe("listHandler.js", function() {
  describe("#generateSearchResults(booksData)", function() {
    it("Generates object with correct book information", () => {
      expect(
        listHandler.generateSearchResults(global.eragonFetchResult)
      ).to.eql(global.eragonObjects);
    });
  });

  describe("#collectBookTitles(books)", function() {
    it("Generates array with correct book titles", () => {
      expect(listHandler.collectBookTitles(global.eragonObjects)).to.eql(
        global.eragonTitles
      );
    });
  });

  describe("#addBookToList(searchResultIndex)", function() {
    it("Adds book at index of search result array to the reading list", () => {
      let stub = sinon
        .stub(listHandler.inputHandler, "initiateOptionsPrompt")
        .callsFake(() => true);

      listHandler.addBookToList(0);
      expect(global.proceduralReadingList).to.eql(global.eragonObjects);
      assert(stub.called);
      stub.restore();
    });
  });
});
