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
      this.books.push(new Book(bookData));
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
        book.authors === global.searchResults.books[index].publisher
      );
    });
  }

  //Add a book to the reading list if it's not already there
  addBookToList(index) {
    if (!listHasBook(index)) {
      this.readingList.push(this.searchResults[index]);
      console.log(
        `Added ${
          this.readingList[this.readingList.length - 1].title
        } to the reading list.`
      );
      this.displayOptions();
      this.initiateOptionsPrompt();
    } else {
      console.log("That book is already in the book list.");
      this.initiateOptionsPrompt();
    }
  }

  //Remove a book from the reading list then re-prompt
  removeBookFromList(index) {
    this.readingList.splice(index, 1);
    console.log("\nThe new reading list is as follows: ");
    this.displayBooks(this.readingList);
    this.displayListOptions();
    this.initiateListOptionsPrompt();
  }
};
