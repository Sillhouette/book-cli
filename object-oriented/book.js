exports.Book = class Book {
  //Constructor to build book objects
  constructor({ title, authors, publisher }) {
    this.authors = authors;
    this.title = title;
    this.publisher = publisher;
  }

  //Display a book to the user
  display(number) {
    const spacing = "   ";

    console.log(`${number}. ${this.title}`);
    console.log(`${spacing}Author(s): ${this.authors}`);
    console.log(`${spacing}Publisher: ${this.publisher}\n`);
  }
};
