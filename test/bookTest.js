const sinon = require("sinon");
const assert = require("assert");
const Cli = require("../object-oriented/cli").Cli;
const Book = require("../object-oriented/book").Book;

describe("book.js", function() {
  describe("Book constructor", function() {
    it("should create a new Book with proper settings", function() {
      let book = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
      expect(book).to.be.an.instanceof(Book);
      expect(book.title).to.equal("Eragon and Eldest Omnibus");
      expect(book.authors).to.equal("Christopher Paolini");
      expect(book.publisher).to.equal("Random House");
    });
  });

  describe("Book #display(number)", function() {
    it("should properly display a book", function() {
      let book = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });

      expect(book).to.be.an.instanceof(Book);
      expect(book.title).to.equal("Eragon and Eldest Omnibus");
      expect(book.authors).to.equal("Christopher Paolini");
      expect(book.publisher).to.equal("Random House");

      let spy = sinon.spy(console, "log");

      book.display(1);

      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      spy.restore();
    });
  });

  describe("Book .generateBooks", function() {
    it("should generate an array of books", function() {
      let eragon = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
      const eragonFetchResult = [
        {
          volumeInfo: {
            title: "Eragon and Eldest Omnibus",
            authors: "Christopher Paolini",
            publisher: "Random House"
          }
        }
      ];

      expect(Book.generateBooks(eragonFetchResult)).to.eql([eragon]);
    });
  });

  describe("Book .collectBookTitles", function() {
    it("should generate an array of books", function() {
      let eragon = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });

      expect(Book.collectBookTitles([eragon])).to.eql([
        "Eragon and Eldest Omnibus"
      ]);
    });
  });
});
