class Book {
  constructor({ title, authors, publisher }) {
    this.authors = authors;
    this.title = title;
    this.publisher = publisher;
  }

  // Generate array of books from a set of book data from the API
  static generateBooks(bookData) {
    let bookConfigs = [];
    let books = [];
    for (let {
      volumeInfo: { title, authors = "Unknown", publisher = "Unknown" }
    } of bookData) {
      authors = Array.isArray(authors) ? authors.join() : authors;
      bookConfigs.push({
        title: title,
        authors: authors,
        publisher: publisher
      });
    }
    for (const config of bookConfigs) {
      books.push(new Book(config));
    }
    return books;
  }

  //Collect the book titles from an array of book objects
  static collectBookTitles(books) {
    const bookTitles = [];
    for (let { title } of books) {
      bookTitles.push(title);
    }
    return bookTitles;
  }

  //Displays a book to the user
  display(number) {
    const spacing = "   ";

    console.log(`${number}. ${this.title}`);
    console.log(`${spacing}Author(s): ${this.authors}`);
    console.log(`${spacing}Publisher: ${this.publisher}\n`);
  }
}

//Export the class for Cli and tests to use
module.exports = {
  Book: Book
};
