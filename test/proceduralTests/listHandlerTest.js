const listHandler = require("../../procedural/listHandler");

describe(createDescribeHeader("Procedural listHandler.js"), function() {
  describe(
    createDescribeHeader("#generateSearchResults(booksData)"),
    function() {
      it(
        createItHeader(
          "generates array of book objects when an api result is passed in"
        ),
        () => {
          expect(
            listHandler.generateSearchResults(global.eragonFetchResult)
          ).to.eql(global.eragonObjects);
        }
      );
    }
  );

  describe(createDescribeHeader("#collectBookTitles(books)"), function() {
    it(
      createItHeader("senerates an array of book titles from a list of books"),
      () => {
        expect(listHandler.collectBookTitles(global.eragonObjects)).to.eql(
          global.eragonTitles
        );
      }
    );
  });

  describe(
    createDescribeHeader("#addBookToList(searchResultIndex)"),
    function() {
      it(
        createItHeader(
          "adds book at the given index of searchResults array to the readingList array"
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
