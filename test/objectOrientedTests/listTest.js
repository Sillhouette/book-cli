const Book = require("../../object-oriented/book").Book;
const List = require("../../object-oriented/list").List;

describe("list.js", function() {
  describe("List constructor", function() {
    beforeEach(() => {
      eragonBook = new Book(global.eragonObjects[0]);
    });
    it("should create a new List from a single book", function() {
      let list = new List(eragonBook);
      expect(list).to.be.an.instanceof(List);
      expect(list.books).to.deep.include(eragonBook);
    });

    it("should create a new List with no args", function() {
      let list = new List();
      expect(list).to.be.an.instanceof(List);
      expect(list.books).to.be.empty;
    });

    it("should create a new List from a book config", function() {
      let list = new List(global.eragonFetchResult);
      expect(list).to.be.an.instanceof(List);
      expect(list.books).to.deep.include(eragonBook);
    });
  });

  describe("#collectBookTitles()", function() {
    it("should generate an array of book titles", function() {
      let eragonBook = new Book(global.eragonObjects[0]);
      let list = new List(eragonBook);

      expect(list.collectBookTitles()).to.eql(["Eragon and Eldest Omnibus"]);
    });
  });

  describe("#listHasBook(index)", function() {
    beforeEach(() => {
      global.searchResults = undefined;
      global.readingList = undefined;
    });
    it("returns true if readingList contains the book in searchResults", function() {
      let eragonBook = new Book(global.eragonObjects[0]);
      global.searchResults = new List(eragonBook);
      global.readingList = new List(eragonBook);

      expect(readingList.listHasBook(0)).to.eql(true);
    });

    it("returns false if readingList does not contain the book in searchResults", function() {
      let eragonBook = new Book(global.eragonObjects[0]);
      global.searchResults = new List(eragonBook);
      global.readingList = new List();

      expect(readingList.listHasBook(0)).to.eql(false);
    });
  });

  describe("#addBookToList(book, index)", function() {
    beforeEach(() => {
      global.searchResults = undefined;
      global.readingList = undefined;
    });
    it("sucessfully adds book to empty list", function() {
      let eragonBook = new Book(global.eragonObjects[0]);
      global.readingList = new List();
      global.searchResults = new List(eragonBook);

      expect(global.readingList.addBookToList(eragonBook, 0)).to.eql(
        `\u2713 Added ${eragonBook.title} to the reading list.\n`
      );
      expect(global.readingList.books).to.eql([eragonBook]);
    });

    it("fails to add book if it's already in the list", function() {
      let eragonBook = new Book(global.eragonObjects[0]);
      global.readingList = new List(eragonBook);
      global.searchResults = new List(eragonBook);

      expect(global.readingList.addBookToList(eragonBook, 0)).to.eql(
        `\u2717 ${eragonBook.title} is already in the reading list.\n`
      );
      expect(global.readingList.books).to.eql([eragonBook]);
    });
  });
});