const Book = require("../../object-oriented/book").Book;
const List = require("../../object-oriented/list").List;

describe(createDescribeHeader("Object-Oriented list.js"), function() {
  describe(createDescribeHeader("new List()"), function() {
    beforeEach(() => {
      eragonBook = new Book(global.eragonObjects[0]);
    });
    it(
      createItHeader("creates a new List object from a single book"),
      function() {
        let list = new List(eragonBook);
        expect(list).to.be.an.instanceof(List);
        expect(list.books).to.deep.include(eragonBook);
      }
    );

    it(createItHeader("creates an empty List with no arguments"), function() {
      let list = new List();
      expect(list).to.be.an.instanceof(List);
      expect(list.books).to.be.empty;
    });

    it(
      createItHeader("creates a new List from a Google Books api result"),
      function() {
        let list = new List(global.eragonFetchResult);
        expect(list).to.be.an.instanceof(List);
        expect(list.books).to.deep.include(eragonBook);
      }
    );
  });

  describe(createDescribeHeader("#collectBookTitles()"), function() {
    it(
      createItHeader("generates an array of book titles from the list"),
      function() {
        let eragonBook = new Book(global.eragonObjects[0]);
        let list = new List(eragonBook);

        expect(list.collectBookTitles()).to.eql(["Eragon and Eldest Omnibus"]);
      }
    );
  });

  describe(createDescribeHeader("#listHasBook(index)"), function() {
    beforeEach(() => {
      global.searchResults = undefined;
      global.readingList = undefined;
    });
    it(
      createItHeader(
        "returns true if readingList contains the book at the given index in searchResults"
      ),
      function() {
        let eragonBook = new Book(global.eragonObjects[0]);
        global.searchResults = new List(eragonBook);
        global.readingList = new List(eragonBook);

        expect(readingList.listHasBook(0)).to.eql(true);
      }
    );

    it(
      createItHeader(
        "returns false if readingList doesn't contain the book at the given index in searchResults"
      ),
      function() {
        let eragonBook = new Book(global.eragonObjects[0]);
        global.searchResults = new List(eragonBook);
        global.readingList = new List();

        expect(readingList.listHasBook(0)).to.eql(false);
      }
    );
  });

  describe(createDescribeHeader("#addBookToList(book, index)"), function() {
    beforeEach(() => {
      global.searchResults = undefined;
      global.readingList = undefined;
    });
    it(createItHeader("Adds a book to empty list"), function() {
      let eragonBook = new Book(global.eragonObjects[0]);
      global.readingList = new List();
      global.searchResults = new List(eragonBook);

      expect(global.readingList.addBookToList(eragonBook, 0)).to.eql(
        global.colors.green(
          `\u2713 Added ${eragonBook.title} to the reading list.\n`
        )
      );
      expect(global.readingList.books).to.eql([eragonBook]);
    });

    it(
      createItHeader("fails to add a book if it's already in the list"),
      function() {
        let eragonBook = new Book(global.eragonObjects[0]);
        global.readingList = new List(eragonBook);
        global.searchResults = new List(eragonBook);

        expect(global.readingList.addBookToList(eragonBook, 0)).to.eql(
          global.colors.red(
            `\u2717 ${eragonBook.title} is already in the reading list.\n`
          )
        );
        expect(global.readingList.books).to.eql([eragonBook]);
      }
    );
  });
});
