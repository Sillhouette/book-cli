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
});
