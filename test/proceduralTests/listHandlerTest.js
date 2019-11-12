const listHandler = require("../../procedural/listHandler");

describe(createDescribeHeader("Procedural listHandler.js"), function() {
  describe(
    createDescribeHeader("#generateSearchResults(booksData)"),
    function() {
      it(
        createItHeader("Generates object with correct book information"),
        () => {
          expect(
            listHandler.generateSearchResults(global.eragonFetchResult)
          ).to.eql(global.eragonObjects);
        }
      );
    }
  );

  describe(createDescribeHeader("#collectBookTitles(books)"), function() {
    it(createItHeader("Generates array with correct book titles"), () => {
      expect(listHandler.collectBookTitles(global.eragonObjects)).to.eql(
        global.eragonTitles
      );
    });
  });

  describe(
    createDescribeHeader("#addBookToList(searchResultIndex)"),
    function() {
      it(
        createItHeader(
          "Adds book at index of search result array to the reading list"
        ),
        () => {
          let stub = sinon
            .stub(listHandler.inputHandler, "initiateOptionsPrompt")
            .callsFake(() => true);

          listHandler.addBookToList(0);
          expect(global.proceduralReadingList).to.eql(global.eragonObjects);
          assert(stub.called);
          stub.restore();
          process.stdin.destroy();
        }
      );
    }
  );
});
