const Book = require("../../object-oriented/book").Book;

describe(createDescribeHeader("Object-Oriented book.js"), function() {
  describe(createDescribeHeader("new Book()"), function() {
    it(
      createItHeader("creates a Book object with proper settings"),
      function() {
        let book = new Book({
          title: "Eragon and Eldest Omnibus",
          authors: "Christopher Paolini",
          publisher: "Random House"
        });
        expect(book).to.be.an.instanceof(Book);
        expect(book.title).to.equal("Eragon and Eldest Omnibus");
        expect(book.authors).to.equal("Christopher Paolini");
        expect(book.publisher).to.equal("Random House");
      }
    );
  });

  describe(createDescribeHeader("#display(bookNumber)"), function() {
    it(createItHeader("properly displays a book"), function() {
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

      assert(
        spy.calledWith(global.colors.blue("1. Eragon and Eldest Omnibus"))
      );
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      spy.restore();
    });
  });
});
