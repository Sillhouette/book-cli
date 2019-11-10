const Book = require("./book").Book;

exports.List = class List {
  constructor(bookData = null) {
    this.books = [];
    if (Array.isArray(bookData)) {
      let bookConfigs = [];
      for (let {
        volumeInfo: { title, authors = "Unknown", publisher = "Unknown" }
      } of bookData) {
        authors = Array.isArray(authors) ? authors.join() : authors;
        this.books.push(
          new Book({
            title: title,
            authors: authors,
            publisher: publisher
          })
        );
      }
    } else {
      if (bookData) {
        this.books.push(new Book(bookData));
      } else {
        this.books = [];
      }
    }
  }

  //Collect the book titles from an array of book objects
  collectBookTitles() {
    const bookTitles = [];
    for (let { title } of this.books) {
      bookTitles.push(title);
    }
    return bookTitles;
  }

  listHasBook(index) {
    return this.books.some(book => {
      return (
        book.title === global.searchResults.books[index].title &&
        book.authors === global.searchResults.books[index].authors &&
        book.publisher === global.searchResults.books[index].publisher
      );
    });
  }

  //Add a book to the reading list if it's not already there
  addBookToList(book, index) {
    const error = `\u2717 `;
    const check = `\u2713`;
    if (!this.listHasBook(index)) {
      this.books.push(book);
      return `${check} Added ${book.title} to the reading list.\n`;
    } else {
      return `${error} ${book.title} is already in the book list.\n`;
    }
  }

  //Remove a book from the reading list then re-prompt
  removeBookFromList(index) {
    global.readingList.splice(index, 1);
    console.log("\nThe new reading list is as follows: ");
    global.cli.displayBooks(global.readingList);
    global.cli.displayListOptions();
    global.cli.userInput.initiateListOptionsPrompt();
  }
};
