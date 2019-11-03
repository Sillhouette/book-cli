class Book {
  constructor({ title, authors, publisher }) {
    this.authors = authors;
    this.title = title;
    this.publisher = publisher;
  }

  static generateSearchResults(bookData) {
    return Book.generateBooks(bookData);
  }

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
}

module.exports = {
  Book: Book
};
